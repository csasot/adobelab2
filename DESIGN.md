<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-11-17T16:00:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
    - stardust/current/pages/*.json (71 on-origin pages)
    - https://omyapersonalcare.us/wp-content/themes/cmds_theme_child/style.css
  synthesizedInputs: []
  descriptive: true (current state, not a target)
  stardustVersion: 0.39.4
-->
---
name: Omya Personal Care (current state)
description: Omya provides innovative raw materials to the personal care industry.
colors:
  omya-blue: "#007ac1"
  omya-blue-hover: "#338ec9"
  ink: "#221f20"
  white: "#ffffff"
  navy-link: "#1e4263"
  mist: "#f1f1f1"
  rule: "#dddddd"
  sky: "#99c7e4"
  ice: "#e2f1f8"
  input-border: "#cccccc"
typography:
  display:
    fontFamily: "Arial, sans-serif"
    fontSize: "48px"
    fontWeight: 700
  headline:
    fontFamily: "Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 700
  title:
    fontFamily: "Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
  subtitle:
    fontFamily: "Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 700
  body:
    fontFamily: "Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 300
  small:
    fontFamily: "Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 300
  micro:
    fontFamily: "Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 300
rounded:
  none: "0"
  pill: "50%"
spacing:
  button-y: "12px"
  button-x: "18px"
  hero-y: "60px"
components:
  button-primary:
    backgroundColor: "{colors.omya-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.omya-blue-hover}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "40px"
  button-dark-hover:
    backgroundColor: "{colors.omya-blue-hover}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.omya-blue}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  fab:
    backgroundColor: "{colors.omya-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  contact-band:
    backgroundColor: "{colors.omya-blue}"
    textColor: "{colors.white}"
  insights-card:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
---

# Design System: Omya Personal Care (current state)

This file describes the site as captured on 2026-11-17 from 71 rendered pages of
https://omyapersonalcare.us. It is a description of what exists, not a target.

## Overview

**Creative North Star: "The Ingredient Catalogue"**

A WordPress site built on Bootstrap 3 for a B2B ingredient distributor. It uses Omya blue and white. Every
interior page has the same frame: a thin blue utility bar, a transparent nav over a darkened photo hero with a centred
white H1 and breadcrumb, the page body on white, then a blue "Contact Omya" form band (64 of 71 pages) and a
light blue-grey footer with a blueprint-grid texture (`bg-body.gif`). The home page swaps the interior hero for a
large photo hero ("Thinking of Tomorrow"), then adds a three-step process band, alternating image/text panels and a
partner-logo carousel.

**Key Characteristics:**
- Omya blue `#007ac1` carries headings, the utility bar, the contact band and primary buttons
- Parallelogram buttons: `skewX(-10deg)` boxes with the label counter-skewed upright
- Square corners everywhere; only the FIND A REP fab and the home process circles are round
- Arial for all text (the declared Frutiger webfonts return 404)
- Repeated cross-promo bands (Contact Omya, Insights, formulation CTA) instead of page-specific endings

## Colors

- **Omya Blue** `#007ac1`: utility bar (`header > div:nth-of-type(1)`), H2 headings, contact band, `.btn-orange`. Hover `#338ec9`.
- **Ink** `#221f20`: body text and the `.btn-black` fill.
- **White** `#ffffff`: page background, nav links and H1 on photo heroes.
- **Navy Link** `#1e4263`: inline links in article bodies.
- **Mist** `#f1f1f1`: Insights card and light section bands.
- **Rule** `#dddddd`: table and section borders. Inputs use `#cccccc` borders.
- **Sky** `#99c7e4`: utility-bar links and the nav link hover colour.
- **Ice** `#e2f1f8`: table header rows and the pale-blue band.
- Hero overlays are `rgba(0,0,0,.5)` on interior heroes and `rgba(0,0,0,.7)` on the home hero.

**The One Blue Rule.** Omya blue is the only chromatic colour. Everything else is ink, white or grey.

## Typography

Arial is used for every text level (census: 701 measured elements, all Arial). The scale is ad-hoc: 48, 36, 28, 24, 20, 18, 16, 12, 10 px.

- H1 48px/700, white, centred on the hero (70 pages)
- H2 36px/700, Omya blue (68 pages)
- H3 24px/700
- Body 16px with weight 300 declared. Arial has no 300 face, so it renders as Regular.
- Utility and meta text 12px and 10px

The theme declares `frutigerbold` and `frutigerregular` (both files return 404) and links Istok Web, Oswald and Roboto from Google Fonts. No element renders in any of them.
Icons: Font Awesome 5 Free Solid (900) — `fa-times` on the modal close button, `fa-calendar-alt` on article dates.

## Layout

The page uses Bootstrap 3 containers and grid. The `#header-top` hero has 60px vertical padding (45px at ≤991px and 30px at ≤767px).
Layout breakpoints in the theme CSS are 767, 991 and 1024 px. Listings use a two-column grid of date-tag cards with pagination dots.
About and Approach pages alternate full-bleed image panels with text on the left or right.
Content cap (cap-probe at 1440 → 2560, 6 archetypes, consistent): content max-width **1310px** (module-level `wide-container`); shell fluid; heroes, bands and footer are full-bleed. Model in DESIGN.json `extensions.breakpoints`.

## Elevation & Depth

The design is almost flat. The only shadows are the FIND A REP fab (`0 0 3px #808080`) and one soft drop shadow (`5px 5px 50px rgba(0,0,0,.25)`).
Depth comes from photo heroes with dark overlays.

## Shapes

Corners are square (`0`) on buttons, cards, inputs and bands. `50%` appears only on the fixed `#stickyquote` fab and the three process circles on the home page.
The signature shape is the parallelogram button.

## Components

- **Buttons**: `.btn-orange` (blue), `.btn-black` (ink) and `.btn-white` (white with blue text). Each is skewed −10° and 40px high, with 12px × 18px padding. Hover changes the background to `#338ec9` with a `.25s` transition.
- **Site header**: a blue utility bar (Request Info, Newsletter Signup), then the white logo, a 5-item nav with dropdowns (Our Approach, Our Products, About, Insights, Contact) and a blue parallelogram "Customer Resources" button.
- **Page hero banner**: a darkened photo with a centred white H1 and breadcrumb. Event-detail and other thin pages use a flat grey version.
- **Contact Omya band**: blue background with a name/company/email/message form and reCAPTCHA (64 pages).
- **Insights band**: a grey latest-post card beside the contact form (21 pages).
- **Date card grid**: listing cards with a blue date tag and the title on a gradient over the image (events, blog, news).
- **Newsletter modal**: "Omya Market Insights — Subscribe here to get email updates!" (on every page, sometimes auto-opens).
- **FIND A REP fab**: a fixed blue circle on the right edge.
- **Footer**: logo and LinkedIn, five link columns, and legal links (Data Protection, Sales Terms, Impressum, Terms of Use, Privacy Policy, Consent Choices). The background is a pale blueprint-grid texture.

**The Parallelogram Rule.** Every button is a `skewX(-10deg)` box with its label counter-skewed upright.

## Do's and Don'ts

- Do keep headings Omya blue on white, and keep the H1 white on photo heroes.
- Do keep buttons as parallelograms with square corners.
- Don't round buttons, cards or bands.
- Don't add another chromatic accent. Blue is the only one.
