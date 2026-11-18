/**
 * video-grid — YouTube players in a two-up grid (≥992px; one per row below), each with a centred
 * bold blue caption (source: .row > .col-md-6 > .embed-responsive-16by9 iframe + p).
 *
 * Authoring (one row per video, one cell): p > a — the embed / watch / youtu.be URL (embed
 * passthrough, stardust/dynamic-features.md row 19; the link becomes the player), then the caption
 * paragraph.
 * Decode tier: reconstructive (one item per row).
 * @ew-exempt video link — the URL becomes the iframe src (media-as-url, no authored text shown)
 */
const YT = /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i;

function embedUrl(href) {
  try {
    const u = new URL(href);
    if (u.pathname.startsWith('/embed/')) return href;
    const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : href;
  } catch (e) {
    return href;
  }
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'video-grid-item';
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    const link = [...cell.querySelectorAll('a')].find((a) => YT.test(a.href));
    if (!link) return;
    const holder = link.closest('p') || link;
    const embed = document.createElement('div');
    embed.className = 'video-grid-embed';
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl(link.href);
    iframe.title = 'YouTube video player';
    iframe.loading = 'lazy';
    iframe.setAttribute('allowfullscreen', '');
    embed.append(iframe);
    holder.replaceWith(embed);
    cell.querySelectorAll('p').forEach((p) => p.classList.add('video-grid-caption'));
  });
}
