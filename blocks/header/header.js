/**
 * header — site chrome (template-slotted from stardust/prototypes/canon.css · header modules).
 *
 * Reads the authored /nav document (or the `nav` metadata path). Sections, in order:
 *   1. brand   — logo image linked to home
 *   2. aux     — <ul> of the blue utility strip (Request Info, Newsletter Signup)
 *   3. nav     — nested <ul>: top items, each optional sub-<ul> = hover dropdown
 *   4. cta     — <ul> with one item + sub-<ul>: the skewed "Customer Resources" click menu
 *   5. tools   — links: [0] black REQUEST INFO tab (<768), [1] FIND A REP scroll badge,
 *                [2] mobile bar MENU title link
 *   6. popup   — h2, h3, disclaimer <p> of the Request Info / newsletter modal (#contact-popup)
 * Missing sections are skipped. A metadata section (Robots | noindex) is ignored.
 *
 * Behaviour (stardust/chrome/header-contract.json + canon.js): nav dropdowns open on hover and
 * focus-within; the CTA menu toggles on click; the mobile menu (outside <header>, <768) slides a
 * drawer in from the left with per-item expanders; the FIND A REP badge slides up past 115px of
 * scroll; the popup opens 6 s after the first visit (cookie firstViewRequest, once per browser)
 * and from any link to #contact-popup; it closes on the ×, the backdrop and Escape.
 * The header is an overlay over the first section; its height is published as --header-h.
 * The modal is appended to <header> after the block; tab, badge and drawer to <body>.
 */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import {
  buildField, buildRecaptchaSlot, mountRecaptcha, wireForm,
} from '../../scripts/forms.js';

const POPUP_ID = 'contact-popup';
const POPUP_DELAY = 6000;

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function stripInstrumentation(node) {
  node.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  node.removeAttribute('data-prose-index');
  return node;
}

/* the delivery pipeline wraps a list item's trigger link in a <p> (#98): unwrap it */
function normalizeList(ul) {
  ul.querySelectorAll('li').forEach((li) => {
    li.querySelectorAll(':scope > p').forEach((p) => p.replaceWith(...p.childNodes));
  });
  return ul;
}

function pathOf(href) {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url.pathname.replace(/\/$/, '') || '/';
  } catch (e) {
    return null;
  }
}

function markCurrent(list) {
  const here = window.location.pathname.replace(/\/$/, '') || '/';
  [...list.children].forEach((li) => {
    const top = li.querySelector(':scope > a');
    const p = top && pathOf(top.href);
    if (p && p !== '/' && (here === p || here.startsWith(`${p}/`))) li.classList.add('is-current');
    li.querySelectorAll(':scope > ul > li').forEach((sub) => {
      const a = sub.querySelector(':scope > a');
      if (a && pathOf(a.href) === here) {
        sub.classList.add('is-current');
        li.classList.add('is-current-ancestor');
      }
    });
  });
}

function sectionContent(section) {
  if (!section) return null;
  return section.querySelector('.default-content-wrapper') || section;
}

function buildBrand(section) {
  const box = el('div', 'site-header-logo');
  const content = sectionContent(section);
  if (!content) return box;
  const media = content.querySelector('picture, img');
  let link = content.querySelector('a');
  if (link && media && !link.contains(media)) link.append(media);
  if (!link && media) {
    link = el('a', '', { href: '/' });
    link.append(media);
  }
  if (link) {
    if (!link.title) link.title = 'Home';
    box.append(link);
  }
  return box;
}

function buildAux(section) {
  const aux = el('div', 'aux-nav');
  const wide = el('div', 'site-wide');
  const ul = sectionContent(section)?.querySelector('ul');
  if (ul) {
    normalizeList(ul).classList.add('aux-nav-list');
    wide.append(ul);
  }
  aux.append(wide);
  return aux;
}

function buildNav(section) {
  const nav = el('nav', 'site-nav', { 'aria-label': 'Main' });
  const ul = sectionContent(section)?.querySelector('ul');
  if (!ul) return { nav, ul: null };
  normalizeList(ul).classList.add('site-nav-list');
  [...ul.children].forEach((li) => {
    const sub = li.querySelector(':scope > ul');
    if (sub) {
      li.classList.add('has-sub');
      sub.classList.add('site-nav-sub');
    }
  });
  markCurrent(ul);
  nav.append(ul);
  return { nav, ul };
}

