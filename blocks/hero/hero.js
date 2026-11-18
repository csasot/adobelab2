/**
 * hero — home hero: full-bleed photo (95vh, min 725 / max 1400; 50vh min 450 below 768) under a
 * 50% scrim, with the translucent black "hero band" pinned to its bottom (canon index.css ·
 * header-home + hero-band). The site header overlays the top of this block.
 *
 * Authoring (one row; cells in any order, or one flat cell):
 *   picture — the background photo (eager, fetchpriority high: the LCP element)
 *   h1      — headline; <em> marks the blue word ("Thinking")
 *   p       — lede
 *   p > strong > a — CTA (a.button.primary after decorateButtons)
 * Decode tier: template-slotted (query by role, never by row index).
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

export default function decorate(block) {
  const media = block.querySelector('picture') || block.querySelector('img');
  const heading = block.querySelector('h1, h2, h3');
  const paras = [...block.querySelectorAll('p')].filter((p) => !p.querySelector('picture, img'));
  const ctas = paras.filter((p) => p.querySelector('a'));
  const texts = paras.filter((p) => !p.querySelector('a'));

  const mediaBox = document.createElement('div');
  mediaBox.className = 'hero-media';
  if (media) {
    const img = media.tagName === 'IMG' ? media : media.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    }
    mediaBox.append(media);
  }

  const scrim = document.createElement('div');
  scrim.className = 'hero-scrim';

  const text = document.createElement('div');
  text.className = 'hero-band-text';
  if (heading) text.append(wrapNode(heading, 'hero-title'));
  text.append(...texts);

  const cta = document.createElement('div');
  cta.className = 'hero-band-cta';
  cta.append(...ctas);

  const inner = document.createElement('div');
  inner.className = 'hero-band-inner';
  inner.append(text, cta);
  const band = document.createElement('div');
  band.className = 'hero-band';
  band.append(inner);

  block.replaceChildren(mediaBox, scrim, band);
}
