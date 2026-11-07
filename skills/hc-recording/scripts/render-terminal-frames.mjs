// Render a scripted terminal session as PNG frames in the hungovercoders dark
// terminal look (same chrome, fonts and colour mapping as
// hc-screenshot/scripts/generate-terminal-screenshot.mjs), at a fixed size so
// the frames encode as video. Usage:
//   node render-terminal-frames.mjs <steps.json> "<title bar text>" <frames-dir>
// steps.json: [{"cmd": "...", "outputFile": "...", "clear": true, "hold": 3}]
// Resolves `sharp` from the current working directory, like the other scripts.
import { readFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const sharp = createRequire(`${process.cwd()}/__resolve__`)('sharp');
const [,, stepsFile, title, framesDir] = process.argv;
const steps = JSON.parse(readFileSync(stepsFile, 'utf8'));
mkdirSync(framesDir, { recursive: true });
const width = 1100, height = 620, fontSize = 15, lineHeight = fontSize * 1.45, padX = 28, padTop = 56;
const maxLines = Math.floor((height - padTop - 20) / lineHeight);
const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const colorise = line => {
  const e = escape(line);
  if (/^\s*\$ /.test(line)) return `<tspan fill="#60a5fa">${e}</tspan>`;
  if (/^\s*✅|\bpassed\b|\bSUCCESS\b|within budget|^\s*\|.*✅ ok.*\|$/i.test(line) && !/❌/.test(line)) return `<tspan fill="#4ade80">${e}</tspan>`;
  if (/^\s*❌|\bfailed\b|\bFAIL\b|\berror\b|fail on it|❌ over/i.test(line)) return `<tspan fill="#f87171">${e}</tspan>`;
  if (/^\s*⚠️|\bwarn\b/i.test(line)) return `<tspan fill="#fbbf24">${e}</tspan>`;
  if (/^\s*#/.test(line)) return `<tspan fill="#9ca3af">${e}</tspan>`;
  if (/^\s*ℹ️|^\s*🔍|^\s*📚|^\s*📁|^\s*📏|^\s*🎉|^\s*━━━━/.test(line)) return `<tspan fill="#a5b4fc">${e}</tspan>`;
  return e;
};
const frame = (lines, cursor) => {
  const shown = lines.slice(-maxLines);
  const body = shown.map((l, i) => `<text x="${padX}" y="${padTop + (i + 1) * lineHeight - fontSize * 0.3}" xml:space="preserve">${colorise(l)}</text>`).join('\n');
  const cy = padTop + (shown.length + 1) * lineHeight - fontSize * 0.3;
  const cur = cursor ? `<text x="${padX}" y="${cy}" xml:space="preserve"><tspan fill="#60a5fa">$ </tspan>${escape(cursor.typed)}<tspan fill="#e5e7eb">▌</tspan></text>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?><svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#16161a"/>
  <rect width="${width}" height="${padTop - 16}" fill="#202024"/>
  <circle cx="22" cy="22" r="6" fill="#ff5f57"/><circle cx="42" cy="22" r="6" fill="#febc2e"/><circle cx="62" cy="22" r="6" fill="#28c840"/>
  <text x="${width / 2}" y="28" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#9ca3af">${escape(title)}</text>
  <g font-family="Menlo, 'DejaVu Sans Mono', 'Courier New', monospace" font-size="${fontSize}" fill="#e5e7eb">${body}${cur}</g></svg>`;
};
const FPS = 15; let n = 0;
const emit = async (svg, repeat = 1) => { const buf = await sharp(Buffer.from(svg)).png().toBuffer(); for (let i = 0; i < repeat; i++) await sharp(buf).toFile(`${framesDir}/f${String(n++).padStart(4,'0')}.png`); };
let screen = [];
await emit(frame(screen, { typed: '' }), Math.round(FPS * 0.6));
for (const step of steps) {
  if (step.clear) { screen = []; await emit(frame(screen, { typed: '' }), Math.round(FPS * 0.3)); }
  for (let i = 1; i <= step.cmd.length; i++) await emit(frame(screen, { typed: step.cmd.slice(0, i) }), 1);
  await emit(frame(screen, { typed: step.cmd }), Math.round(FPS * 0.4));
  screen = [...screen, '$ ' + step.cmd];
  const wrap = (l, max = 118) => { const r = []; let ind = (l.match(/^\s*/) || [''])[0] + '    '; while (l.length > max) { let cut = l.lastIndexOf(' ', max); if (cut < max / 2) cut = max; r.push(l.slice(0, cut)); l = ind + l.slice(cut).trimStart(); } r.push(l); return r; };
  const out = readFileSync(step.outputFile, 'utf8').replace(/\x1b\[[0-9;]*[A-Za-z]/g, '').replace(/\r/g, '').trimEnd().split('\n').flatMap(l => wrap(l));
  const chunk = Math.max(1, Math.ceil(out.length / 14));
  for (let i = chunk; i < out.length; i += chunk) await emit(frame([...screen, ...out.slice(0, i)], null), 1);
  screen = [...screen, ...out, ''];
  await emit(frame(screen, { typed: '' }), Math.round(FPS * (step.hold ?? 3)));
}
console.log('frames', n);
