/**
 * Shared interim form helpers (dynamic-features rows 8, 9, 18):
 * field builders, the reCAPTCHA v2 slot (test key, mounted lazily) and the submit handler
 * (configured endpoint, else local capture with a "no backend connected" notice).
 */
import { loadScript } from './aem.js';
import { FORM_ENDPOINTS, RECAPTCHA_SITE_KEY } from './site-config.js';

const CAPTURE_KEY = 'omya-form-captures';
let recaptchaReady;

/**
 * Builds an input or textarea.
 * @param {object} def { name, placeholder, type, area, required, className }
 * @returns {HTMLElement}
 */
export function buildField(def) {
  const el = document.createElement(def.area ? 'textarea' : 'input');
  if (!def.area) el.type = def.type || 'text';
  el.name = def.name;
  el.placeholder = def.placeholder;
  el.setAttribute('aria-label', def.label || def.placeholder.replace(/\s*\*$/, ''));
  if (def.required) el.required = true;
  if (def.className) el.className = def.className;
  return el;
}

function loadRecaptcha() {
  if (!recaptchaReady) {
    recaptchaReady = new Promise((resolve) => {
      window.omyaRecaptchaLoaded = () => resolve(window.grecaptcha);
      loadScript('https://www.google.com/recaptcha/api.js?onload=omyaRecaptchaLoaded&render=explicit')
        .catch(() => resolve(null));
    });
  }
  return recaptchaReady;
}

/**
 * Renders the reCAPTCHA v2 checkbox into a slot on the visitor's first interaction with its
 * form (focus or pointer), so the widget's vendor script loads only for people who use the form.
 * @param {HTMLElement} slot
 */
export function mountRecaptcha(slot) {
  if (!slot || slot.dataset.recaptcha) return;
  slot.dataset.recaptcha = 'pending';
  const form = slot.closest('form') || slot;
  const render = async () => {
    const grecaptcha = await loadRecaptcha();
    if (!grecaptcha || slot.dataset.recaptcha === 'rendered') return;
    slot.dataset.recaptcha = 'rendered';
    const box = document.createElement('div');
    slot.append(box);
    try {
      slot.dataset.widgetId = grecaptcha.render(box, { sitekey: RECAPTCHA_SITE_KEY });
    } catch (e) {
      slot.dataset.recaptcha = 'failed';
    }
  };
  const start = () => {
    form.removeEventListener('focusin', start);
    form.removeEventListener('pointerdown', start);
    render();
  };
  form.addEventListener('focusin', start);
  form.addEventListener('pointerdown', start);
}

/**
 * Builds the reCAPTCHA slot element (304x78, the widget's box).
 * @returns {HTMLElement}
 */
export function buildRecaptchaSlot() {
  const slot = document.createElement('div');
  slot.className = 'recaptcha-slot';
  return slot;
}

function showMessage(form, text, kind) {
  let msg = form.querySelector('.form-message');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'form-message';
    msg.setAttribute('role', 'status');
    form.prepend(msg);
  }
  msg.dataset.kind = kind;
  msg.textContent = text;
}

/**
 * Wires validation + submission. Required fields empty → refused with a message.
 * @param {HTMLFormElement} form
 * @param {string} name form id in FORM_ENDPOINTS
 */
export function wireForm(form, name) {
  form.noValidate = true;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.elements].filter((el) => el.name && !el.classList.contains('form-hp')
      && !['hidden', 'submit', 'button'].includes(el.type));
    const missing = fields.filter((el) => el.required && !el.value.trim());
    // a form without required fields still refuses an entirely empty submission
    if (!missing.length && fields.length && fields.every((el) => !el.value.trim())) {
      missing.push(fields[0]);
    }
    if (missing.length) {
      showMessage(form, 'Please fill in the required fields.', 'error');
      missing[0].focus();
      return;
    }
    const email = form.querySelector('input[type="email"], input[name="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showMessage(form, 'Please enter a valid email address.', 'error');
      email.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { data, page: window.location.pathname, timestamp: new Date().toISOString() };
    const endpoint = FORM_ENDPOINTS[name];
    if (endpoint) {
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error(resp.status);
        showMessage(form, 'Thank you. Your message has been sent.', 'success');
        form.reset();
      } catch (err) {
        showMessage(form, 'Sorry, your message could not be sent. Please try again.', 'error');
      }
      return;
    }
    try {
      const all = JSON.parse(localStorage.getItem(CAPTURE_KEY) || '[]');
      all.push({ form: name, ...payload });
      localStorage.setItem(CAPTURE_KEY, JSON.stringify(all));
    } catch (err) {
      // storage unavailable: the notice below still states nothing was sent
    }
    showMessage(form, 'No backend is connected yet: your entry was saved in this browser only'
      + ' and has not been sent.', 'interim');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'form_submit_interim', form: name });
  });
}
