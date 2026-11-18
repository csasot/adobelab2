<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-17T15:52:21.654Z · input stardust/current/_dynamics.json (6 pages, 42 findings) -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-api-privacy-center-org | A | unknown third-party host api.privacy-center.org | 6/6 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 6/6 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 3 | a-unknown-third-party-host-jnn-pa-googleapis-com | A | unknown third-party host jnn-pa.googleapis.com | 1/6 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 4 | cr-client-rendered-slot-hotspots-placeholder | CR | client-rendered slot hotspots-placeholder | 1/6 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 5 | f-form-protection-captcha-antibot | F | form protection: captcha / antibot | 6/6 | rebuild-native | block | needs-backend | pending | forms | production backend (vendor form id + field mapping) |  |
| 6 | f-form-newsletter-form-no-action-js-wired-1-fields | F | form "newsletter-form" → no action (JS-wired) (1 fields) | 6/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 7 | f-form-contact-footer-no-action-js-wired-6-fields | F | form "contact-footer" → no action (JS-wired) (6 fields) | 5/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 8 | f-form-contact-popup-form-origin-about-global-partners-8-fie | F | form "contact-popup-form" → origin /about/global-partners/ (8 fields) | 1/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 9 | f-form-contact-popup-form-origin-blog-aak-partnership-8-fiel | F | form "contact-popup-form" → origin /blog/aak-partnership/ (8 fields) | 1/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 10 | f-form-contact-popup-form-origin-blog-asp-products-pay-your- | F | form "contact-popup-form" → origin /blog/asp-products/pay-your-invoice/ (8 fields) | 1/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 11 | f-form-contact-popup-form-origin-contact-rep-locator-8-field | F | form "contact-popup-form" → origin /contact/rep-locator/ (8 fields) | 1/6 | rebuild-native | widget | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 12 | f-form-contact-popup-form-origin-events-8-fields | F | form "contact-popup-form" → origin /events/ (8 fields) | 1/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 13 | f-form-contact-popup-form-origin-8-fields | F | form "contact-popup-form" → origin / (8 fields) | 1/6 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 14 | i18n-locale-variants-en-en | I18N | locale variants en,en | 2/6 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 15 | t-unknown-third-party-host-sdk-privacy-center-org | T | unknown third-party host sdk.privacy-center.org | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 16 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 17 | t-unknown-third-party-host-media-omya-com | T | unknown third-party host media.omya.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 18 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 19 | t-unknown-third-party-host-s-adroll-com | T | unknown third-party host s.adroll.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-unknown-third-party-host-d-adroll-com | T | unknown third-party host d.adroll.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-unknown-third-party-host-ipv4-d-adroll-com | T | unknown third-party host ipv4.d.adroll.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | t-unknown-third-party-host-pixel-tapad-com | T | unknown third-party host pixel.tapad.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 24 | t-unknown-third-party-host-dsum-sec-casalemedia-com | T | unknown third-party host dsum-sec.casalemedia.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 25 | t-unknown-third-party-host-ml314-com | T | unknown third-party host ml314.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 26 | t-unknown-third-party-host-us-u-openx-net | T | unknown third-party host us-u.openx.net | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 27 | t-unknown-third-party-host-idsync-rlcdn-com | T | unknown third-party host idsync.rlcdn.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 28 | t-unknown-third-party-host-x-bidswitch-net | T | unknown third-party host x.bidswitch.net | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 29 | t-unknown-third-party-host-rtb-csync-smartadserver-com | T | unknown third-party host rtb-csync.smartadserver.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 30 | t-unknown-third-party-host-ps-eyeota-net | T | unknown third-party host ps.eyeota.net | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 31 | t-unknown-third-party-host-pippio-com | T | unknown third-party host pippio.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 32 | t-unknown-third-party-host-eb2-3lift-com | T | unknown third-party host eb2.3lift.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 33 | t-unknown-third-party-host-image2-pubmatic-com | T | unknown third-party host image2.pubmatic.com | 6/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 34 | t-third-party-mount-div-data-widget-id-tag-manager-injected- | T | third-party mount <div data-widget-id> (tag-manager-injected widget) | 6/6 | embed-passthrough | embed | needs-credential | pending | embed-passthrough | vendor account ids stay the owner's |  |
| 35 | t-unknown-third-party-host-px-ads-linkedin-com | T | unknown third-party host px.ads.linkedin.com | 3/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 36 | t-unknown-third-party-host-onetag-sys-com | T | unknown third-party host onetag-sys.com | 3/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 37 | t-unknown-third-party-host-s-seedtag-com | T | unknown third-party host s.seedtag.com | 2/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 38 | t-unknown-third-party-host-ssl-gstatic-com | T | unknown third-party host ssl.gstatic.com | 1/6 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 39 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 6/6 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |
| 40 | v-video-youtube | V | video: YouTube | 1/6 | embed-passthrough | content | self | pending | media-as-url | none (player ids are public) |  |
| 41 | x-commerce-payments | X | commerce: payments | 1/6 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 42 | chrome-menu | M | header menu: Newsletter Signup (chrome only) | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 4 row(s) — read-settings, settled-dom-snapshot, media-as-url, chrome-interaction.
- **One owner decision batch:** 37 row(s) — inspect the XHR, add a vendor row · production backend (vendor form id + field mapping) · production endpoint; interim capture ships now · scope of the locale trees · which tags run on the new host; property ids · vendor account ids stay the owner's.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.
- **Martech:** no CMP · 0/1 route(s) enabled by the owner — `stardust/martech-handoff.md`.

## Phases

- **tags** — 23
- **forms** — 9
- **detect** — 3
- **embeds** — 2
- **capture** — 1
- **locale wave** — 1
- **media** — 1
- **register** — 1
- **interactive** — 1
