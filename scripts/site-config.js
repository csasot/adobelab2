/**
 * Site configuration for the interim form tier (stardust/dynamic-features.md D1, D2).
 *
 * FORM_ENDPOINTS: production submission target per form. Empty = no backend connected:
 * submissions are captured locally (localStorage) with an explicit notice, never a fake success.
 * RECAPTCHA_SITE_KEY: Google's published always-pass TEST key, rendered in the same slot as the
 * source's reCAPTCHA v2 checkbox. Replace with the real key for the new hosts (decision D2).
 */
export const FORM_ENDPOINTS = {
  'contact-footer': '',
  'contact-popup': '',
  'contact-page': '',
  'request-info-page': '',
  'formulary-request-page': '',
};

export const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHzR9ZYbmXDHd-4tZKYwN';
