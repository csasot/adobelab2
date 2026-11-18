#!/usr/bin/env node
// gate-state.mjs — writes the state copy gate-all.mjs --state reads: every page whose coverage row is
// deployed / verified / failed becomes `status: deployed` with its live URL. state.json is never touched.
// Usage: node stardust/rollout/units/gate-state.mjs [--out stardust/.work/gate-state.json]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: node stardust/rollout/units/gate-state.mjs [--out stardust/.work/gate-state.json]');
  process.exit(0);
}
const oi = args.indexOf('--out');
const out = oi >= 0 ? args[oi + 1] : 'stardust/.work/gate-state.json';
const LIVE = 'https://main--12a63657--aemcoder.aem.live';
const state = JSON.parse(readFileSync('stardust/state.json', 'utf8'));
const cov = JSON.parse(readFileSync('stardust/rollout/coverage/pages.json', 'utf8'));
const delivered = new Map(cov.pages
  .filter((p) => ['deployed', 'verified', 'failed'].includes(p.delivery && p.delivery.status))
  .map((p) => [p.slug, p.path === '/' ? '/' : p.path.replace(/\/$/, '')]));
const pages = state.pages
  .filter((p) => delivered.has(p.slug))
  .map((p) => ({ ...p, status: 'deployed', liveUrl: LIVE + delivered.get(p.slug) }));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ ...state, pages }, null, 1));
console.log(`gate-state: ${pages.length} deployed page(s) → ${out}`);
