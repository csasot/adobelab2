#!/usr/bin/env node
// alt-audit.mjs — every non-empty <img alt> in a delivered content file must occur in the page's capture
// (stardust/current/pages/<slug>.json or .html). Invented alts are a content-fidelity defect.
// Usage: node stardust/rollout/units/alt-audit.mjs <content.html> <slug> [--fix]   (exit 1 when any invented)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const [file, slug] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!file || !slug || process.argv.includes('--help')) {
  console.log('Usage: node stardust/rollout/units/alt-audit.mjs <content.html> <slug> [--fix]');
  process.exit(file && slug ? 0 : 2);
}
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
const cap = ['json', 'html'].map((x) => `stardust/current/pages/${slug}.${x}`)
  .filter((p) => existsSync(p)).map((p) => dec(readFileSync(p, 'utf8'))).join('\n');
let html = readFileSync(file, 'utf8');
const bad = [];
html = html.replace(/(<img\b[^>]*\balt=")([^"]+)(")/g, (m, a, alt, b) => {
  if (cap.includes(dec(alt))) return m;
  bad.push(dec(alt));
  return `${a}${b}`;
});
for (const b of bad) console.log(`invented alt: "${b}"`);
if (bad.length && process.argv.includes('--fix')) { writeFileSync(file, html); console.log(`fixed ${bad.length} → alt=""`); }
console.log(`alt-audit ${file}: ${bad.length} invented`);
process.exit(bad.length && !process.argv.includes('--fix') ? 1 : 0);
