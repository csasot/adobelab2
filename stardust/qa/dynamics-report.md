# Dynamics parity check — https://d2fix--12a63657--aemcoder.aem.live — 2026-11-17T22:22:45.490Z

> Replayed against the branch host `d2fix--12a63657--aemcoder.aem.live` (same content bus, same code as main @ the D2 commits) because the main host CDN still served the pre-fix forms.js/header.js variant (max-age 7200); re-replayed on the main origin in E-full-site.

Replayed 13 checks over 12 features · pass 11 · fail 2. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| header menus + mobile drawer | M | done | dom-count | PASS | 14 × header nav a (min 10) |  |
| header menus + mobile drawer | M | done | click-dialog | PASS | dialog 1440px · heading "Omya Market Insights" · 6 fields · Escape closes: true |  |
| blog listing /insights/blog | L | done | dom-count | PASS | 10 × .post-list .post-tile[href] (min 10) | www.youtube.com:200×6 fonts.gstatic.com:200×1 googleads.g.doubleclick.net:302×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 www.google.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| events listing /events | L | done | dom-count | PASS | 10 × .post-list .post-tile[href] (min 10) | www.youtube.com:200×6 fonts.gstatic.com:200×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:302×1 www.google.com:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| news listing /news | L | done | dom-count | PASS | 3 × .post-list .post-tile[href] (min 3) | www.youtube.com:200×6 fonts.gstatic.com:200×1 static.doubleclick.net:200×1 www.google.com:200×1 googleads.g.doubleclick.net:302×1 i.ytimg.com:200×1 googleads.g.doubleclick.net:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| rep locator state map, 50 regions | CR | done | dom-count | PASS | 50 × .rep-map-area[aria-controls] (min 50) |  |
| YouTube player (video-band) | V | done | video-plays | PASS | iframe/video: true · no <video> · playback requests 8 (ok) | www.youtube.com:200×7 fonts.gstatic.com:200×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:302×1 www.google.com:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| /contact page form | F | interim | form-flow | FAIL | empty refused: true ("Please fill in the required fields.") · filled posted: false · success copy: true | www.google.com:200×2 www.gstatic.com:200×4 fonts.gstatic.com:200×1 |
| footer contact form (band-pair) | F | interim | form-flow | FAIL | empty refused: true ("Please fill in the required fields.") · filled posted: false · success copy: true | www.google.com:200×2 www.gstatic.com:200×4 fonts.gstatic.com:200×1 |
| /careers application (résumé upload) — regulated-pii | F | scaffolded-awaiting-owner | dom-count | PASS | 1 × .form.blocked form .form-message (min 1) |  |
| /customer-resources/onboarding (EIN, DUNS, shipping account) — regulated-pii | F | scaffolded-awaiting-owner | dom-count | PASS | 1 × .form.blocked form .form-message (min 1) |  |
| page scripts | M | done | no-page-errors | PASS | none on 7 page(s) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (1 gated · 0 cross-site host(s) blocked) |  |

## Features without checks
