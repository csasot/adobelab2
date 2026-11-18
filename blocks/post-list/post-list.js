/**
 * post-list — the listing band (insights-blog.css · ib-list + ib-pagenavi; canon.css · post-tile):
 * grey band, centred 10/12 → 8/12 column, 2-up 48% post tiles (≥768), round page links below.
 *
 * Authoring (document-first listing — one row per card, then an optional pager row):
 *   card row:  picture | date <p> | <p><a href=post>title</a></p>   (cells in any order)
 *              an image-less card (date | title link) renders as a bare tile, as the source's
 *              `url()` tiles (/events)
 *   pager row: one <p> — the current page number as plain text, the other pages and "»" as links
 * The cards render exactly as authored. Index top-up (query-index `blog`, newest first,
 * client-paged — stardust/dynamic-features.md row 2) is a later phase and will append to the
 * authored cards; authored cards always stay.
 * Decode tier: reconstructive (repeat group: a row with an image is a card; a row without one
 * whose links are all page links is the pager; a multi-cell row with a longer link is an
 * image-less card; anything else is kept as a leftover in order).
 * Cards are card-as-link: the title link's href moves to the tile anchor and the inner anchor is
 * unwrapped (EW6).
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function buildTile(row) {
  const media = row.querySelector('picture') || row.querySelector('img');
  const paras = [...row.querySelectorAll('p')].filter((p) => !p.querySelector('picture, img'));
  const titleP = paras.find((p) => p.querySelector('a'));
  const link = titleP?.querySelector('a');
  const dateP = paras.find((p) => p !== titleP);
  const tile = document.createElement('a');
  tile.className = 'post-tile';
  if (link) tile.href = link.href;
  if (media) tile.append(wrapNode(media, 'post-tile-media'));
  if (dateP) tile.append(wrapNode(dateP, 'post-tile-date'));
  if (titleP) {
    if (link) link.replaceWith(...link.childNodes);
    const icon = document.createElement('i');
    icon.className = 'icon icon-chevron-circle-right';
    icon.setAttribute('aria-hidden', 'true');
    titleP.append(icon);
    tile.append(wrapNode(titleP, 'post-tile-title'));
  }
  return tile;
}

/* pager: the authored <p> is moved as is; its links and the current-page text become round items */
function buildPager(p) {
  const nav = document.createElement('div');
  nav.className = 'post-list-pager';
  nav.setAttribute('role', 'navigation');
  [...p.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && /\S/.test(n.textContent)) {
      // isolate the current page number (a moved text node, never re-typed) and wrap it
      const start = n.textContent.search(/\S/);
      const word = start > 0 ? n.splitText(start) : n;
      const end = word.textContent.search(/\s|$/);
      if (end < word.textContent.length) word.splitText(end);
      const cur = document.createElement('span');
      cur.className = 'post-list-page current';
      cur.setAttribute('aria-current', 'page');
      word.replaceWith(cur);
      cur.append(word);
    } else if (n.tagName === 'A') {
      n.classList.add('post-list-page');
      if (/^\D+$/.test(n.textContent)) n.setAttribute('rel', 'next');
    }
  });
  nav.append(p);
  return nav;
}

function isPager(row) {
  if (row.querySelector('picture, img, h1, h2, h3, h4')) return false;
  const links = [...row.querySelectorAll('a')];
  return links.length > 0 && links.every((a) => a.textContent.length <= 3);
}

function isBareCard(row) {
  return row.children.length > 1 && !!row.querySelector('a') && !isPager(row);
}

export default function decorate(block) {
  if (block.querySelector(':scope > .post-list-inner')) return;
  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'post-list-inner';
  const posts = document.createElement('div');
  posts.className = 'post-list-posts';
  inner.append(posts);

  rows.forEach((row) => {
    if (row.querySelector('picture, img') || isBareCard(row)) {
      posts.append(buildTile(row));
    } else if (isPager(row)) {
      const p = row.querySelector('p');
      if (p) posts.append(buildPager(p));
    } else {
      [...row.querySelectorAll(':scope > div > *')].forEach((n) => posts.append(n));
    }
  });

  block.replaceChildren(inner);
}
