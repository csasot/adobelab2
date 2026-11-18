<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-11-17T16:00:00Z
  readArtifacts:
    - stardust/current/pages/*.json (71 on-origin pages)
    - stardust/current/_brand-extraction.json
    - stardust/current/_crawl-log.json
  synthesizedInputs: []
  descriptive: true (current state, not a target)
  stardustVersion: 0.39.4
-->
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

_provenance: inferred. Basis: the site's copy, its forms (formulary request, sample request, credit application, onboarding) and its rep locator.

- Formulators and product developers at personal-care and cosmetics brands. They look for raw materials (skin, sun, oral, hair and colour care, and preservation) and ask for samples or formulations.
- Purchasing and finance contacts at existing customers. They use onboarding, the credit application and invoice payment.
- Trade-show and industry contacts who follow events and the blog.

## Product Purpose

Omya Personal Care (US) is the North American personal-care arm of the Omya group. It distributes speciality and natural ingredients from global supply partners. The site generates leads ("Request Info", "Get a Sample", "Formulary Request", "Contact Omya" on 64 pages) and hosts customer self-service (onboarding, credit application, pay your invoice). The product catalogue lives off-site at products.omya.com: "Our Products" and every `/our-products/*` URL redirect there.

## Positioning

From the site's copy: "Omya provides innovative raw materials to the personal care industry." "As a distributor of high-quality, innovative ingredients from around the globe, we strive to exceed the development needs of our customers." The site leads with a consultative process (Discovery, Strategy, Support), sustainability ("Maximum Performance with Minimal Impact") and its supplier network (Global Partners).

## Capabilities and Constraints

- WordPress (cmds_theme_child on Bootstrap 3), with jQuery plugins (slick, bootstrap-select, wp-responsive-menu) and a Stripe payments plugin for invoices.
- Forms post back to the same page and use Google reCAPTCHA v2. The site has a newsletter modal, a whitepaper/portfolio download form and a careers form with a résumé upload.
- Consent is handled by Didomi (`sdk.privacy-center.org`; "Consent Choices" calls `Didomi.preferences.show()`). Tags: Google Tag Manager, Google Analytics, Google Ads/DoubleClick and AdRoll.
- Rep Locator is an interactive US state map.
- Off-site: products.omya.com (product search, AWS WAF protected) and omya.com (legal PDFs, sales terms, Impressum).

## Brand Commitments

- Register: **brand** (marketing / lead-generation site).
- Name and marks: "Omya" (white wordmark logo); the favicon still reads "omya-kinetik" (legacy Kinetik brand, which also appears in older event titles).
- Personality: professional, consultative, science-meets-nature, sustainability-minded.
- Observed anti-references: none stated.

## Evidence on Hand

- 71 rendered pages: `stardust/current/pages/<slug>.json`, rendered DOM `stardust/current/pages/<slug>.html` and screenshots `stardust/current/assets/screenshots/`.
- Logo `stardust/current/assets/logo.png`, favicon `stardust/current/assets/favicon.jpg`, icon font `stardust/current/assets/fonts/fa-solid-900.woff2`.
- Content: 18 blog posts, 25 event notices (most are a title and a date only), 3 placeholder "News Item" pages (lorem ipsum on the live site), a team page, partner logos and a formulations download library.
- Absences: no testimonials, case studies or prices. The `/our-products/*` pages are not on this origin. `get-a-sample` has no body content on the live site.

## Product Principles

_provenance: inferred. Basis: the recurring page structure.

1. Every page ends in a way to contact Omya: the contact band, the Find a Rep fab or a request form.
2. Expertise is shown through education: blog, events and formulations.
3. Partners and ingredients come before Omya itself.

## Accessibility & Inclusion

No product-specific requirement was established. Observed: an image-led hero with white text on a dark overlay, Arial body text at a declared weight of 300, and a reCAPTCHA v2 checkbox on forms.
