# Dynamic features — omyapersonalcare.us

Curated from `stardust/dynamics/dynamic-features.generated-plan.{md,json}` (42 draft rows → 25 rows: duplicates merged,
ad-tech cookie-sync hosts folded into the tag that loads them). Evidence: `stardust/current/_dynamics.json`
(6 probed pages, reach from 71/71 crawled pages), `stardust/current/pages/*.json`, `stardust/martech/`,
`stardust/martech-contract.json`. Hands-off run (2026-11-17): every non-`self` row ships its interim tier and names
its decision; nothing below is `decided-out` (no owner statement exists). Content source: Document Authoring
(no sheet intake — forms capture locally with an explicit "no backend connected" message).
No site search exists on the source (`searchFormPages: 0`; the header-contract `search` entry is the newsletter
email input), so no search probe was recorded and no results page is owed.

## Listings contract

Article content types and the `<meta name>` fields each page must emit at import (metadata block rows → `<meta>`):

| content type | paths | pages | metadata rows (key → meta name) | tier-1 (DOM) |
|---|---|---|---|---|
| blog post | `/blog/*` (excl. `/blog/asp-products/*`) | 17 | `PublishDate` → `publishdate` (ISO `YYYY-MM-DD`, from the captured date, e.g. "January 15, 2024" → `2024-01-15`); `Category` → `category` = `blog` | `h1` title, `og:image`, `description` |
| event | `/events/*` (excl. `/events/` itself) | 24 | `PublishDate` → `publishdate`; `Category` → `category` = `event` | `h1`, `og:image` (many events have no lead image — card falls back to the listing's default), `description` |
| news item | `/news/*` | 3 | `PublishDate` → `publishdate`; `Category` → `category` = `news` | `h1`, `og:image`, `description` |

Indexes (one definition per type, chrome/nav/footer/thank-you documents excluded): `blog` ← `/blog/**`, `events` ←
`/events/**`, `news` ← `/news/**`; properties `title`, `image`, `description`, `publishdate`, `category`, `lastModified`.

Listing blocks (all document-first per `listings.md` § Block contract — one authored row per card carrying the card's
text: date, title link; image read from the index; top-up of newer items from the index, newest first, client-paged):

| listing page | reads index | source behaviour |
|---|---|---|
| `/insights/blog/` | `blog` | 10 cards per page (date · title · image), paged; 17 posts |
| `/events/` | `events` | 10 cards per page, paged; 24 events |
| `/news/` | `news` | 3 cards (source items are lorem-ipsum placeholders — content note, migrated as captured) |
| `/insights/events/` | `events` | card-grid slot read 1 card that looks like the latest blog post — verify against the live page in Phase 4 before authoring rows |
| `/our-formulations/` | none (curated) | "Download Our Formulations" — editorially curated downloads, not a page listing; card slot mis-read like the above → authored content, no index |

Home (`/`): no listing / insights band detected (sections are authored copy + partner logos) — no index consumer.
Relationships: none (no related rails captured, `related: []` on every article).

## Features

| # | id | feature | class | reach | disposition | target | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | chrome-menu | header menus + mobile drawer (mobile menu lives outside `<header>`) | M | 71/71 | rebuild-native | runtime | self | pending | chrome-interaction | none — header contract is the spec | `stardust/chrome/header-contract.json` |
| 2 | listing-blog | blog listing `/insights/blog/` | L | 1 page · 17 items | index-backed | block | self | pending | listings (document-first) | none | slots.card-grid count 10, paged |
| 3 | listing-events | events listing `/events/` (+ `/insights/events/` band) | L | 2 pages · 24 items | index-backed | block | self | pending | listings (document-first) | none | slots.card-grid |
| 4 | listing-news | news listing `/news/` | L | 1 page · 3 items | index-backed | block | self | pending | listings (document-first) | none (placeholder copy noted) | slots.card-grid count 3 |
| 5 | formulations-downloads | "Download Our Formulations" `/our-formulations/` | L | 1 | static-snapshot | content | self | pending | curated content | none — editorially curated, no index | page type listing, no page-listing semantics |
| 6 | rep-locator-hotspots | Draw Attention image-hotspot map, 50 regions → rep details (`/contact/rep-locator/`) | CR | 1 | client-only | block | self | pending | in-DOM interaction over authored rows | none — 50 `hotspot-content` entries are in the settled DOM; never blank | `cr-client-rendered-slot-hotspots-placeholder`, `#hotspot-4093` |
| 7 | form-newsletter | footer newsletter signup (email) | F | ~71/71 | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1 form-endpoint** | `newsletter-form`, text:email + hidden source,gclid |
| 8 | form-contact-footer | footer contact form (name, company, email ×2, message, reCAPTCHA) — same signature on `/get-a-sample/`, `/request-info/`, `/customer-resources/*`, invoice page | F | 5/6 probed, most pages | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1 form-endpoint**, **D2 recaptcha** | `contact-footer`, hidden src_url,gclid |
| 9 | form-contact-popup | "Request Info" popup form (fname, lname, company, email ×2, phone, message, reCAPTCHA) — merged 6 per-page rows | F + M | 6/6 | rebuild-native | block | needs-backend | interim | forms in modal fragment | **D1**, **D2** | `contact-popup-form`, hidden source,utm_*,gclid,frmSubmit |
| 10 | form-contact | `/contact/` page form (popup signature, 8 fields) | F | 1 | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1**, **D2** | pages/contact.json forms[0] |
| 11 | form-request-info | `/request-info/` form (popup signature) + `.success` message the GTM `request_info` rule watches | F | 1 | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1**, **D2**, **D6** (trigger rewrite) | pages/request-info.json forms[0] |
| 12 | form-get-a-sample | `/get-a-sample/` sample request (contact-footer signature, 6 fields) | F | 1 | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1**, **D2** | pages/get-a-sample.json — re-record with `snapshot-forms.mjs` in Phase 4 |
| 13 | form-formulary-request | `/formulary-request/` (fname, lname, company, email ×2, phone, `formulary_category` select) | F | 1 | rebuild-native | block | needs-backend | interim | forms (local capture) | **D1**, **D2** | pages/formulary-request.json |
| 14 | form-careers | `/careers/` application (name, email ×2, phone, message, **`file1` résumé upload**) — **regulated-pii** (document upload) | F | 1 | rebuild-native | block | needs-backend | scaffolded-awaiting-owner | forms — UI rebuilt, **submission blocked** | **D3 regulated-forms** (mandatory) | pages/careers.json fieldNames incl. file1 |
| 15 | form-onboarding | `/customer-resources/onboarding/` (18 fields incl. **`employer_id` (EIN), `duns`, `shipping_account`**, payable/purchasing emails, address) — **regulated-pii** (tax id / account numbers) | F | 1 | rebuild-native | block | needs-backend | scaffolded-awaiting-owner | forms — UI rebuilt, **submission blocked** | **D3 regulated-forms** (mandatory) | `onboarding-form`, GTM rule onboard_form |
| 16 | credit-application | `/customer-resources/credit-application/` — no web form on the source: terms text + PDF (`Omya-Specialty-Materials-Inc-Credit-Application.pdf`); **regulated-pii** (credit / financial data, filled offline) | F | 1 | static-snapshot | content | needs-business-decision | interim | migrate the link, never manufacture a form | **D5 credit-application** | GTM rule targets `#credit-application`, absent on the page |
| 17 | pay-invoice-stripe | `/blog/asp-products/pay-your-invoice/` Stripe payment (Accept Stripe Payments, `asp_product_id`, js.stripe.com) — **regulated-pii** (payment card) | X | 1 | embed-passthrough | widget | needs-credential | scaffolded-awaiting-owner | payment UI shell, **payment blocked**; never replicated on a sandbox | **D4 payments** (mandatory) | `x-commerce-payments`; `/pay-thank-you/` is its return page |
| 18 | recaptcha-v2 | reCAPTCHA v2 checkbox on every form (public site key `6LddCz0l…QTs2I`) | F | ~71/71 | rebuild-native | block | needs-backend | interim | always-pass test key in the same slot; response posted with the data | **D2 recaptcha** | `f-form-protection-captcha-antibot`, `data-widget-id` mount, www.google.com/www.gstatic.com |
| 19 | youtube-embed | YouTube player (incl. its jnn-pa.googleapis.com / ssl.gstatic.com calls) | V | 4/71 | embed-passthrough | content | self | pending | media-as-url | none (player ids public) | `v-video-youtube`, embed `OSTi9NkUI4I` |
| 20 | cmp-didomi | Didomi CMP + TCF stub (`sdk.privacy-center.org`, `api.privacy-center.org`, `__tcfapiLocator` 0×0 iframe, footer "Consent Choices") | T | 71/71 | embed-passthrough | embed | needs-credential | scaffolded-awaiting-owner | martech contract (CMP) — **contract `consent.cmp` is null**: vendors.json has no Didomi loader knowledge | **D6 martech-enable** | inline `spcloader` (key `140e89a8-…0e6d`, notice `ACt2ytmx`); contract `tagNotes` |
| 21 | gtm | Google Tag Manager `GTM-NS9KZC3` + `dataLayer`; gated on the source by Didomi vendor `c:googleana-4TXnJigR` | T | 71/71 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | martech contract route `google-tag-manager` (enabled:false) | **D6 martech-enable** | `t-tag-manager-google-tag-manager`, `a-cms-app-settings-object-datalayer` |
| 22 | ga-ads | GA4 `G-QT12E7SKTC`, UA `UA-116841070-1` (sunset), Google Ads `AW-658173166` remarketing + conversion linker — loaded by GTM | T | 71/71 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | via GTM (not routed separately) | **D6** | `t-analytics-google-analytics-ads`, `t-marketing-ad-retargeting-pixel`; GTM tags[0,2,3,11–18] |
| 23 | adroll | AdRoll smart pixel (s.adroll.com, d.adroll.com, ipv4.d.adroll.com) + its cookie-sync partners (tapad, casalemedia, ml314, openx, rlcdn, bidswitch, smartadserver, eyeota, pippio, 3lift, pubmatic, onetag-sys, seedtag, px.ads.linkedin) — loaded by GTM | T | 71/71 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | via GTM | **D6** | GTM tags[1] `__asp`; 17 draft "unknown host" rows merged |
| 24 | host-media-omya-com | unknown host `media.omya.com` (1 request/page, not in server HTML or the GTM library) | T | 6/6 | static-snapshot | embed | needs-business-decision | pending | inspect (undecided — revisit at rollout) | **D7 inspect** | `t-unknown-third-party-host-media-omya-com` |
| 25 | i18n-false-positive | "locale variants en,en" = outbound partner links (evercare-zano.com/en, gfn-selco.de/en) on global-partners; no locale tree on the source | I18N | 2/6 | static-snapshot | content | self | done | links migrate as content | none | `i18n-locale-variants-en-en` |

Post-submit destinations `/thank-you/` and `/pay-thank-you/` are static pages (type unique) and migrate as content.

## Decision batch

One message to the owner. Under hands-off each is a named assumption; the interim tier ships meanwhile.

- **D1 form-endpoint** (rows 7–13) — production submission target for the non-regulated intake forms (newsletter,
  footer contact, Request Info popup, contact, request-info, get-a-sample, formulary-request): forms service, your
  endpoint on the production host, or a relay you run; plus field mapping and the notification recipients.
  *Interim:* definition-driven forms post to a configurable endpoint (empty) and capture locally with an explicit
  "no backend connected" message — no fake success.
- **D2 recaptcha** (rows 8–13, 18) — the real reCAPTCHA v2 site key for the new hosts, domain allowlist
  (`*.aem.page`, `*.aem.live`, production) and server-side verification at the endpoint. *Interim:* Google's
  published always-pass test key in the same slot.
- **D3 regulated-forms** (rows 14, 15; mandatory) — secured endpoint for the careers application (résumé upload)
  and customer onboarding (EIN, DUNS, shipping account numbers). *Interim:* UI rebuilt, submission **blocked**
  with a notice pointing to the contact route; never routed to a sheet or a generic handler.
- **D4 payments** (row 17; mandatory) — invoice payment: your Stripe account / hosted payment link or checkout
  for the new host. *Interim:* page and amount UI rebuilt, payment **blocked**; no card capture on any sandbox.
- **D5 credit-application** (row 16) — keep the PDF-download route, or commission a secured online form.
  *Interim:* the page and its PDF link migrate as on the source.
- **D6 martech-enable** (rows 11, 20–23) — see `stardust/martech-handoff.md`: add the Didomi loader (API key and
  notice id are in the contract `tagNotes`) and gate the GTM route on Didomi vendor `c:googleana-4TXnJigR`
  (purposes `measure_ad_performance`, `improve_products`), set `enabled: true` per part, set `productionHosts` to the
  real production host, rewrite the GTM triggers that read source ids/selectors (`#contact-form`,
  `#onboarding-form`, `#credit-application`, `.form-message…success`, jQuery `ajaxComplete`), retire the UA tags.
  *Interim:* everything scaffolded **off** (`scripts/martech.js` loads nothing).
- **D7 inspect media.omya.com** (row 24) — confirm what requests it (likely the CMP notice or a group asset).
  *Interim:* not carried; revisit at rollout.

## Register (decided-out)

| feature | reason | production statement |
|---|---|---|
| — | none — no owner statement or hard blocker; regulated rows ship blocked UI (D3, D4) instead | — |
