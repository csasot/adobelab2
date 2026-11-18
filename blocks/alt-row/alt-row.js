/**
 * alt-row — stack of full-bleed photo rows (550px min) with a dark side gradient and a white text
 * column (canon.css · alt-row). Each authored row is one photo row.
 *
 * Authoring: one row per photo row, two cells — the photo cell (picture) and the text cell (h2,
 * paragraphs, CTA p > strong > a; <em> in the h2 marks the blue word). Cell ORDER sets the text
 * side, like feature-row: photo first = text on the right (gradient dark on the right), text
 * first = text on the left. A row without a photo keeps the gradient on the dark grey ground.
 * Decode tier: reconstructive (repeat group: one item per authored row, nodes classified by role).
 */

function isMedia(node) {
  return node && (node.matches('picture, img') || !!node.querySelector('picture, img'));
}

function buildRow(row) {
  const nodes = [...row.querySelectorAll(':scope > div > *')];
  const mediaNode = nodes.find(isMedia);
  const textNodes = nodes.filter((n) => n !== mediaNode);
  const firstText = nodes.findIndex((n) => n !== mediaNode);
  const textRight = !!mediaNode && nodes.indexOf(mediaNode) < firstText;

  const item = document.createElement('div');
  item.className = `alt-row-item ${textRight ? 'text-right' : 'text-left'}`;

  const media = document.createElement('div');
  media.className = 'alt-row-media';
  if (mediaNode) media.append(mediaNode);
  else item.classList.add('no-photo');

  const text = document.createElement('div');
  text.className = 'alt-row-text';
  text.append(...textNodes);

  const wrap = document.createElement('div');
  wrap.className = 'wrap alt-row-wrap';
  wrap.append(text);

  item.append(media, wrap);
  return item;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')]
    .filter((row) => !row.classList.contains('alt-row-item'));
  if (!rows.length) return;
  block.replaceChildren(...rows.map(buildRow));
}
