# C-archetype unit brief (one template) — read after common-brief.md

Goal: deploy this template's GATED archetype page and make it pass its full gate row on the published origin
at 1440 AND 360. This is the encoder every sibling of the template will reuse, so author blocks cleanly.

Steps
1. Read stardust/rollout/plan.json (your page's step: blocks to `convert`, blocks to `reuse` by edsBlockName — never
   recreate a reused block) and stardust/migrated/<path>/index.html + _meta.json, the prototype
   stardust/prototypes/<slug>-proposed.html + <slug>.css, and stardust/eds-conversion-log.md (C0 decisions: header
   overlays the first section; `hero` on home, `page-hero` on inner pages pads its own top by var(--header-h)).
2. Foundation is FROZEN (stardust/rollout/foundation-freeze.json: styles/, fonts/, head.html, scripts/,
   blocks/header/, blocks/footer/). Never edit a frozen file. A foundation need = one line appended to
   stardust/rollout/foundation-requests.md (`- <unit> | <what> | <evidence> | <templates>`) and a scoped override in
   your OWN block CSS. `node stardust/scripts/replica/foundation-freeze.mjs check` must exit 0 before you report.
3. Author content/<path>.html + your blocks (EW1–EW10, section-schema → rows → decorate, block-roundtrip --ew), run
   the per-page chain from common-brief, lint, commit, push, wait for code sync (bounded poll of your block CSS on
   the preview host), deploy with deploy-batch.mjs (`--paths stardust/rollout/units/<unit>.paths`,
   `--ledger stardust/deploy/ledger-<unit>.json`, publish live).
4. Gate: `node stardust/rollout/units/gate-state.mjs` after `update-coverage.mjs <slug> --status deployed --url
   https://main--12a63657--aemcoder.aem.page<path>`; then through run-bg:
   `node stardust/scripts/replica/gate-all.mjs --state stardust/.work/gate-state.json --only <slug>
   --eds-host https://main--12a63657--aemcoder.aem.page --width 1440` (and `--width 360`).
   A known source-side residual may be waived ONLY by name in gates/all-<w>/overrides.json — edit that file with a
   targeted merge of your one key (other units write it too), e.g. fonts for the source's dead frutigerbold face.
   Fix rounds cap 3; be economical — fix the first failing criterion, off the instruments.
5. Append a short `## C-archetype <template> — …` entry to stardust/eds-conversion-log.md (blocks, decode tier,
   residuals). Do NOT write stardust/status.jsonl, stardust/rollout/progress.json, stardust/journal.md,
   stardust/state.json.
Report in ≤ 8 lines: line 1 `<template>: pages 1/1 live, blocks k, gate 1440 x% Δh / 360 y% Δh, clip n,
content MISSING m, requests r`; then commit sha(s) and residuals with causes. Stop every background process first.
