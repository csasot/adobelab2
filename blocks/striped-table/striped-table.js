/**
 * striped-table — a data table in an article body (source: bootstrap 3 table.table.table-striped,
 * no header row, top-aligned left text, 1px row rules, odd rows tinted). Distinct from `table`
 * (the bordered, centred, header-row table of /privacy-policy).
 *
 * Authoring: one block row per table row, one cell per column (no header row).
 * Decode tier: reconstructive (rows and cells kept in order; cell nodes are moved, not cloned).
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  [...block.children].forEach((row) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell) => {
      const td = document.createElement('td');
      td.append(...cell.childNodes);
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);
  block.replaceChildren(table);
}
