/**
 * article — the date / meta line of a single post, event or news item (canon.css · article:
 * p.article__date = calendar icon + bold date, blue). The article body itself is DEFAULT
 * CONTENT authored after this block in the same section (headings, paragraphs, images, lists);
 * this block's CSS lays that section out as the source's centred article column
 * (12 / md 10 offset 1 / lg 8 offset 2) — the section carries style `article-body` and is also
 * matched by the section class `article-container` EDS adds when this block is in it.
 *
 * Authoring (one row, one cell): the date, e.g. "January 15, 2024" (bold optional — it is
 * rendered bold either way). Extra paragraphs in the cell are kept as further meta lines.
 * Variants: event — event posts (article.type-events) start 25px lower.
 * Decode tier: template-slotted (the first paragraph is the date).
 */

export default function decorate(block) {
  const paras = [...block.querySelectorAll('p')];
  if (!paras.length) {
    const cell = block.querySelector(':scope > div > div');
    if (cell && cell.textContent.trim()) {
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      paras.push(p);
    }
  }
  const meta = paras.map((p, i) => {
    p.className = i === 0 ? 'article-date' : 'article-meta';
    if (i === 0) {
      if (!p.querySelector('strong')) {
        const strong = document.createElement('strong');
        strong.append(...p.childNodes);
        p.append(strong);
      }
      const icon = document.createElement('i');
      icon.className = 'icon icon-calendar';
      icon.setAttribute('aria-hidden', 'true');
      p.prepend(icon, ' ');
    }
    return p;
  });
  block.replaceChildren(...meta);
}
