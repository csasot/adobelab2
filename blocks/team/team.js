/**
 * team — staff grid with a contact dialog per member (/about/our-team; child.css · .team-member,
 * .modal.team). Floated tiles 6-up >= 1200, 4-up >= 992, 2-up below (the source's bootstrap
 * col-lg-2 col-md-3 col-xs-6 floats — a shorter photo snags the next row as on the source).
 *
 * Authoring: one row per member, two cells — photo | h2 name, h3 job title, contact paragraphs
 * (<strong>Phone:</strong> …, <strong>Email:</strong> <a href="mailto:…">). Cells in any order.
 * The tile shows photo, name and title; activating it opens a dialog with the same photo, name,
 * title and the contact paragraphs (Escape, backdrop or × close).
 * Decode tier: reconstructive (one tile per authored row, nodes classified by role).
 * EW: the authored photo/name/title stay in the tile and the contact paragraphs are moved into
 * the dialog (shown inline under .prosemirror-editor).
 * @ew-exempt derived: the dialog's photo, name and title are presentational clones of the tile's
 */

function stripInstrumentation(el) {
  [el, ...el.querySelectorAll('*')].forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  return el;
}

function clone(node, className) {
  const c = stripInstrumentation(node.cloneNode(true));
  c.classList.add('team-clone');
  if (className) c.classList.add(className);
  return c;
}

function buildMember(row, index, blockId) {
  const media = row.querySelector('picture') || row.querySelector('img');
  const heads = [...row.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  const [name, title] = heads;
  const contacts = [...row.querySelectorAll(':scope > div > *')]
    .filter((n) => !heads.includes(n) && n !== media && !(media && n.contains(media)));

  const id = `${blockId}-member-${index + 1}`;
  const tile = document.createElement('div');
  tile.className = 'team-member';

  const link = document.createElement('a');
  link.className = 'team-bg';
  link.href = `#${id}`;
  link.setAttribute('role', 'button');
  link.setAttribute('aria-haspopup', 'dialog');
  const photo = media && (media.closest('p') || media);
  if (photo) {
    photo.classList.add('team-photo');
    link.append(photo);
  }
  if (name) link.append(name);
  if (title) link.append(title);
  tile.append(link);

  const dialog = document.createElement('dialog');
  dialog.className = 'team-modal';
  dialog.id = id;
  if (name) dialog.setAttribute('aria-label', name.textContent.trim());

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'team-close';
  close.setAttribute('aria-label', 'Close');

  const side = document.createElement('div');
  side.className = 'team-modal-photo';
  if (photo) side.append(clone(photo));

  const info = document.createElement('div');
  info.className = 'team-modal-info';
  if (name) info.append(clone(name));
  if (title) info.append(clone(title));
  const list = document.createElement('div');
  list.className = 'team-contacts';
  contacts.forEach((c) => c.classList.add('team-contact'));
  list.append(...contacts);
  info.append(list);

  const body = document.createElement('div');
  body.className = 'team-modal-body';
  body.append(close, side, info);
  dialog.append(body);
  tile.append(dialog);

  const open = (e) => {
    e.preventDefault();
    if (document.body.classList.contains('prosemirror-editor')) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  const shut = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };
  link.addEventListener('click', open);
  close.addEventListener('click', shut);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) shut();
  });
  return tile;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')]
    .filter((row) => !row.classList.contains('team-member'));
  if (!rows.length) return;
  const all = [...document.querySelectorAll('.team')];
  const blockId = `team-${all.indexOf(block) + 1}`;
  const grid = document.createElement('div');
  grid.className = 'team-grid';
  grid.append(...rows.map((row, i) => buildMember(row, i, blockId)));
  block.replaceChildren(grid);
}
