# Martech hand-off

Everything below is scaffolded **off**. To ship it, set `enabled: true` on `consent.cmp` and on each route in `stardust/martech-contract.json`, then re-run `deploy/scripts/martech-scaffold.mjs` and `dynamics/scripts/dynamics-check.mjs` to confirm the enabled tags load. Enabled tags load on `omyapersonalcare.us` only; preview with `?martech=on` (add `&consent=accept` to grant every category).

## Consent

- **CMP:** none detected
- **Model `owner-decision`:** no evidence of consent gating inside the tag manager. Keep the source behaviour (route `category` null), or set a route `category` to a consent group id to load that tag manager only once the group is granted.
- **Google Consent Mode:** consent-mode calls in `tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js`. Check it with the owner before gating a route on a category.
- **Categories:** no CMP configuration read — run `spec-martech.mjs` first, or decide categories with the owner.

## Routes

| id | vendor | src | CMP groups listing its host | enabled |
|---|---|---|---|---|
| google-tag-manager | Google Tag Manager | `https://www.googletagmanager.com/gtm.js?id=GTM-NS9KZC3` | — | false |

Also seen, not routed (loaded by the tag manager or inline on the source — confirm each still fires): analytics: Google Analytics / Ads · marketing: ad / retargeting pixel.

## Rewrite before go-live

These read the old URLs or DOM and will not match the migrated pages:
- Google Tag Manager rule Phone click-to-call: UA Tel/Click + GA4 phone_ctc — selectors `a[href^="tel:"]` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[1] predicates[1,2] → tags[4,17]
- Google Tag Manager rule Contact form submit: UA Contact Form/Submit + GA4 contact_form_submit — selectors `#contact-form` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[2] predicates[3,4,5] → tags[5,13]
- Google Tag Manager rule Email click: UA Email/Submit + GA4 email_submit — selectors `a[href^="mailto:"]` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[4] predicates[2,8] → tags[7,15]
- Google Tag Manager rule Onboarding form submit: UA Onboard/Form + GA4 onboard_form — paths `/customer-resources/onboarding/` — selectors `#onboarding-form` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[5] predicates[4,9,10] → tags[8,16]
- Google Tag Manager rule Credit application submit: UA Credit Application/Submit + GA4 credit_app_form — paths `/customer-resources/credit-application/` — selectors `#credit-application` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[6] predicates[4,11,12] → tags[9,14]
- Google Tag Manager rule Download click (.png in URL): UA PDF/Downloads — selectors `a[href*=".png"]` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[7] predicates[2,13] → tags[10]
- Google Tag Manager rule Request-info success visible: GA4 request_info — paths `/request-info` — selectors `.form-message.margin-bottom-15.success` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[9] predicates[15,16,17] → tags[18,26]

## Data layer

The source pages expose `dataLayer`; keep the same global names.
Google Tag Manager (read by the model, not parsed) rules fire on data-layer pushes; the migrated pages must push the same events: `gtm.click` (3) · `gtm.formSubmit` (3) · `gtm.js` (1) · `gtm.init` (1) · `ajaxComplete` (1) · `gtm.elementVisibility` (1).
Data elements read these data-layer paths: `constant`, `dataLayer attributes.response (pushed by custom HTML ajaxComplete listener)`, `GTM built-ins gtm.elementUrl, gtm.elementId, URL path`.
Ask the owner for the tagging plan (solution design reference): each event, its payload and the interaction that pushes it. With it, add each push in the block that owns the interaction.

- Google Tag Manager rule All pages: UA pageview (UA-116841070-1, retired product), AdRoll smart pixel (adv VWETZF5UJ5DC5JRDYHX6GH / pix 4EAMVJEN3BGPZFWWFRLASI), Google Ads remarketing AW-658173166, conversion linker, click/form-submit/visibility listeners, jQuery ajaxComplete listener (custom HTML) — listens for `gtm.js` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[0] → tags[0,1,2,3,19-28]
- Google Tag Manager rule GA4 config G-QT12E7SKTC (send_page_view) — listens for `gtm.init` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[8] → tags[11]
- Google Tag Manager rule Phone click-to-call: UA Tel/Click + GA4 phone_ctc — listens for `gtm.click` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[1] predicates[1,2] → tags[4,17]
- Google Tag Manager rule Contact form submit: UA Contact Form/Submit + GA4 contact_form_submit — listens for `gtm.formSubmit` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[2] predicates[3,4,5] → tags[5,13]
- Google Tag Manager rule Lead form success (AJAX): UA Lead Form/Submit + GA4 lead_form_submit — listens for `ajaxComplete` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[3] predicates[6,7] (attributes.response contains "success") → tags[6,12]
- Google Tag Manager rule Email click: UA Email/Submit + GA4 email_submit — listens for `gtm.click` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[4] predicates[2,8] → tags[7,15]
- Google Tag Manager rule Onboarding form submit: UA Onboard/Form + GA4 onboard_form — listens for `gtm.formSubmit` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[5] predicates[4,9,10] → tags[8,16]
- Google Tag Manager rule Credit application submit: UA Credit Application/Submit + GA4 credit_app_form — listens for `gtm.formSubmit` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[6] predicates[4,11,12] → tags[9,14]
- Google Tag Manager rule Download click (.png in URL): UA PDF/Downloads — listens for `gtm.click` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[7] predicates[2,13] → tags[10]
- Google Tag Manager rule Request-info success visible: GA4 request_info — listens for `gtm.elementVisibility` — read by the model at martech/tags/www.googletagmanager.com-gtm-GTM-NS9KZC3.js resource v20 rules[9] predicates[15,16,17] → tags[18,26]

## Tag-manager notes (read by the model, not parsed)

**Google Tag Manager:** Consent on the source is Didomi, not GTM: the page HTML wraps the GTM snippet in `<script type="didomi/javascript" data-vendor="c:googleana-4TXnJigR" data-purposes="measure_ad_performance,improve_products">`, so GTM only executes after Didomi grants that vendor (read from https://omyapersonalcare.us/ server HTML, <head>). Didomi loads inline from sdk.privacy-center.org with public API key `140e89a8-992a-4e56-b3c6-7c311b7e0e6d`, notice `ACt2ytmx` (same HTML, `spcloader` snippet); footer link `javascript:Didomi.preferences.show()`. vendors.json has no `cmp` loader knowledge for Didomi, so `consent.cmp` stays null: the owner adds the Didomi loader (or extends vendors.json) and gates the GTM route on the Didomi vendor/purposes before enabling. No Google Consent Mode default inline (0/6 pages); the GTM library references ads_data_redaction only. Form rules depend on source ids (#contact-form, #onboarding-form, #credit-application), the jQuery ajaxComplete payload and `.form-message…success`: the rebuilt forms must push equivalent dataLayer events or the owner rewrites these triggers. UA tags (UA-116841070-1) are dead since UA sunset — owner may drop them. reCAPTCHA v2 is page-level (www.google.com/recaptcha), not a GTM tag.

Confirm everything read by the model against the owner's tagging plan.
