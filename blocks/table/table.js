/**
 * table — tabular data inside a text column (/privacy-policy cookie table and definitions;
 * bootstrap .table.table-bordered + child.css · .table-privacy-policy).
 *
 * Authoring: one row per table row, one cell per column; the FIRST row is the header row.
 * Variants:
 *   (default)    — bordered table, header row in <thead>, centred cells (the source's look);
 *                  scrolls sideways below 768px (.table-responsive)
 *   row-headers  — the first cell of every body row is a row header (<th scope="row">)
 *   definitions  — no header row: each row is term | definition, laid out as a 2/12 + 10/12
 *                  grid >= 768 and stacked below (the source's col-sm-2 / col-sm-10 pairs)
 * Decode tier: reconstructive (one row per authored row; cell nodes moved, never cloned).
 */

function moveCell(cell, tag, scope) {
  const el = document.createElement(tag);
  if (scope) el.scope = scope;
  // a cell holding a single <p> keeps the <p> (EW: authored node), bare text is moved as is
  el.append(...cell.childNodes);
  return el;
}

function decorateDefinitions(block, rows) {
  const list = document.createElement('div');
  list.className = 'table-definitions';
  rows.forEach((row) => {
    const [term, def] = [...row.children];
    if (term) {
      term.className = 'table-term';
      list.append(term);
    }
    if (def) {
      def.className = 'table-definition';
      list.append(def);
    }
  });
  block.replaceChildren(list);
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;
  if (block.classList.contains('definitions')) {
    decorateDefinitions(block, rows);
    return;
  }
  const rowHeaders = block.classList.contains('row-headers');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  rows.forEach((row, r) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell, c) => {
      if (r === 0) tr.append(moveCell(cell, 'th', 'col'));
      else if (rowHeaders && c === 0) tr.append(moveCell(cell, 'th', 'row'));
      else tr.append(moveCell(cell, 'td'));
    });
    (r === 0 ? thead : tbody).append(tr);
  });
  table.append(thead, tbody);
  const scroller = document.createElement('div');
  scroller.className = 'table-responsive';
  scroller.append(table);
  block.replaceChildren(scroller);
}
