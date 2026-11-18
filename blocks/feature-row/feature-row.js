/**
 * feature-row — bordered white row: photo (white frame + drop shadow) beside a text column
 * (canon.css · feature-row).
 *
 * Authoring: one row, two cells — the photo cell and the text cell (h2, paragraphs, CTA
 * p > strong > a). Cell ORDER sets the side: text first = photo on the right, photo first =
 * photo on the left. Below 768 the photo always comes first. Decode tier: template-slotted.
 */

function isMedia(node) {
  return node && (node.matches('picture, img') || !!node.querySelector('picture, img'));
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const nodes = cells.flatMap((c) => [...c.children]);
  const mediaNode = nodes.find(isMedia);
  const mediaIndex = nodes.indexOf(mediaNode);
  const textNodes = nodes.filter((n) => n !== mediaNode);
  const firstText = nodes.findIndex((n) => n !== mediaNode);
  const imgLeft = mediaNode && (firstText === -1 || mediaIndex < firstText);
  block.classList.add(imgLeft ? 'img-left' : 'img-right');

  const inner = document.createElement('div');
  inner.className = 'wrap feature-row-inner';
  const media = document.createElement('div');
  media.className = 'feature-row-media';
  if (mediaNode) media.append(mediaNode);
  const text = document.createElement('div');
  text.className = 'feature-row-text';
  text.append(...textNodes);
  const spacer = document.createElement('div');
  spacer.className = 'feature-row-spacer';
  const lead = document.createElement('div');
  lead.className = 'feature-row-spacer feature-row-spacer-lead';

  if (imgLeft) inner.append(media, spacer, text, lead);
  else inner.append(lead, text, spacer, media);
  block.replaceChildren(inner);
}
