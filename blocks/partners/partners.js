/**
 * partners — "Global Partners" logo marquee (canon.css · partners): heading column + a
 * continuous linear marquee, 3 logos visible (2 below 1024px), one logo every 3 s, infinite
 * (the source's slick autoplaySpeed 0 / speed 3000 — ~106 px/s at 1440).
 *
 * Authoring: a heading row (h2; a <br> breaks it on wide screens), then one row per logo:
 * the logo image linked to the partner (p > a > picture), or picture + link in two cells.
 * Decode tier: reconstructive (logo rows are a repeat group).
 * Marquee duplicates are presentational clones: aria-hidden, untabbable, no editor indices (EW4).
 * Variant `grid` (/about/global-partners, child.css · .global-partner-box): no marquee — every
 * logo row becomes a white box in a grey band (3-up >= 992, 2-up >= 768, 1-up below), no clones.
 */

const LEAD = 3;

function stripInstrumentation(el) {
  el.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  el.removeAttribute('data-prose-index');
  return el;
}

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function buildSlide(row) {
  const media = row.querySelector('picture') || row.querySelector('img');
  if (!media) return null;
  let link = media.closest('a');
  if (!link) {
    link = row.querySelector('a');
    if (link) {
      // picture and link authored apart: the logo becomes the link's content
      if (link.textContent.trim() === link.href || /^https?:/.test(link.textContent.trim())) {
        link.textContent = '';
      }
      link.append(media);
    }
  }
  const holder = (link || media).closest('p') || link || media;
  const slide = document.createElement('div');
  slide.className = 'partners-slide';
  slide.append(holder);
  return slide;
}

function cloneSlide(slide, lead) {
  const c = stripInstrumentation(slide.cloneNode(true));
  c.classList.add('partners-slide-clone');
  if (lead) c.classList.add('partners-slide-lead');
  c.setAttribute('aria-hidden', 'true');
  c.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
  c.querySelectorAll('img').forEach((img) => {
    img.loading = 'lazy';
  });
  return c;
}

function decorateGrid(block, slides, head) {
  slides.forEach((s) => s.classList.add('partners-box'));
  const grid = document.createElement('div');
  grid.className = 'partners-grid';
  grid.append(...slides);
  block.replaceChildren(...(head.childElementCount ? [head] : []), grid);
}

export default function decorate(block) {
  const rows = [...block.children];
  const head = document.createElement('div');
  head.className = 'partners-head';
  const slides = [];
  rows.forEach((row) => {
    const slide = buildSlide(row);
    if (slide) {
      slides.push(slide);
      return;
    }
    row.querySelectorAll('h1, h2, h3, h4, p').forEach((n) => {
      head.append(/^H/.test(n.tagName) ? wrapNode(n, 'partners-title') : n);
    });
  });

  if (block.classList.contains('grid')) {
    decorateGrid(block, slides, head);
    return;
  }

  const track = document.createElement('div');
  track.className = 'partners-track';
  const n = slides.length;
  const lead = slides.slice(-Math.min(LEAD, n)).map((s) => cloneSlide(s, true));
  const tail = slides.map((s) => cloneSlide(s, false));
  track.append(...lead, ...slides, ...tail);
  track.style.setProperty('--pm-n', n);

  const list = document.createElement('div');
  list.className = 'partners-list';
  list.append(track);
  const slider = document.createElement('div');
  slider.className = 'partners-slider';
  slider.append(list);
  const wrap = document.createElement('div');
  wrap.className = 'partners-wrap';
  wrap.append(head, slider);
  block.replaceChildren(wrap);
}
