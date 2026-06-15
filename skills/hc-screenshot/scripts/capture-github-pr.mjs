#!/usr/bin/env node
// Drive headless chromium against real GitHub PR + Actions pages and capture
// PNGs. The repo is assumed to be public; no auth is set up. Adopters who want
// auth can add a Playwright storageState file path via --storage-state.
//
// Resolves @playwright/test from the *current working directory* — invoke from
// inside any repo that has @playwright/test in its node_modules (most slopstopper
// adopters do, since the smoke / a11y / broken-links checks require it). The
// skill script itself lives in the library and is reused across posts.
//
// Usage:
//   cd ~/dev/hungovercoders/site
//   node ~/dev/hungovercoders/library/skills/hc-screenshot/scripts/capture-github-pr.mjs \
//       --pr-url https://github.com/hungovercoders/site/pull/29 \
//       --out-dir public/assets/2026-06-15-slopstopper-on-tap \
//       [--workflow-file ss-security-dast-check.yml] \
//       [--branch <branch-name>] \
//       [--storage-state <path-to-playwright-storage-state.json>]
//
// Captures (when given a PR URL):
//   <out>/step-07-pr-checks.png       — the PR checks page
//   <out>/step-08-pr-actions.png      — the Actions tab filtered to the branch
//   <out>/step-09-workflow-detail.png — one workflow run detail (default: the
//                                       latest run of --workflow-file, or just
//                                       the first run on the page if unset)

import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

// ---- args -----------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
	prUrl: null,
	outDir: null,
	workflowFile: null,
	branch: null,
	storageState: null,
};
for (let i = 0; i < args.length; i++) {
	const k = args[i];
	const v = args[i + 1];
	if (k === '--pr-url') { opts.prUrl = v; i++; }
	else if (k === '--out-dir') { opts.outDir = v; i++; }
	else if (k === '--workflow-file') { opts.workflowFile = v; i++; }
	else if (k === '--branch') { opts.branch = v; i++; }
	else if (k === '--storage-state') { opts.storageState = v; i++; }
}
if (!opts.prUrl || !opts.outDir) {
	console.error('Usage: capture-github-pr.mjs --pr-url <url> --out-dir <path> [--workflow-file ss-foo.yml] [--branch <branch>] [--storage-state <json>]');
	process.exit(1);
}

// ---- derive owner/repo/PR + branch from the PR URL ------------------------
const m = opts.prUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)$/);
if (!m) {
	console.error(`Could not parse owner/repo/pr from --pr-url: ${opts.prUrl}`);
	process.exit(1);
}
const [, owner, repo, prNum] = m;
const ownerRepo = `${owner}/${repo}`;

// Best-effort branch detection. If --branch wasn't passed, ask gh CLI; if gh
// isn't available, fall through and only step-07 + step-09 will work.
function detectBranch() {
	if (opts.branch) return opts.branch;
	try {
		return execSync(`gh pr view ${prNum} --repo ${ownerRepo} --json headRefName -q .headRefName`, {
			encoding: 'utf8',
		}).trim();
	} catch (_) {
		return null;
	}
}
const branch = detectBranch();

// ---- resolve @playwright/test from cwd ------------------------------------
// Node ESM resolves bare specifiers from the script's location, which won't
// find anything when the script lives in a library directory with no
// node_modules. Pin resolution to cwd instead — most hungovercoders repos
// have @playwright/test installed for the slopstopper reliability checks.
const cwdRequire = createRequire(`${process.cwd()}/__resolve__`);
let playwrightModulePath;
try {
	playwrightModulePath = cwdRequire.resolve('@playwright/test');
} catch (_) {
	console.error(`Could not resolve @playwright/test from ${process.cwd()}. Run this from a repo that has @playwright/test in its devDeps (e.g. the slopstopper-installed adopter repo), or npm install it locally first.`);
	process.exit(1);
}
// @playwright/test is a CJS-style module with an ESM compat layer that puts
// everything on the `.default` namespace when imported via a resolved path.
const playwrightModule = await import(playwrightModulePath);
const { chromium } = playwrightModule.default ?? playwrightModule;

// ---- output dir + capture helper -----------------------------------------
await mkdir(opts.outDir, { recursive: true });

const browser = await chromium.launch();
const contextOpts = {
	viewport: { width: 1440, height: 900 },
	deviceScaleFactor: 2,
	colorScheme: 'dark',
};
if (opts.storageState) contextOpts.storageState = opts.storageState;
const ctx = await browser.newContext(contextOpts);
const page = await ctx.newPage();

async function settle() {
	try {
		await page.waitForLoadState('networkidle', { timeout: 15000 });
	} catch (_) {
		/* GitHub polls check status; networkidle may not fire */
	}
	// Hide common UI clutter (cookie banner, sign-up prompt) so the capture
	// frames what the writer actually wants.
	await page.addStyleTag({
		content: `
			[data-target="cookie-consent-link.cookieConsentBanner"],
			.cookie-consent-banner,
			.js-notice,
			.flash,
			[aria-label="Sign up"],
			.signup-prompt,
			.js-signup-prompt { display: none !important; }
		`,
	}).catch(() => {});
}

async function shot(name) {
	const path = `${opts.outDir}/${name}`;
	await page.screenshot({ path, fullPage: false });
	console.log(`wrote ${path}`);
}

// ---- 1. PR checks page ----------------------------------------------------
await page.goto(`${opts.prUrl}/checks`, { waitUntil: 'domcontentloaded' });
await settle();
await page.waitForTimeout(2000);
await shot('step-07-pr-checks.png');

// ---- 2. Actions tab filtered to the branch --------------------------------
if (branch) {
	const safeBranch = encodeURIComponent(`branch:${branch}`);
	await page.goto(
		`https://github.com/${ownerRepo}/actions?query=${safeBranch}`,
		{ waitUntil: 'domcontentloaded' },
	);
	await settle();
	await page.waitForTimeout(2000);
	await shot('step-08-pr-actions.png');
} else {
	console.warn('No branch detected (pass --branch or have gh CLI available) — skipping step-08-pr-actions.png');
}

// ---- 3. One workflow run detail page --------------------------------------
let runUrl = null;
if (opts.workflowFile && branch) {
	try {
		runUrl = execSync(
			`gh run list --repo ${ownerRepo} --branch ${branch} --workflow ${opts.workflowFile} --limit 1 --json url -q '.[0].url'`,
			{ encoding: 'utf8' },
		).trim();
	} catch (_) {
		/* fall through */
	}
}
if (!runUrl) {
	// Fall back: scrape the first /actions/runs/ link from the Actions page.
	if (branch) {
		runUrl = await page.evaluate(() => {
			const a = document.querySelector('a[href*="/actions/runs/"]');
			return a ? a.href : null;
		});
	}
}
if (runUrl) {
	await page.goto(runUrl, { waitUntil: 'domcontentloaded' });
	await settle();
	await page.waitForTimeout(2500);
	await shot('step-09-workflow-detail.png');
} else {
	console.warn('No workflow run found — skipping step-09-workflow-detail.png. Pass --workflow-file and --branch, or have gh CLI available.');
}

await browser.close();
console.log('done');
