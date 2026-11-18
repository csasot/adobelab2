/**
 * video-band — blue band with a 16:9 YouTube player beside a black skewed CTA (≥980; stacked
 * below) (insights-blog.css · ib-video-band).
 *
 * Authoring (one row; cells in any order, or one flat cell):
 *   p > a[href*=youtube] — the video: an embed / watch / youtu.be URL (embed passthrough,
 *                          stardust/dynamic-features.md row 19); the link is replaced by the player
 *   p > strong > a       — CTA (a.button.primary after decorateButtons, re-skinned black)
 * Decode tier: template-slotted (query by role, never by row index).
 * @ew-exempt video link — the URL becomes the iframe src (media-as-url, no authored text shown)
 */

const YT = /(?:youtube(?:-nocookie)?\.com|youtu\.be)/i;

function embedUrl(href) {
  try {
    const u = new URL(href);
    if (u.pathname.startsWith('/embed/')) return href;
    const id = u.hostname.includes('youtu.be')
      ? u.pathname.slice(1)
      : u.searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : href;
  } catch (e) {
    return href;
  }
}

function cell(className, nodes) {
  const c = document.createElement('div');
  c.className = className;
  c.append(...nodes);
  return c;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .video-band-wrap')) return;
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  const videoP = nodes.find((n) => [...n.querySelectorAll('a')].some((a) => YT.test(a.href)));
  const rest = nodes.filter((n) => n !== videoP);

  const cells = [];
  if (videoP) {
    const link = [...videoP.querySelectorAll('a')].find((a) => YT.test(a.href));
    const embed = document.createElement('div');
    embed.className = 'video-band-embed';
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl(link.href);
    iframe.title = 'YouTube video player';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    );
    embed.append(iframe);
    cells.push(cell('video-band-cell video-band-media', [embed]));
  }
  if (rest.length) cells.push(cell('video-band-cell video-band-cta', rest));

  const row = document.createElement('div');
  row.className = 'video-band-row';
  row.append(...cells);
  const col = document.createElement('div');
  col.className = 'video-band-col';
  col.append(row);
  const wrap = document.createElement('div');
  wrap.className = 'wrap video-band-wrap';
  wrap.append(col);
  block.replaceChildren(wrap);
}
