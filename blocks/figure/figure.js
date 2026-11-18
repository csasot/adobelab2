/**
 * figure — an article image set apart from the text flow (WordPress alignleft / alignright /
 * alignnone / wp-caption / a centred logo at half the column), with an optional caption.
 * Lives inside an `article-body` section; a floated figure lets the following paragraphs wrap.
 *
 * Authoring (one row): cell 1 = the picture, then optional caption paragraph(s); optional cell 2 =
 * the text that wraps beside a left / right figure (headings, paragraphs) — the block then holds
 * the float and its text and ends below both (the source's clearfix after the wrapped text).
 * Variants:
 *   (default) / center — centred block
 *   left | right       — floated, text wraps beside it (stacked full width below 768px)
 *   start | end        — left- / right-aligned block (alignnone, or a float cleared at once)
 *   half               — centred at 50% of the column, 20px above and below
 *   width-<n>          — display width in px when the source shows the file below its size
 *   pad-bottom-<n>     — space under the image in px (the source's inline padding)
 *   thumbnail          — framed image (bootstrap .img-thumbnail)
 *   line-after         — the next paragraph opens with an empty line (source <br> after the image)
 * Decode tier: template-slotted (picture = media, other paragraphs = caption).
 */
export default function decorate(block) {
  const size = [...block.classList].find((c) => /^width-\d+$/.test(c));
  if (size) block.style.setProperty('--figure-w', `${size.slice(6)}px`);
  const pad = [...block.classList].find((c) => /^pad-bottom-\d+$/.test(c));
  if (pad) block.style.setProperty('--figure-pb', `${pad.slice(11)}px`);
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const media = cells.find((c) => c.querySelector('picture, img')) || cells[0];
  if (!media) return;
  media.classList.add('figure-media-cell');
  [...media.children].forEach((el) => {
    el.classList.add(el.querySelector('picture, img') ? 'figure-media' : 'figure-caption');
  });
  const text = cells.filter((c) => c !== media);
  if (text.length) {
    block.classList.add('has-text');
    text.forEach((c) => c.classList.add('figure-text'));
  }
}
