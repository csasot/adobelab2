/**
 * footer — site footer (template-slotted from canon.css · footer module).
 *
 * Reads the authored /footer document (or the `footer` metadata path). Sections, in order:
 *   1. brand — logo image linked to home, then the LinkedIn image link
 *   2. menu  — nested <ul> (five columns: top link + optional sub-list)
 *   3. legal — the copyright / policy paragraph(s)
 * A metadata section (Robots | noindex) is ignored. A link to #consent-choices opens the
 * consent manager's preferences when one is loaded (the source's Didomi call).
 */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function contentOf(section) {
  if (!section) return null;
  return section.querySelector('.default-content-wrapper') || section;
}

function imageLinks(content) {
  if (!content) return [];
  return [...content.querySelectorAll('picture, img')]
    .filter((m) => m.tagName === 'PICTURE' || !m.closest('picture'))
    .map((media) => {
      let link = media.closest('a');
      if (!link) {
        const p = media.closest('p');
        link = p ? p.querySelector('a') : null;
        if (link) link.append(media);
      }
      return link || media;
    });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  block.textContent = '';
  if (!fragment) return;

  const sections = [...fragment.querySelectorAll(':scope > .section')]
    .filter((s) => !s.querySelector('.metadata'));
  const [brandS, menuS, legalS] = sections;

  const root = el('div', 'site-footer');
  const wrap = el('div', 'wrap site-footer-wrap');

  const brand = el('div', 'site-footer-brand');
  const logo = el('div', 'site-footer-logo');
  const social = el('div', 'site-footer-social');
  const [logoLink, ...socialLinks] = imageLinks(contentOf(brandS));
  if (logoLink) logo.append(logoLink);
  social.append(...socialLinks);
  brand.append(logo, social);

  const nav = el('div', 'site-footer-nav');
  const ul = contentOf(menuS)?.querySelector('ul');
  if (ul) {
    ul.querySelectorAll('li > p').forEach((p) => p.replaceWith(...p.childNodes));
    ul.classList.add('footer-menu');
    nav.append(ul);
  }

  const legal = el('div', 'site-footer-legal');
  const legalContent = contentOf(legalS);
  if (legalContent) legal.append(...legalContent.children);

  wrap.append(brand, nav, legal);
  root.append(wrap);
  block.append(root);

  block.querySelectorAll('a[href$="#consent-choices"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.Didomi?.preferences) window.Didomi.preferences.show();
    });
  });
}
