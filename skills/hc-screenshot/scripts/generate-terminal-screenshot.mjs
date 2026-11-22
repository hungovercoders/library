#!/usr/bin/env node
// Render terminal output (stdin) as a PNG with a dark "terminal window"
// chrome, suitable for embedding in walkthroughs where a real macOS
// `screencapture -W` is impractical (CI / headless agent / want a clean,
// reproducible visual).
//
// Stdin = the raw terminal text. Args:
//   --out <path>      where to write the PNG
//   --title <string>  fake window title-bar text (defaults to "Terminal")
//   --width <px>      output width (default 1400)
//   --browser         render as a browser chrome instead of terminal (for
//                     mocking up "look-and-feel" frames when a real browser
//                     capture isn't possible)
//
// Resolves `sharp` from the *current working directory* — the skill script
// lives in the library and is invoked from any adopter repo that has sharp
// in its devDeps. Most hungovercoders repos do (it's the engine behind the
// share-image generator).
//
// Usage from any cwd that has sharp installed:
//   cat <command-output> | node ~/dev/hungovercoders/library/skills/hc-screenshot/scripts/generate-terminal-screenshot.mjs \
//       --out public/assets/<slug>/step-NN-name.png --title "title bar text"

import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';

const cwdRequire = createRequire(`${process.cwd()}/__resolve__`);
let sharpModulePath;
try {
	sharpModulePath = cwdRequire.resolve('sharp');
} catch (_) {
	console.error(`Could not resolve sharp from ${process.cwd()}. Run this from a repo that has sharp in its devDeps (the hungovercoders site does — it's the share-image engine).`);
	process.exit(1);
}
const sharpModule = await import(sharpModulePath);
const sharp = sharpModule.default ?? sharpModule;

const args = process.argv.slice(2);
let out = null;
let title = 'Terminal — slopstopper install';
let width = 1400;
let browser = false;
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--out') out = args[++i];
	else if (args[i] === '--title') title = args[++i];
	else if (args[i] === '--width') width = parseInt(args[++i], 10);
	else if (args[i] === '--browser') browser = true;
}
if (!out) {
	console.error('Usage: ... | node scripts/generate-terminal-screenshot.mjs --out <path> [--title "..."] [--width 1400] [--browser]');
	process.exit(1);
}

const text = await new Promise((resolve) => {
	let data = '';
	process.stdin.on('data', (c) => { data += c; });
	process.stdin.on('end', () => resolve(data));
});

// Strip ANSI escape sequences (cheaply — covers SGR + cursor codes).
const stripped = text.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
const lines = stripped.replace(/\r/g, '').split('\n');
// Drop trailing blank lines but keep internal ones.
while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

const fontSize = 16;
const lineHeight = fontSize * 1.45;
const padX = 28;
const padTop = browser ? 100 : 56;
const padBottom = 28;

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Highlight common terminal markers (✅ ❌ ⚠️ green-ish for success, red for fail).
// A failure is looked for first, and a count of nothing is neither: "0 passed, 1 failed"
// is a failure, and "10 passed, 0 failed" a success.
const toneOf = (line) => {
	const failing = line.replace(/\b(0|no) (failed|failures?|errors?)\b/gi, '');
	const passing = line.replace(/\b0 (passed|passing|succeeded)\b/gi, '');
	if (/^\s*❌|\bfail(ed|ure|ures|ing)?\b|\berrors?\b/i.test(failing)) return '#f87171';
	if (/^\s*✅|\bpass(ed)?\b|\bSUCCESS\b|\bgreen\b|\bAll .* pass\b/i.test(passing)) return '#4ade80';
	if (/^\s*⚠️|\bwarn\b|\bwarning\b/i.test(line)) return '#fbbf24';
	if (/^\s*[#$]\s|\$\s|^[➜>]/i.test(line)) return '#60a5fa';
	if (/^\s*ℹ️|^\s*🔍|^\s*📚|^\s*📁|^\s*🎉|^\s*━━━━/.test(line)) return '#a5b4fc';
	return null;
};

// A line longer than the window wraps onto the next row, as a terminal would show it,
// and keeps its colour. Nothing runs off the right edge.
const columns = Math.max(20, Math.floor((width - padX * 2) / (fontSize * 0.6)));
const wrap = (line, at) => {
	if (line.length <= at) return [line];
	const rows = [];
	for (let from = 0; from < line.length; from += at) rows.push(line.slice(from, from + at));
	return rows;
};
const rows = lines.flatMap((line) => {
	const fill = toneOf(line);
	return wrap(line, columns).map((text) => (fill ? `<tspan fill="${fill}">${escape(text)}</tspan>` : escape(text)));
});
const height = Math.max(420, Math.ceil(padTop + rows.length * lineHeight + padBottom));

const chrome = browser
	? `
    <rect width="${width}" height="${padTop - 12}" fill="#202024"/>
    <circle cx="22" cy="22" r="6" fill="#ff5f57"/>
    <circle cx="42" cy="22" r="6" fill="#febc2e"/>
    <circle cx="62" cy="22" r="6" fill="#28c840"/>
    <rect x="100" y="12" width="${width - 220}" height="24" rx="4" fill="#34343a"/>
    <text x="${width / 2}" y="30" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#9ca3af">${escape(title)}</text>
    <rect x="20" y="52" width="${width - 40}" height="32" rx="4" fill="#2a2a2e"/>
    <text x="36" y="74" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#9ca3af">github.com / hungovercoders / site · PR #29 · checks</text>`
	: `
    <rect width="${width}" height="${padTop - 16}" fill="#202024"/>
    <circle cx="22" cy="22" r="6" fill="#ff5f57"/>
    <circle cx="42" cy="22" r="6" fill="#febc2e"/>
    <circle cx="62" cy="22" r="6" fill="#28c840"/>
    <text x="${width / 2}" y="28" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#9ca3af">${escape(title)}</text>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#16161a"/>${chrome}
  <g font-family="Menlo, 'JetBrains Mono', 'Courier New', monospace" font-size="${fontSize}" fill="#e5e7eb">
${rows
		.map(
			(row, i) =>
				`    <text x="${padX}" y="${padTop + (i + 1) * lineHeight - fontSize * 0.3}" xml:space="preserve">${row}</text>`,
		)
		.join('\n')}
  </g>
</svg>`;

await mkdir(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out} (${width}x${height})`);
