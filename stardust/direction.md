---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-17T15:49:14Z
  againstInput: https://omyapersonalcare.us/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://omyapersonalcare.us/,
promoted verbatim (no direct invocation, no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-11-17T15:49:14Z).

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(empty — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Hands-off: activated by `--hands-off` on `stardust:replica` (2026-11-17T15:49:14Z). Approvals recorded as `approvedBy: "hands-off"` only after every gate passes.

Roster: fixed by the run's site plan — 100 planned URLs, 71 live pages on this origin (all delivered); 29 `/our-products/*` URLs redirect off-origin (17 to products.omya.com, 12 to a 404) and are carried as redirects, not pages. No volume cap applies beyond the plan.

Gate breakpoints: 1440 and 360 (run.json `desktop,mobile`). No target breakpoints — source breakpoints kept.

Named assumptions (hands-off):
- First page first is run sequentially: the home page is the first archetype recreated, gated and delivered (C0 + its archetype unit) rather than a parallel Track A, because the bounded extract of the plan already completed before recreation began.
- Fonts: the source renders Arial (system face); the declared licensed Frutiger files 404 on the source, so the stack keeps `Frutiger` first and Arial as the rendered face — no rehosting of a licensed face. Font Awesome 5 Free Solid (open licence) is self-hosted for icons.
- Publish decision: publish (made by the run owner) — every delivered page, redirects sheet and chrome documents go live on aem.live.
- Martech: the owner asked to keep analytics, tags and consent; carried over with every contract part disabled.

## Link audit decision (E2-link-audit, 2026-11-17, hands-off)

Internal hrefs: every root-relative link in the 71 delivered pages resolves to a delivered page (verify.mjs 71/71); nav + footer: 25 links GET 200 on aem.live, plus `products.omya.com` (external, 202 to the probe) and `www.omya.com/Documents/Omya Data Protection Notice.pdf` (404 on the source footer too — carried as captured).

Source-host links outside the migration set stay absolute to `omyapersonalcare.us` (SCOPE EXTENSION — none are plan pages; no capture gap: `state.json site.captureGaps` is empty):
- `/our-products/sun-care/cosmospheres`, `/our-products/oral-care/omyadent-100-og`, `/our-products/our-formulations` — not in the 100-page plan.
- `/events/page/2`, `/events/page/3`, `/insights/blog/page/2` — listing pagination pages, not in the plan.
- 46 PDF downloads under `/wp-content/uploads/…` (product sheets, list in `stardust/rollout/link-audit-external-pdfs.txt`) — media files, not pages in the plan.

Scope debt for the owner (cutover): these targets live only on the current host. Before `omyapersonalcare.us` points at the new site, either keep the old host reachable for them or bring the PDFs and the 6 pages into a later wave. Trailing-slash forms of all 71 delivered paths and of the 29 off-origin `/our-products/*` redirect rows are in the redirects sheet (128 rows), so bookmarked source URLs land.
