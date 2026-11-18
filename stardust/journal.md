# Journal — omyapersonalcare.us replica migration

## Extract — 71 of 100 planned pages captured live (2026-11-17)

- `extract --prep --dynamics --pages <100 plan URLs>`; Real Chrome headless, no bot protection, no headed fallback.
- 71 pages captured and typed: landing 1, article 45 (blog 18, events 24, news 3), listing 5, form 8, static 9, unique 3.
- 29 plan URLs under `/our-products/*` leave the origin: 17 redirect to products.omya.com (off-origin design), 12 redirect then 404. Not in state.json; carried as redirect targets (`site.excluded`).
- Fonts: rendered face is Arial (system); declared Frutiger files 404; Font Awesome 5 Free Solid is the only loaded webfont (open licence, captured).
- Martech seen: Didomi CMP, GTM, GA, Google Ads, AdRoll, reCAPTCHA v2; YouTube embeds on 4 pages.
- Open item for recreation: mobile menu lives outside `<header>`; header contract only recorded desktop controls.

## dynamics detect, classify, triage — 41 findings → 25 curated rows, martech scaffolded off (2026-11-17)

- `dynamics-detect --from-state --reach`: 6 pages probed, reach 71/71; 41 findings. No site search (no probe owed).
- `spec-martech` + `dynamics-plan --martech --chrome`: GTM-NS9KZC3 route (disabled); Didomi CMP not resolvable by vendors.json (`consent.cmp` null) — recorded in contract `tagNotes` with the GTM rules (cited). Model `owner-decision`; source gates GTM on Didomi vendor `c:googleana-4TXnJigR`.
- Curated `stardust/dynamic-features.md` + `-plan.md`: self = chrome, listings (blog/events/news, document-first), rep-locator hotspots, YouTube; interim forms (D1/D2); regulated blocked UI: careers, onboarding (D3), Stripe invoice (D4); credit application = PDF link (D5); martech off (D6). No decided-out.
- `martech-scaffold`: wrote `scripts/martech.js` (cmp null, routes []), hooked scripts.js loadEager, consented.js, consent-check.js.

## Preserve direction — verbatim promotion, empty register, dynamics triaged (2026-11-17)

- PRODUCT.md / DESIGN.md / DESIGN.json promoted verbatim from stardust/current/; stardust/direction.md records preserve mode, hands-off, roster and named assumptions.
- Inconsistency register empty — pure replica. No target breakpoints; gates at 1440 and 360.
- Dynamics: 25 curated rows (stardust/dynamic-features.md + -plan.md); listings document-first; 3 regulated forms (careers, onboarding, pay-your-invoice) UI rebuilt with submission blocked; interim local-capture for the other forms. No site search on the source.
- Martech: contract + hand-off written with every part disabled (GTM, GA4, Google Ads, AdRoll, Didomi notes); scripts/martech.js scaffolded and wired, loads nothing until the owner enables parts.
- Open: index config — dynamics skill says helix-query.yaml, AGENTS.md says config lives at tools.aem.live; settle at listing build.
- Project adaptation: stardust/scripts/replica/gate.sh gained GATE_PROBES_SERIAL=1 (run --full probes one at a time) to hold the machine's 3-Chromium budget; unset = upstream behaviour.

## Source-fidelity gate — index (landing) passes 1440 0.81% / 360 1.50% (2026-11-17)

- Canon written: stardust/prototypes/canon.css + canon.js (header, footer, newsletter popup, Find-a-Rep FAB, contact band, insights band); content root `#interior-content`.
- 1440: 2 iterations, 0.81%, Δh 0; 360: 3 iterations, 1.50%, Δh 0; content-diff 0🔴/0🟡, clip 0, chrome-parity 0, cap-probe PASS. Motion: 13 behaviours matched, 2 dead.
- Residuals: reCAPTCHA widget (domain-bound key) replicated as a same-size slot (D2); partner-logo marquee position varies per capture.

## Source-fidelity gate — about (static) passes 1440 0.40% / 360 1.34% (2026-11-17)

- 1440: 2 iterations, 0.40%, Δh 0; 360: 1 iteration, 1.34%, Δh 0; content-diff 0🔴/0🟡, clip 0, header/footer crops 0.00%, cap-probe PASS. Motion 7 parity.
- New canon modules: alt-row, cta-band. Inner header + title band held in about.css pending canon merge; quirks-mode top strip fix (line-height 0) needed by every inner header.
- Residual: reCAPTCHA slot (D2).

