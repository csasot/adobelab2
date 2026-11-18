# Dynamic features plan — omyapersonalcare.us

Inventory: `stardust/dynamic-features.md` (25 rows). Hands-off: only `self` rows ship autonomously; the rest ship
their interim tier and carry a named decision (D1–D7). Static first: every page migrates as a working static page
before any phase below wires behaviour. Each phase ends with the flow verified on the published origin
(main--12a63657--aemcoder.aem.page) at 1440 and 360, a `stardust/dynamics/parity.json` row, a journal entry and a commit.

## Phase A — chrome + in-page interactions (self)

- **Deliverables:** header menus + mobile drawer per `stardust/chrome/header-contract.json` (row 1); rep-locator
  hotspot map block (row 6): image + one authored row per region (region name, rep name/contact copy), hover/focus/tap
  shows the region's panel, keyboard reachable — no Leaflet, no network; YouTube as player URLs (row 19).
- **Authoring contract:** rep-locator rows = `region | hotspot shape (coords) | content`; coordinates read from the
  captured `#hotspot-4093` map, content from its 50 `hotspot-content` entries.
- **Verify:** chrome-compare gate; `modal-open`/interaction checks on the locator; player loads on click.
- **Owner decision:** none. **Effort:** M.

## Phase B — listings (self, index-backed, document-first)

- **Deliverables:** index definitions for `blog`, `events`, `news` (§ Listings contract); `PublishDate` + `Category`
  metadata rows emitted by the import for every article (must be in place **before** the batch import); a listing
  block on `/insights/blog/`, `/events/`, `/news/`, `/insights/events/` rendering authored rows (date · title link)
  with images from the index and top-up of newer items, newest first, client-paged at 10.
- **Index source:** listings.md says `helix-query.yaml` in the code branch; this repo's AGENTS.md lists
  `helix-query.yaml` as retired with config at tools.aem.live — resolve at Phase B start (prefer whichever the
  project's tooling accepts; sheet-backed interim only if neither is writable). Index builds from the **published**
  tree: publish per page, then poll `total` (≥ 5 s, bounded).
- **Not listings:** `/our-formulations/` (curated downloads, authored content); verify the `/insights/events/` card
  grid against the live page before authoring its rows.
- **Verify:** authored rows equal the index on each listing page; a newly published page tops up; AI-readability ≥ 98.
- **Owner decision:** none. **Effort:** M.

## Phase C — forms (interim tier)

- **Deliverables:** `snapshot-forms.mjs` definitions → `data/forms/<name>.json` for newsletter, contact-footer,
  contact-popup (shared by `/contact/`, `/request-info/`), get-a-sample, formulary-request, careers, onboarding;
  definition-driven form block/widget per forms.md § 4 (required marks, live validation copy, `formulary_category`
  select with placeholder, empty submission refused, honeypot, hidden `source`/`utm_*`/`gclid` kept); reCAPTCHA v2
  rendered with the always-pass test key; posts `{ data, page, timestamp }` to the per-form endpoint in
  `scripts/site-config.js` (empty) → local capture with "no backend connected" copy (DA has no sheet intake).
  Request Info popup as a modal fragment opened from the header/CTA links.
- **Regulated (submission blocked, UI rebuilt):** careers (`file1` résumé upload), onboarding (EIN, DUNS, account
  numbers). Credit application: migrate the terms text + PDF link; no form manufactured. Pay your invoice: page and
  payment UI shell with payment blocked; `/pay-thank-you/` static.
- **Data-layer pushes:** each rebuilt form pushes a `dataLayer` event on submit/success so the GTM triggers can be
  re-pointed (D6) — event names chosen with the owner's tagging plan.
- **Verify:** `form-flow` checks — empty submit refused with live wording; filled submit reaches local capture with
  the honest message; regulated forms refuse submission; no page errors.
- **Owner decisions:** D1 form-endpoint, D2 recaptcha, D3 regulated-forms (mandatory), D4 payments (mandatory),
  D5 credit-application. **Effort:** L.

## Phase D — martech (scaffolded off)

- **Done in this run:** `stardust/martech-contract.json` (GTM route, every part `enabled: false`, `consent.cmp` null,
  model `owner-decision`, GTM rules/data elements in `tagNotes` with citations), `stardust/martech-handoff.md`,
  `scripts/martech.js` via `martech-scaffold.mjs` (loads nothing), hooks it wrote into `scripts/scripts.js`
  (`loadConsent()` in `loadEager`), `scripts/consented.js` (`loadTags()`), `scripts/consent-check.js`
  (`hasConsent()` delegates to martech.js).
- **Owner steps (D6):** add the Didomi loader to the contract (no vendors.json loader knowledge exists for Didomi —
  either extend `vendors.json` with a `cmp` entry or hand-author `consent.cmp`), gate the GTM route on the Didomi
  vendor, set `productionHosts` to the real production host, enable parts, re-run the scaffold, rewrite GTM triggers.
- **Verify:** `dynamics-check.mjs` martech checks — `/` requests no route or CMP host while off.
- **Effort:** S (run side) + owner.

## Phase E — parity

`stardust/dynamics/parity.json` with checks for rows 1–19 (no `search-query` — the source has no site search);
`dynamics-check.mjs --origin https://main--12a63657--aemcoder.aem.page` → `stardust/qa/dynamics-report.md`; every
interim row reports its decision name.