function buildCta(section) {
  const box = el('div', 'site-header-cta');
  const ul = sectionContent(section)?.querySelector('ul');
  if (!ul) return box;
  normalizeList(ul).classList.add('cta-menu');
  [...ul.children].forEach((li) => {
    li.classList.add('cta-menu-item');
    const link = li.querySelector(':scope > a');
    const sub = li.querySelector(':scope > ul');
    if (!link || !sub) return;
    sub.classList.add('cta-menu-sub');
    link.setAttribute('aria-expanded', 'false');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const open = li.classList.toggle('is-open');
      link.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => {
    ul.querySelectorAll('.cta-menu-item.is-open').forEach((li) => {
      if (li.contains(e.target)) return;
      li.classList.remove('is-open');
      li.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
    });
  });
  box.append(ul);
  return box;
}

function setMenu(open, toggle) {
  document.body.classList.toggle('is-menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

function buildMobileMenu(navUl, titleLink) {
  const menu = el('div', 'mobile-menu');
  const overlay = el('div', 'mobile-menu-overlay');
  const bar = el('div', 'mobile-menu-bar');
  const toggle = el('button', 'mobile-menu-toggle', {
    type: 'button', 'aria-label': 'Menu', 'aria-expanded': 'false', 'aria-controls': 'mobile-menu-panel',
  });
  const box = el('span', 'mobile-menu-box');
  box.append(el('span', 'mobile-menu-lines'));
  toggle.append(box);
  const title = el('div', 'mobile-menu-title');
  if (titleLink) title.append(titleLink);
  bar.append(toggle, title);
  const panel = el('nav', 'mobile-menu-panel', { id: 'mobile-menu-panel', 'aria-label': 'Mobile' });
  if (navUl) {
    const list = stripInstrumentation(navUl.cloneNode(true));
    list.className = 'mobile-menu-list';
    list.querySelectorAll('*').forEach((n) => n.removeAttribute('class'));
    [...list.children].forEach((li) => {
      const sub = li.querySelector(':scope > ul');
      if (!sub) return;
      li.classList.add('has-sub');
      const label = li.querySelector(':scope > a')?.textContent.trim() || '';
      const expand = el('button', 'mobile-menu-expand', {
        type: 'button', 'aria-label': `Expand ${label}`, 'aria-expanded': 'false',
      });
      expand.addEventListener('click', () => {
        const open = li.classList.toggle('is-open');
        expand.setAttribute('aria-expanded', String(open));
      });
      li.prepend(expand);
    });
    panel.append(list);
  }
  toggle.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('is-menu-open'), toggle);
  });
  overlay.addEventListener('click', () => setMenu(false, toggle));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-menu-open')) {
      setMenu(false, toggle);
      toggle.focus();
    }
  });
  menu.append(overlay, bar, panel);
  return menu;
}

function buildFab(link) {
  link.className = 'fab-rep';
  const text = el('span', 'fab-rep-text');
  text.append(...link.childNodes);
  link.append(text);
  const onScroll = () => link.classList.toggle('active', window.scrollY > 115);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return link;
}

function closePopup(popup) {
  popup.classList.remove('is-in');
  popup.removeAttribute('aria-modal');
  setTimeout(() => {
    popup.hidden = true;
  }, 300);
}

function openPopup(popup) {
  popup.hidden = false;
  popup.setAttribute('aria-modal', 'true');
  mountRecaptcha(popup.querySelector('.recaptcha-slot'));
  requestAnimationFrame(() => requestAnimationFrame(() => popup.classList.add('is-in')));
}

