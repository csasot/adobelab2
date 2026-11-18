/**
 * page-hero — inner-page title band under the overlaid site header (canon.css · header-inner +
 * page-hero; about.css · about-hero). The block paints the page photo (cover, centred) and the
 * shared 50% scrim behind the header overlay, pads its top by var(--header-h), then sets the
 * centred title column: h1 + breadcrumbs.
 *
 * Authoring (one row; cells in any order, or one flat cell):
 *   picture — optional page photo (eager, fetchpriority high: the LCP element). Without one the
 *             band keeps the scrim only (event pages) and the block gets `no-photo`.
 *   h1      — page title
 *   p       — breadcrumbs: links to the ancestors, the current page as plain text
 *             ("Home / Insights / Blog / AAK Partnership")
 * Variants:
 *   (default) — 50/40 title padding (about, static siblings, listings, contact, rep locator)
 *   tall      — 10% / 12% of the width (article / post photo headers: canon .site-header--photo)
 * Decode tier: template-slotted (query by role, never by row index).
 */

function wrapNode(nodes, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(...nodes);
  return w;
}

export default function decorate(block) {
  const media = block.querySelector('picture') || block.querySelector('img');
  const heading = block.querySelector('h1, h2, h3');
  const paras = [...block.querySelectorAll('p')].filter((p) => !p.querySelector('picture, img'));

  const mediaBox = document.createElement('div');
  mediaBox.className = 'page-hero-media';
  if (media) {
    const img = media.tagName === 'IMG' ? media : media.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    }
    mediaBox.append(media);
  } else {
    block.classList.add('no-photo');
  }

  const scrim = document.createElement('div');
  scrim.className = 'page-hero-scrim';

  const col = document.createElement('div');
  col.className = 'page-hero-col';
  if (heading) col.append(wrapNode([heading], 'page-hero-title'));
  if (paras.length) col.append(wrapNode(paras, 'page-hero-crumbs'));

  const band = document.createElement('div');
  band.className = 'wrap page-hero-band';
  band.append(col);

  block.replaceChildren(mediaBox, scrim, band);
}
