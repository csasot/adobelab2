/**
 * band-pair — the shared bottom bands (canon.css · bands): grey "Insights" band with the
 * latest post tiles + blue "Contact Omya" band with the contact form. Variant `solo`: one
 * band alone, full width (canon · band-solo): the contact band, or the Insights band when the
 * block holds post tiles only (contact page: it carries its own form).
 *
 * Authoring rows, in order (each heading opens a band; the LAST heading opens the contact band):
 *   Insights band:  h2 · one row per post tile: picture | date <p> | <p><a href=post>title</a></p>
 *                   · CTA p > strong > a ("Read Our Blog", black button)
 *   Contact band:   h2 · submit CTA p > strong > a ("Contact Us") · disclaimer <p>
 * Decode tier: template-slotted bands; tiles reconstructive (repeat group, one per image row).
 * Tiles are card-as-link: the title link's href moves to the tile anchor and the inner anchor is
 * unwrapped (EW6). The form fields are generated (no authored text).
 * @ew-exempt all form controls — generated inputs/placeholders, no authored text
 */

function buildField(def) {
  const el = document.createElement(def.area ? 'textarea' : 'input');
  if (!def.area) el.type = 'text';
  el.name = def.name;
  el.placeholder = def.placeholder;
  el.setAttribute('aria-label', def.placeholder);
  el.required = true;
  el.className = def.className;
  return el;
}

/* form behaviour (validation, interim capture, reCAPTCHA test key) lives in /scripts/forms.js */
async function wire(form, slot) {
  try {
    const base = (window.hlx && window.hlx.codeBasePath) || '';
    const forms = await import(`${base}/scripts/forms.js`);
    forms.wireForm(form, 'contact-footer');
    forms.mountRecaptcha(slot);
  } catch (e) {
    // form stays a plain (unsubmittable) form; nothing is sent anywhere
  }
}

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
    const title = wrapNode(titleP, 'post-tile-title');
    const icon = document.createElement('i');
    icon.className = 'icon icon-chevron-circle-right';
    icon.setAttribute('aria-hidden', 'true');
    titleP.append(icon);
    tile.append(title);
  }
  return tile;
}

function buildInsights(group) {
  const band = document.createElement('section');
  band.className = 'band band-insights';
  band.id = 'insights-section';
  const inner = document.createElement('div');
  inner.className = 'band-inner';
  const posts = document.createElement('div');
  posts.className = 'band-posts';
  group.forEach((row) => {
    if (row.querySelector('picture, img')) {
      posts.append(buildTile(row));
      if (!posts.parentElement) inner.append(posts);
      return;
    }
    [...row.querySelectorAll(':scope > div > *')].forEach((n) => {
      inner.append(/^H[1-6]$/.test(n.tagName) ? wrapNode(n, 'band-title') : n);
    });
  });
  posts.dataset.count = posts.children.length;
  band.append(inner);
  return band;
}

function buildContact(group) {
  const band = document.createElement('section');
  band.className = 'band band-contact';
  band.id = 'footer-form-section';
  const inner = document.createElement('div');
  inner.className = 'band-inner';
  const nodes = group.flatMap((row) => [...row.querySelectorAll(':scope > div > *')]);
  const heading = nodes.find((n) => /^H[1-6]$/.test(n.tagName));
  const submit = nodes.find((n) => n !== heading && n.querySelector('a'));
  const rest = nodes.filter((n) => n !== heading && n !== submit);
  if (heading) inner.append(wrapNode(heading, 'band-title'));

  const form = document.createElement('form');
  form.className = 'contact-form';
  form.id = 'contact-footer';
  form.name = 'contact-footer';
  const cls = 'contact-form-field';
  form.append(
    buildField({ name: 'thename', placeholder: 'Name', className: cls }),
    buildField({ name: 'company', placeholder: 'Company', className: cls }),
    buildField({ name: 'email', placeholder: 'Email', className: cls }),
    buildField({
      name: 'message',
      placeholder: 'What product(s) are you interested in?',
      area: true,
      className: `${cls} contact-form-field-area`,
    }),
  );
  const slot = document.createElement('div');
  slot.className = 'recaptcha-slot';
  form.append(slot);
  if (submit) {
    const box = wrapNode(submit, 'contact-form-submit');
    submit.querySelector('a')?.addEventListener('click', (e) => {
      e.preventDefault();
      form.requestSubmit();
    });
    form.append(box);
  }
  const disclaimer = document.createElement('div');
  disclaimer.className = 'contact-form-disclaimer';
  disclaimer.append(...rest);
  if (rest.length) form.append(disclaimer);
  inner.append(form);
  band.append(inner);
  wire(form, slot);
  return band;
}

export default function decorate(block) {
  const rows = [...block.children];
  const groups = [];
  rows.forEach((row) => {
    if (row.querySelector('h1, h2, h3, h4') || !groups.length) groups.push([]);
    groups[groups.length - 1].push(row);
  });
  const solo = block.classList.contains('solo') || groups.length < 2;
  const tilesOnly = groups.length === 1 && rows.some((r) => r.querySelector('picture, img'));
  if (solo && tilesOnly) {
    block.classList.add('solo');
    block.replaceChildren(buildInsights(groups[0]));
    return;
  }
  const contactGroup = groups.pop() || [];
  const bands = [];
  if (!solo) bands.push(buildInsights(groups.flat()));
  else if (groups.length) contactGroup.unshift(...groups.flat());
  bands.push(buildContact(contactGroup));
  if (solo) block.classList.add('solo');
  block.replaceChildren(...bands);
}