function buildPopupForm(disclaimer) {
  const form = el('form', 'modal-form', { id: 'contact-popup-form', name: 'contact-popup-form' });
  const split = el('div', 'modal-form-row modal-form-row-split');
  split.append(
    buildField({
      name: 'fname', placeholder: 'First Name *', label: 'First Name', required: true, className: 'field',
    }),
    buildField({
      name: 'lname', placeholder: 'Last Name *', label: 'Last Name', required: true, className: 'field',
    }),
  );
  const submitRow = el('div', 'modal-form-submit');
  const btn = el('button', 'btn btn-blue', { type: 'submit' });
  const label = el('span');
  label.textContent = 'Submit';
  btn.append(label);
  submitRow.append(btn);
  form.append(
    split,
    buildField({
      name: 'company', placeholder: 'Company *', label: 'Company', required: true, className: 'field',
    }),
    buildField({
      name: 'email', type: 'email', placeholder: 'Email Address *', label: 'Email Address', required: true, className: 'field',
    }),
    buildField({ name: 'phone', placeholder: 'Telephone Number', className: 'field' }),
    buildField({
      name: 'message', placeholder: 'Message', area: true, className: 'field field-area',
    }),
    buildRecaptchaSlot(),
    submitRow,
  );
  if (disclaimer) {
    const d = el('div', 'form-disclaimer');
    d.append(disclaimer);
    form.append(d);
  }
  wireForm(form, 'contact-popup');
  return form;
}

function buildPopup(section) {
  const content = sectionContent(section);
  const popup = el('div', 'modal', {
    id: POPUP_ID, role: 'dialog', 'aria-labelledby': 'contact-popup-title',
  });
  popup.hidden = true;
  const dialog = el('div', 'modal-dialog');
  const body = el('div', 'modal-body');
  const close = el('button', 'modal-close', {
    type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close',
  });
  close.append(el('i', 'icon icon-times', { 'aria-hidden': 'true' }));
  const inner = el('div', 'modal-inner');
  if (content) {
    const h2 = content.querySelector('h2');
    if (h2) h2.id = 'contact-popup-title';
    const headings = [...content.querySelectorAll('h1, h2, h3, h4')];
    inner.append(...headings);
    const disclaimer = [...content.querySelectorAll('p')].pop();
    inner.append(buildPopupForm(disclaimer));
  }
  body.append(close, inner);
  dialog.append(body);
  popup.append(dialog);

  close.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === dialog) closePopup(popup);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.hidden) closePopup(popup);
  });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(`a[href$="#${POPUP_ID}"]`);
    if (!trigger) return;
    e.preventDefault();
    openPopup(popup);
  });
  if (!document.cookie.includes('firstViewRequest')) {
    // 6 s after the page started loading (the source's timer runs from its own page load)
    setTimeout(() => {
      document.cookie = 'firstViewRequest=false;path=/';
      openPopup(popup);
    }, Math.max(0, POPUP_DELAY - performance.now()));
  }
  return popup;
}

function publishHeight(root) {
  const set = () => {
    const h = Math.round(root.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--header-h', `${h}px`);
  };
  set();
  if (window.ResizeObserver) new ResizeObserver(set).observe(root);
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  block.textContent = '';
  if (!fragment) return;

  const sections = [...fragment.querySelectorAll(':scope > .section')]
    .filter((s) => !s.querySelector('.metadata'));
  const [brandS, auxS, navS, ctaS, toolsS, popupS] = sections;

  const root = el('div', 'site-header');
  const top = el('div', 'site-header-top');
  const row = el('div', 'site-wide site-header-row');
  const { nav, ul: navUl } = buildNav(navS);
  row.append(buildBrand(brandS), nav, buildCta(ctaS));
  top.append(row);
  root.append(buildAux(auxS), top);
  block.append(root);

  // chrome that lives outside <header> on the source: the fixed REQUEST INFO tab, FIND A REP
  // badge and mobile drawer go to <body> (as on the source); the hidden modal is appended to the
  // <header> landmark after the block (site chrome to crawlers, not page copy)
  const host = block.closest('header') || document.body;
  document.querySelectorAll('body > .call-mobile, body > .fab-rep, body > .mobile-menu, header > .modal')
    .forEach((n) => n.remove());
  const tools = [...(sectionContent(toolsS)?.querySelectorAll('a') || [])];
  const [callLink, fabLink, menuLink] = tools;
  if (callLink) {
    callLink.className = 'call-mobile';
    document.body.append(callLink);
  }
  if (fabLink) document.body.append(buildFab(fabLink));
  document.body.append(buildMobileMenu(navUl, menuLink));
  if (popupS) host.append(buildPopup(popupS));

  publishHeight(root);
}
