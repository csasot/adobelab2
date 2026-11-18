/**
 * contact-offices — blue offices band (contact.css · page-section--blue + contact-offices):
 * white address card(s) in a centred half column (≥992), then the office-hours note.
 *
 * Authoring rows, in order:
 *   card rows — one row per office: one paragraph, lines split by <br>
 *               (strong office name · company · street · city · tel: link · mailto: link)
 *   note row  — the LAST row when there are two or more: office hours + Rep Locator link
 * Decode tier: template-slotted (band, row, note); cards reconstructive (one per row).
 */

function wrap(tag, className, nodes) {
  const w = document.createElement(tag);
  w.className = className;
  w.append(...nodes);
  return w;
}

function cellNodes(row) {
  return [...row.children].flatMap((cell) => [...cell.children]);
}

export default function decorate(block) {
  if (block.querySelector('.contact-offices-wrap')) return;
  const rows = [...block.children];
  const noteRow = rows.length > 1 ? rows.pop() : null;

  const list = document.createElement('div');
  list.className = 'contact-offices-row';
  rows.forEach((row) => {
    const card = wrap('address', 'contact-card', [wrap('div', 'contact-card-body', cellNodes(row))]);
    list.append(wrap('div', 'contact-offices-col', [card]));
  });

  const inner = wrap('div', 'contact-offices-inner', [list]);
  if (noteRow) inner.append(wrap('div', 'contact-offices-note', cellNodes(noteRow)));
  block.replaceChildren(wrap('div', 'wrap contact-offices-wrap', [inner]));
}