## Source-fidelity gate — blog-aak-partnership (article) passes 1440 0.76% / 360 2.99% (2026-11-17)

- 1440: 3 iterations, 0.76%, Δh 0; 360: 1 iteration, 2.99%, Δh 0; content-diff 0🔴/0🟡, clip 0, header/footer 0.00%, cap-probe PASS.
- New canon modules: header-inner (+ --photo), page-hero, article (--post/--event/--news), band-solo. Event pages: header-inner without photo, article--event.
- Residual: reCAPTCHA slot (D2). Follow-up: about.css inner header duplicates canon header-inner — merge at foundation (C0).

## Source-fidelity gate — insights-blog (listing) passes 1440 3.14% / 360 1.97% (2026-11-17)

- Content root `#insights-section` (live listing pages have no #interior-content). 1440: 3 iterations, 3.14%, Δh 0; 360: 1 iteration, 1.97%, Δh 0; content-diff 0🔴/0🟡; units 10/10; cap-probe PASS.
- Residual: Cosmospheres band YouTube iframe shows "Error 153" on the source (player config/referrer); the build uses the identical embed URL, which plays. Hands-off decision: keep the identical embed (no content or design change; the source state is a third-party error, not authored design).
- Inner header/banner duplicated under `.ib-` prefix in insights-blog.css — merge into canon header-inner/page-hero at C0, with the quirks-mode aux-strip fix.

## Source-fidelity gate — contact (form) passes 1440 0.04% / 360 0.14% (2026-11-17)

- 1440 and 360: 3 iterations each (one real fix: +40 px spacing), 0.04% / 0.14%, Δh 0; content-diff 0🔴/0🟡; chrome-parity 0; units 8/8; cap-probe PASS.
- New canon modules: form, page-hero-compact, nav-current, post-tile-half. Residual: reCAPTCHA slot (D2).

## Source-fidelity gate — contact-rep-locator (unique) passes 1440 1.07% / 360 2.48% (2026-11-17)

- Height Δ 0 at both widths; content-diff 0 🔴 / 0 nothing-lost; clip 0; overflow ok; chrome-parity ok; cap-probe PASS (2560, 4/4).
- Residuals: reCAPTCHA v2 widget in the contact band (capture-state, dynamics D2, flagged for delivery).
- Motion: US state-map hover fill + tooltip and click-to-show rep cards observed and implemented (progress.json).
- Approved hands-off.

## Recreate — six archetypes gated and approved, prototype table complete (2026-11-17)

- Archetypes: index (landing), about (static), blog-aak-partnership (article), insights-blog (listing), contact (form), contact-rep-locator (unique); all approved hands-off.
- Prototype table (gate-all --stage prototype): 1440 and 360 both 6/6 delivered — 5 full PASS + 1 documented override.
- Override: index `fonts` only — the source's own 'frutigerbold' @font-face 404s on the live site (origin fontsFailed), so the origin renders the Arial fallback the prototype also uses; build-side fontsFailed empty. Recorded in gates/prototypes-<w>/overrides.json.
- Worst pixel: insights-blog 1440 3.14% (YouTube error state on the source); all Δh 0.

## Migrate plan — 6 archetypes + 65 siblings in 12 render units (2026-11-17)

- Scope: the 71 captured plan pages; the 29 off-origin /our-products/* URLs are redirect rows only.
- Path A 6 archetypes (all gated at 1440 + 360); Path A′ 65 siblings: article 44 (6 units), static 8, form 7, listing 4, unique 2.
- Siblings render only after their template's archetype is live and gated on the published origin (C-deliver `archetype` unit). Units in stardust/migrate/progress.json; plan in stardust/migrate/plan.md.

## A-inventory — 6 archetype rows, siblings join per render cluster (2026-11-17)

- `inventory.mjs --state` keyed archetypes by `/about` but state URLs by `/about/`, duplicating every archetype as `<slug>-x`; re-run from the migrated tree only. Sibling rows enter coverage as each render cluster writes its sidecars (`template` = archetype slug); inventory re-runs after every render unit.
- DA: aemcoder/12a63657 ref main (list 200, token preflighted); live host main--12a63657--aemcoder.aem.live.

## B-block — 14 distinct blocks, each converted once (2026-11-17)

- blocks.mjs: 14 module blocks, 23 instances; band-pair and page-hero reused on 5 archetypes. plan.mjs: representative-first, every archetype is its template's representative.

## B2-dynamic — fresh detect matches the curated triage (2026-11-17)

- dynamics-detect (one page per type + home) → 41 findings, as at preserve-direction; plan draft 42 rows vs 42. Only delta: a rotating third-party ad-sync host (sync.teads.tv seen instead of s.seedtag.com) — ad-tag chain, covered by the martech contract (all parts disabled). No first-party APIs, no host-bound rows. Curated stardust/dynamic-features.md stands; evidence in stardust/.work/dynamics/b2/.

## C-deliver foundation — chrome, styles and home page live; gates pass (2026-11-17)

- Foundation subagent: runtime contract, styles/fonts/favicon, header (with mobile drawer, call tab, rep badge, request-info popup), footer, band-pair, hero/process/feature-row/partners blocks; nav/footer (noindex) and /index published live.
- Published-origin gate on /index: 1440 0.69% Δh 0, 360 1.54% Δh 0, clip 0, content MISSING 0 (fonts waived: source-side frutigerbold 404). crop-compare header/footer ≤ 0.12%.
- Header overlays the first section; hero/page-hero blocks carry the photo band. reCAPTCHA test key is rejected by Google, so the widget loads on first form interaction (D2 open).
- gate-all needs `deployed` rows in a state file: stardust/rollout/units/gate-state.mjs builds stardust/.work/gate-state.json from coverage (state.json untouched). Foundation frozen.

## C-deliver archetype-static — /about live, 1440 0.45% / 360 1.48% (2026-11-17)

- New blocks page-hero (all inner templates; `tall` variant for article photo header), alt-row, cta-band; band-pair reused. Passed first run, no override.
- Coordinator check found authored alt text not present on the source (6 on /about, 7 on /index — source images carry no alt): blanked and re-published; alt-audit.mjs added to every brief as a pre-PUT check.
- Foundation request queued: `texture` section style to styles.css.

## C-deliver archetype-article — /blog/aak-partnership live, 1440 0.76% / 360 3.24% (2026-11-17)

- Article body = default content in an `article-body` section; `article` block carries only the date line; metadata Title/Description/Image/PublishDate/Category. First run, no override; alt-audit 0.

## C-deliver archetype-listing — /insights/blog live, 1440 3.31% / 360 2.33% (2026-11-17)

- post-list (10 captured cards authored in the block; index wiring later) + video-band; page-hero reused. One round: units.json tile selector extended for the block markup. Residual: source YouTube error state vs our working player. Foundation request: auto-embed video links.

## C-deliver archetype-unique — /contact/rep-locator live, 1440 1.09% / 360 2.72% (2026-11-17)

- rep-locator block: authored reps (photo | name/phone/email | states), state outlines in block JS; hover fill + tooltip, click/keyboard shows reps. First run, no override; EW 34/34 rep texts editable.

## C-deliver archetype-form — /contact live, 1440 0.09% / 360 0.41% (2026-11-17)

- New `form` block (labels kept as accessible names, local-capture behaviour from scripts/forms.js) + contact-offices; band-pair `solo` extended additively to render the insights band alone. One fix round. Foundation request: FORM_ENDPOINTS `contact-page` key.

## C-deliver cluster-static — 8/8 live, 1440 max 6.57% / 360 max 6.41% (2026-11-17)

- New blocks team, table; partners `grid` variant; section styles heading-small/legal interim in page-hero.css (foundation request queued). One fix round (list spacing, table gap) cleared 360 fails on terms-of-use/privacy-policy. Privacy-policy residual: cookie table column auto-size, Δh −40 px at 1440.

## C-deliver cluster-form — 7/7 live, 1440 max 4.70% / 360 max 5.39% (2026-11-17)

- One encoder; form block extended additively (select, checkbox, file, split rows; variants no-captcha/blocked/payment/tight). Careers/onboarding/pay-invoice submissions blocked per dynamics D3/D4; get-a-sample thin (no source body). /contact re-gated unchanged. 2 foundation requests queued.

## C-deliver cluster-unique — 2/2 live, 1440 max 0.98% / 360 max 2.94% (2026-11-17)

- Thank-you pages do not share the rep-locator layout; built from page-hero + band-pair. `blank` section style (interim in page-hero.css, foundation request queued). No fix rounds.

## C-deliver cluster-listing — 4/4 live, 1440 max 5.32% / 360 max 4.29% (2026-11-17)

- /events, /news on the post-list model; /insights/events and /our-formulations (no post list on source) from intro section + band-pair + cards `formulations` variant. our-formulations 24.48% → 0.57% in one round. /insights/blog re-gated unchanged. Residual: source YouTube error state.

## C-deliver cluster-article — 44/44 live, 43 pass; 1 open failure (2026-11-17)

- Six render units, one encoder; new blocks figure, video-grid, striped-table; article block gained additive `event` variant + section styles article-rule/accent-headings/article-references. 37 images to DA.
- Open: /blog/eco-friendly-high-performance-sun-care-solutions fails (1440 11.32% Δh42, 360 23.53% Δh173) — source styles single elements inline (centred blue h3s, spacer divs, 5/7 split); 3-round cap reached → re-prototype decision. Waiver: fluoride-hydroxyapatite 360 (source 646px caption spills out of the phone column).
- Owed: re-gate /blog/aak-partnership after the additive article-block changes.

## C-deliver gate-all — 71/71 delivered at 1440 and 360 (2026-11-17)

- Before the roster run: eco-friendly sun-care article re-prototyped as a standalone (additive article section styles, columns `split`), published 1440 0.64% / 360 2.19%; archetype blog-aak-partnership re-gated 0.76% / 3.24% Δh0; privacy-policy (coverage `stale`) redeployed and published.
- Roster (`--skip-existing`, gate-state copy, eds host aem.page): 1440 70 PASS + 1 override (index fonts); 360 69 PASS + 2 overrides (index fonts, fluoride-hydroxyapatite caption). Coverage updated from both summaries.

## C-deliver final — foundation queue applied, 15/15 re-gated, C-deliver closed (2026-11-17)

- `foundation-freeze check` clean; 7 of 8 queued requests applied once (interim section styles moved from page-hero.css to styles.css unchanged, three form endpoint keys added empty); YouTube auto-embed declined (delivered content keeps the link in video-band). Re-frozen.
- Published re-gate (EDS recaptured, origin reused) on the 6 archetypes + 9 pages carrying the moved styles: 15/15 delivered at 1440 and 360 (index: documented source-font override).

## D-site — sitemap served 71 = assembled 71; redirects sheet live; / 200 (2026-11-17)

- `stardust/redirects.tsv` (29 off-origin `/our-products/*` rows) uploaded to DA as `/redirects.json` (sheet), previewed and published; `/our-products/skin-care/flexan-ii-polymer` answers 301 → products.omya.com on aem.live.
- `/`, `/nav`, `/footer` 200 on aem.live; nav and footer carry `robots: noindex`. `assemble.mjs --verify-origin` exit 0: served 71, extra 0, missing 0.

## D2-dynamic — 11/13 parity checks pass; 2 form rows interim by design (2026-11-17)

- `stardust/dynamics/parity.json` written: 11 features with replayable checks (menus, popup dialog, 3 listings, rep-locator 50 regions, /contact + footer form flows, 2 regulated blocked forms, YouTube playback, no page errors) + martech (contract, all parts disabled: no tag host requested).
- The replay found 2 defects, both fixed in code: the Request Info popup kept `aria-modal` while hidden (now set only while open), and the /contact form (no required fields on the source) accepted an empty submission into local capture (now refused, `scripts/forms.js`). `email-confirm` is the source honeypot and stays empty.
- The main-host CDN kept the pre-fix scripts for the browser variant (max-age 7200, no purge credential in reach), so the final replay ran on a throwaway branch host (`d2fix`, same content, deleted afterwards): 11/13 PASS. The 2 FAILs are the "filled posted" leg of the interim forms (D1 form-endpoint open, the owner's decision): empty refused and the no-backend notice shown.
- Query index: listings are document-first and carry every page-1 item; `/query-index.json` stays 404 (helix-query.yaml retired for this project per AGENTS.md); recorded as interim in parity.json. Re-replay on the main origin in E-full-site once the cache expires.

## E-full-site — 71/71 verified on aem.live; 70 trailing-slash redirects added (2026-11-17)

- First `verify.mjs --base <aem.live>` run: 70/71 HTTP 404 — coverage's `publicUrl` derives `/about/` (folder-index migrated files) while DA serves `/about`. The same gap hits real visitors: every source URL ends in `/`. Fix: 70 rows `/<path>/ → /<path>` appended to `stardust/redirects.tsv` and the DA `/redirects.json` sheet (99 rows), previewed + published; `/about/` → 301 `/about`, product off-origin rows unchanged.
- Re-run: Checked 71 · 71 verified · 0 failed. Coverage gate tables (all-1440, all-360) re-applied: 71/71 rows matched, 0 flips.
- restoreAtDelivery: partners marquee advancing (≈106 px/s at 1440, matches the source's 3 s/logo); first-visit Request Info popup opens at 6 s.
- D3 multilingual not applicable (no locale tree on the source; parity row i18n-false-positive).

## E2-link-audit — internal links 100% resolve; 6 pages + 46 PDFs out of scope recorded as cutover debt (2026-11-17)

- localize-links dry run: 0 links to rewrite (all internal targets already root-relative); 53 source-host targets kept absolute — 6 out-of-plan pages (3 product pages, 3 pagination pages) and 46 `/wp-content/uploads` PDFs. Named decision + list in `stardust/direction.md` § Link audit decision.
- Nav + footer: 25/27 hrefs 200 on aem.live; the 2 others are external (products.omya.com, a 404 omya.com PDF the source footer carries too).
- Redirects sheet: +29 trailing-slash forms of the off-origin `/our-products/*` rows → 128 rows, published; `/our-products/oral/` → 301 products.omya.com/oral/.

## F-optimize — 0 open P1; 71 P2 (JSON-LD), 2 P3; 27 source-parity informational (2026-11-17)

- `optimize.mjs --base <aem.live> --all`: health 64/100 (seo 96 · xpage 96 · ai 0 · a11y not assessed), GATE ✓ no open P1. P2: 71 × ai-search/jsonld (the source ships JSON-LD, the delivered pages none) → G-aem. P3: the 3 news placeholder items share a description (source copy, design-pass). Source parity: 27 informational.

## G-aem — source JSON-LD carried to 71/71 pages; health 64 → 97, P2 71 → 0 (2026-11-17)

- autofix-aem dry run: 71 × eds-jsonld `manual` (placement via the metadata pipeline), 1 title content-draft (not applied — replica never rewrites content).
- Every source page ships a Yoast `@graph` (WebPage, ImageObject, BreadcrumbList, WebSite); carried VERBATIM as a `json-ld` metadata row (the pipeline renders it as `<script type="application/ld+json">` in head) in all 71 `content/*.html`, re-deployed + published (`stardust/deploy/ledger-jsonld.json`, 71 ok). No register entry needed: source parity, not a design delta.
- Re-run: verify 71/71; optimize health 97 (seo 96 · ai 100 · xpage 96), open P1 0 · P2 0 · P3 2 (both source copy: our-approach 75-char title, 3 placeholder news items share a description).

## H-report — summary block written; learnings recorded (2026-11-17)

- `stardust/rollout/report.md`: 71/71 pages, 6 templates, 25 block dirs, gate 71/71 at both widths, health 97, parity 11/13, martech carried disabled, 128 redirect rows; 6 owner items under "To deliver".
- `stardust/learnings.md`: 6 entries (trailing slashes, CDN variants after a push, honeypots in fills, aria-modal on hidden dialogs, empty submits, JSON-LD via metadata).

## I-dashboard — dashboard written; rollout closed (2026-11-17)

- `dashboard.mjs`: `stardust/rollout/dashboard/{index.html,data.json}` — 71 identified · 71 prototyped/templated · 71 deployed · 40 optimised (pages with no open or informational finding); `stardust/` is in `.hlxignore`, so nothing of it is served.

## Handoff — complete: 71/71 live, verified and gated; done-check complete (2026-11-17)

- Runner done-check: `{"complete":true,"gaps":[]}`.
- Main-origin dynamics replay at 22:3x UTC: 10/13 — the popup Escape and empty-submit fixes are on the code bus but the CDN variant served to Chrome still carries the pre-fix `header.js` / `forms.js` until its max-age (7200 s, cached ≈ 22:09) runs out ≈ 00:10 UTC; the branch-host replay of the same code and content is 11/13 (`stardust/qa/dynamics-report.md`). First step for anyone resuming: re-run `dynamics-check.mjs --origin https://main--12a63657--aemcoder.aem.live --contract stardust/martech-contract.json` after 00:10 UTC and expect 11/13.
- Owner items: `stardust/rollout/report.md` § To deliver.
