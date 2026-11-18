# migrate plan — omyapersonalcare.us (replica flow, 2026-11-17)

In scope: 71 pages (the captured plan pages; 29 /our-products/* plan URLs leave the origin → redirects only)
  Path A  (approved archetypes)   6: index (landing), about (static), blog-aak-partnership (article),
                                     insights-blog (listing), contact (form), contact-rep-locator (unique)
  Path A' (sibling tier)         65: article 44, static 8, form 7, listing 4, unique 2
  Path B  (thin)                  0 planned (decided per page at its cluster if a bodyless page appears)

Gated-archetype precondition: all 6 archetypes pass at 1440 and 360 (stardust/replica/progress.json).
Order (#126): siblings render only after their template's archetype is live and gated on the
published origin (rollout C-deliver `archetype` unit).

Units (stardust/migrate/progress.json):
  plan · render archetypes (6) · render static (8) · render form (7) · render listing (4) ·
  render unique (2) · render article-1..6 (44, ≤ 8 each) · report
