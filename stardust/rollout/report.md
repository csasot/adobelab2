# Rollout report — omyapersonalcare.us → main--12a63657--aemcoder.aem.live (2026-11-17)

| | |
|---|---|
| **Pages** | 71 / 71 delivered, published (aem.live) and verified; 29 plan URLs under `/our-products/*` leave the origin on the source and are redirect rows (100 plan URLs total) |
| **Templates** | 6 — landing 1 · static 9 · article 45 · form 8 · listing 5 · unique 3; each archetype gated at 1440 and 360 before its siblings rendered |
| **Blocks** | 25 block dirs (14 deduplicated content blocks from the plan + header, footer, fragment, widget and template-specific blocks); same blocks across the site |
| **Fidelity** | all-pages published-origin gate 71/71 delivered at 1440 and 360 (pixel ≤ 10 %, |Δh| ≤ 5 %, 0 clipped, 0 missing links/headings) — `stardust/replica/gates/all-{1440,360}/summary.md` |
| **Quality** | optimize health 97/100 (seo 96 · ai-search 100 · cross-page 96); open P1 0 · P2 0 · P3 2 (source copy); 27 source-parity findings informational |
| **Dynamics** | parity 11/13 (`stardust/qa/dynamics-report.md`); the 2 open checks are the interim form tier — submissions are captured in the browser with a "no backend connected" notice until a form endpoint is chosen |
| **Martech** | GTM `GTM-NS9KZC3`, GA4/Ads, AdRoll, Didomi CMP carried in `scripts/martech.js` + `stardust/martech-contract.json`, every part disabled; enabling is the owner's (`stardust/martech-handoff.md`) |
| **Redirects** | `/redirects.json` 128 rows, live: 29 off-origin `/our-products/*` (+ their trailing-slash forms) and 70 trailing-slash forms of the delivered paths |

## To deliver (owner decisions, nothing blocks the launch of the 71 pages)

1. **Form endpoint (D1)** — `scripts/site-config.js` `FORM_ENDPOINTS`; until set, the 5 contact-style forms capture locally and say so.
2. **reCAPTCHA key (D2)** — the published Google test key sits in the source's slot; replace with a key for the new hosts.
3. **Regulated forms (D3, D4)** — careers (résumé upload) and customer onboarding (EIN / DUNS / accounts) show the rebuilt UI with submission blocked; the invoice payment page is not replicated.
4. **Tags and consent** — enable the Didomi CMP and the GTM route in the martech contract when ready.
5. **Cutover scope debt** — 46 PDF data sheets under `/wp-content/uploads/` and 6 out-of-plan pages (3 product pages, 3 listing pagination pages) still live only on the current host (`stardust/direction.md` § Link audit decision).
6. **Query index** — listings are fully authored; an index (for automatic listing top-up) is configured at tools.aem.live when wanted.
