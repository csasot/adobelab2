/**
 * process — "The Omya Process": blue band, numbered white circles joined by a 4px rule
 * (canon index.css · process).
 *
 * Authoring rows:
 *   heading row        — h2
 *   step rows (1..n)   — cell 1: the number; cell 2: bold label <p> + description <p>
 *   CTA row            — p > strong > a (white skewed button)
 * A step row is any row whose first cell is a bare number. Decode tier: reconstructive
 * (steps are a repeat group); everything else keeps its authored order.
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

export default function decorate(block) {
  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'process-inner';
  const steps = document.createElement('div');
  steps.className = 'process-steps';
  let stepsPlaced = false;

  rows.forEach((row) => {
    const cells = [...row.children];
    const first = cells[0];
    const isStep = cells.length > 1 && first && /^\s*\d+\s*$/.test(first.textContent);
    if (isStep) {
      const step = document.createElement('div');
      step.className = 'process-step';
      const num = document.createElement('div');
      num.className = 'process-num';
      num.append(...first.childNodes);
      const text = document.createElement('div');
      text.className = 'process-text';
      cells.slice(1).forEach((c) => text.append(...c.childNodes));
      step.append(num, text);
      steps.append(step);
      if (!stepsPlaced) {
        inner.append(steps);
        stepsPlaced = true;
      }
      return;
    }
    cells.forEach((cell) => {
      [...cell.children].forEach((node) => {
        if (/^H[1-6]$/.test(node.tagName)) inner.append(wrapNode(node, 'process-title'));
        else inner.append(node);
      });
    });
  });

  block.replaceChildren(inner);
}
