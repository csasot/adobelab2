# Prototype gate — every crafted prototype, 360px

2026-11-17T17:00:08.561Z · **5 PASS / 1 FAIL / 0 error of 6** (+1 documented override → 6 delivered)

Verdict: overlap pixel % ≤ 10 AND |Δh| ≤ 5% of origin height AND clipped ≤ 0 (+ documented allowance)

Calibration — pixel-only verdict (criteria 1+2): **6 PASS**; full verdict (1–4): **5 PASS**. Failing by criterion: pixel 0, height 0, clip 0, content 0, fonts not loaded 1 (frutigerbold); content n/a (origin not probed) 0.
| page | template | tier | origin | browser | pixel % (text %) | Δh px | clipped | content | units | verdict | reasons |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/contact-proposed.html` | - | - | stitch-live | chrome | 0.14 | 0 | 0 | n/a | off 0 hidden 0 missing 0 | PASS | - |
| `/about-proposed.html` | - | - | stitch-live | chrome | 1.34 | 0 | 0 | n/a | off 0 hidden 0 missing 0 | PASS | - |
| `/insights-blog-proposed.html` | - | - | stitch-live | chrome | 1.97 | 0 | 0 | n/a | off 0 hidden 0 missing 0 | PASS | - |
| `/contact-rep-locator-proposed.html` | - | - | stitch-live | chrome | 2.48 | 0 | 0 | n/a | - | PASS | - |
| `/blog-aak-partnership-proposed.html` | - | - | stitch-live | chrome | 2.99 | 0 | 0 | n/a | - | PASS | - |
| `/index-proposed.html` | - | - | stitch-live | chrome | 1.42 | 0 | 0 | n/a | off 0 hidden 0 missing 0 | FAIL (fonts) → PASS: source-side dead face: the live site's own @font-face for 'frutigerbold' returns 404 on omyapersonalcare.us, so the origin renders the Arial fallback; the prototype keeps the declared family with the same Arial fallback (canon.css fonts note). Build-side fontsFailed is empty. | font-not-loaded:frutigerbold |
