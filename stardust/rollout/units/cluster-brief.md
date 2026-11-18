# Cluster unit brief (one template's siblings) — read after common-brief.md

Goal: every sibling page of your template rendered, delivered LIVE and passing its gate row at 1440 AND 360 on the
published origin, reusing the archetype's blocks and content model unchanged (fork the archetype, never re-author).

Steps (handoff-contract §1 rows 1–9, §3 row C cluster):
1. Read the archetype's content file (content/<archetype-path>.html) and its section in stardust/eds-conversion-log.md
   — that is the encoder you reuse. Read stardust/migrate/progress.json `units` for your render unit(s) (slug lists).
2. Variance probe once: `node stardust/scripts/replica/sibling-variance.mjs <archetype-live-url> <sibling-urls…>
   --probe <block>=<sel> … --width 1440` (through run-bg). Deltas → block VARIANT classes, never per-page forks.
   Keep the JSON at stardust/rollout/units/<unit>-variance.json.
3. Render (migrate units): for each render unit, mark it `running` then `done` in stardust/migrate/progress.json
   with a targeted edit of `units.<name>` only (other agents edit other keys — re-read, merge, write at once).
   Build each sibling's HTML from the archetype's structure + the sibling's captured content
   (stardust/current/pages/<slug>.json / .html), then
   `node stardust/scripts/migrate/migrate.mjs render <slugs…> --archetype <slug>=<archetype> --source <slug>=<file>…`
   and record judgments (`migrate.mjs gate <slug> content-fidelity --evidence …`, `modules`, `variant`, `deviation`).
   A bodyless page goes tier thin (`--branch-b`) with its contentGap, never padded. Prefer writing ONE encoder script
   under stardust/.work/<unit>/probes/ that turns a captured page into content/<path>.html in the archetype's model,
   then run it over all your pages — do not hand-author pages one by one.
4. After rendering: `node stardust/scripts/rollout/inventory.mjs --site-url https://omyapersonalcare.us/` (NO --state)
   so your pages get coverage rows (it keeps existing rows' delivery state).
5. Per page chain from common-brief (delivery-lint, media-reconcile, davids-model-lint, sanitise, alt-audit), then
   ONE deploy-batch.mjs run for all your pages (`--paths stardust/rollout/units/<unit>.paths`,
   `--ledger stardust/deploy/ledger-<unit>.json`, `--concurrency 2`, publish live). Images: da-media-upload with a
   per-unit `--ledger stardust/deploy/media-ledger-<unit>.json`. Internal links to pages not among the 71 in scope
   stay pointing at the source site.
6. `update-coverage.mjs <slug> --status deployed --url …` per page, `node stardust/rollout/units/gate-state.mjs`, then
   `gate-all.mjs --state stardust/.work/gate-state.json --only <your slugs> --eds-host
   https://main--12a63657--aemcoder.aem.page --width 1440`, then `--width 360` (through run-bg, one at a time).
   Fix failing rows (cap 3 rounds per page; fix in the encoder/block, re-run the encoder, re-PUT with --force only the
   changed pages). Waive a known source-side residual only by name in gates/all-<w>/overrides.json (targeted merge).
   NOTE: `--only` runs write runs/<ts>-<slug>.json, summary.* is untouched — read your rows from those.
7. Foundation is FROZEN; requests go to stardust/rollout/foundation-requests.md. Blocks you reuse are owned by their
   archetype unit: change one only if a sibling cannot be expressed as a variant, and only additively (new variant
   class), re-checking the archetype page still passes.
8. Append `## C-cluster <template> — …` to stardust/eds-conversion-log.md. Do NOT write stardust/status.jsonl,
   stardust/rollout/progress.json, stardust/journal.md, stardust/state.json.
Report in ≤ 8 lines: line 1 `<template>: pages n/n live, blocks k, gate 1440 max x% / 360 max y% (fails f), requests r`;
then each render unit's `rendered N, unchanged N, refused N, passthrough N`, commit shas, failing pages with causes.
Stop every background process you started first.
