/**
 * form — page-content form (canon.css · form): contact and the other form pages. Bootstrap-style
 * 40px square fields, split rows, reCAPTCHA v2 slot, centred skewed submit, centred disclaimer.
 *
 * Authoring rows, in order:
 *   field rows — one row per form line; each cell is one field, its text the field label
 *                (shown as the placeholder). Two or three cells = a split row (fields side by
 *                side; three = the address line city 6/12 · state 2/12 · zip 4/12, a select
 *                first in two = 4/12 · 8/12). A label matching message/comment/question/
 *                describe/"tell us" renders a textarea; email/phone labels get the email/tel
 *                names the interim capture keys on; upload/resume/attach labels render a file
 *                picker (a second paragraph = its "remove file" control).
 *                A cell holding a list is a choice: label paragraph + list = a select (the label
 *                is its placeholder option, paragraphs before the label show above it as a
 *                prompt); a list alone = one checkbox per item (the item is its label).
 *   submit row — a bold paragraph (p > strong, no link): the submit control's label ("Submit").
 *                It renders as a role=button control (EW7: no <button> hosts authored text);
 *                click / Enter / Space submit the form. A link here (p > strong > a) works too.
 *   text rows  — any other paragraph (disclaimer) follows the submit, centred.
 * Variants: `no-captcha` (the source form has no reCAPTCHA: no slot), `blocked` (regulated
 *   forms, dynamic-features D3: UI rebuilt, submission blocked with a notice, nothing captured
 *   or sent), `payment` (invoice payment shell, D4: a lone left-aligned pay control in an article
 *   column; implies blocked + no-captcha), `tight` (14px instead of 20px above the fields).
 * Decode tier: reconstructive (repeat group: one field per cell; classified by content).
 * Behaviour (validation, interim local capture, reCAPTCHA test key) lives in /scripts/forms.js
 * (dynamic-features rows 10/18); the capture key is `<page>-page` (no endpoint configured yet).
 * @ew-exempt field placeholders, select options (generated from the authored list, EW5) and
 *   the select placeholder option — mirror the authored label <p>,
 *   which stays in the cell (visually hidden) as the field's accessible name
 */

function buildField(def) {
  const el = document.createElement(def.area ? 'textarea' : 'input');
  if (!def.area) el.type = def.type || 'text';
  el.name = def.name;
  if (def.placeholder) el.placeholder = def.placeholder;
  el.className = def.className;
  return el;
}

/* behaviour lives in /scripts/forms.js (loaded at runtime, as band-pair does) */
async function wire(form, slot, name) {
  try {
    const base = (window.hlx && window.hlx.codeBasePath) || '';
    const forms = await import(`${base}/scripts/forms.js`);
    forms.wireForm(form, name);
    if (slot) forms.mountRecaptcha(slot);
  } catch (e) {
    // form stays a plain (unsubmittable) form; nothing is sent anywhere
  }
}

/* regulated forms / payment (D3, D4): submission blocked — nothing captured, nothing sent */
function blockSubmission(form, message, payment) {
  form.noValidate = true;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/contact';
    link.textContent = 'contact page';
    message.dataset.kind = 'blocked';
    message.replaceChildren(
      payment
        ? 'Online payment is not connected yet: no payment was taken. '
        : 'Online submission is not connected yet: nothing was sent. ',
      'Please reach us through the ',
      link,
      '.',
    );
  });
}

const NAMES = [
  [/^first\b/i, 'fname'],
  [/^last\b/i, 'lname'],
  [/e-?mail/i, 'email'],
  [/phone/i, 'phone'],
  [/message|comment|question|describe|tell us/i, 'message'],
];
const FILE = /upload|resume|attach/i;

let fieldCount = 0;

function slugName(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    .slice(0, 40) || 'field';
}

function fieldName(label, used) {
  const hit = NAMES.find(([re]) => re.test(label));
  let name = hit && !used.has(hit[1]) ? hit[1] : slugName(label);
  while (used.has(name)) name += '-2';
  used.add(name);
  return name;
}

function wrap(className, ...nodes) {
  const w = document.createElement('div');
  w.className = className;
  w.append(...nodes);
  return w;
}

function textOf(node) {
  return node.textContent.replace(/\s+/g, ' ').trim();
}

function labelBox(label) {
  fieldCount += 1;
  label.id = `form-label-${fieldCount}`;
  return wrap('form-label', label);
}

/* label <p> + list = select (placeholder option = label); earlier <p>s = visible prompt */
function buildSelect(cell, list, used) {
  const paras = [...cell.querySelectorAll(':scope > p')];
  const label = paras.pop();
  const box = wrap('form-cell form-cell-select');
  if (paras.length) {
    box.classList.add('form-cell-prompted');
    box.append(wrap('form-prompt', ...paras));
  }
  const text = label ? textOf(label) : '';
  const select = document.createElement('select');
  select.name = fieldName(text || 'choice', used);
  select.className = 'form-field form-select';
  const first = document.createElement('option');
  first.value = '';
  first.textContent = text;
  first.selected = true;
  first.disabled = true;
  select.append(first);
  [...list.querySelectorAll(':scope > li')].forEach((li) => {
    const opt = document.createElement('option');
    opt.value = textOf(li);
    opt.textContent = textOf(li);
    select.append(opt);
  });
  list.remove();
  if (label) {
    box.append(labelBox(label));
    select.setAttribute('aria-labelledby', label.id);
  } else select.setAttribute('aria-label', text);
  box.append(wrap('form-select-wrap', select));
  return box;
}

/* a list alone = checkboxes: each authored item is moved into its control's <label> */
function buildChecks(list, used) {
  const box = wrap('form-cell form-cell-checks');
  [...list.querySelectorAll(':scope > li')].forEach((li) => {
    const input = buildField({ type: 'checkbox', name: fieldName(textOf(li), used), className: 'form-check-input' });
    input.value = 'Yes';
    fieldCount += 1;
    input.id = `form-check-${fieldCount}`;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.className = 'form-check-label';
    label.append(...li.childNodes);
    const line = document.createElement('p');
    line.className = 'form-check';
    line.append(input, ' ', label);
    box.append(line);
  });
  list.remove();
  return box;
}

/* upload label = file picker in a bordered box; a second <p> = the "remove file" control */
function buildFile(cell, used) {
  const [label, remove] = cell.querySelectorAll(':scope > p');
  const input = buildField({ type: 'file', name: fieldName(textOf(label), used), className: 'form-file-input' });
  fieldCount += 1;
  input.id = `form-file-${fieldCount}`;
  const pick = document.createElement('label');
  pick.htmlFor = input.id;
  pick.className = 'form-file';
  label.className = 'form-file-label';
  pick.append(label, input);
  const box = wrap('form-cell form-cell-file', pick);
  if (remove) {
    remove.className = 'form-file-remove';
    remove.setAttribute('role', 'button');
    remove.tabIndex = 0;
    const clear = (e) => {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      input.value = '';
    };
    remove.addEventListener('click', clear);
    remove.addEventListener('keydown', clear);
    box.append(remove);
  }
  return box;
}

function buildCell(cell, used) {
  const list = cell.querySelector(':scope > ul, :scope > ol');
  if (list) {
    return cell.querySelector(':scope > p') ? buildSelect(cell, list, used) : buildChecks(list, used);
  }
  const label = cell.querySelector('p') || cell;
  const text = textOf(label);
  if (label !== cell && FILE.test(text)) return buildFile(cell, used);
  const name = fieldName(text, used);
  const area = /^message/.test(name);
  const field = buildField({
    name,
    placeholder: text,
    area,
    className: area ? 'form-field form-field-area' : 'form-field',
  });
  const box = wrap('form-cell');
  if (label !== cell) {
    box.append(labelBox(label));
    field.setAttribute('aria-labelledby', label.id);
  } else field.setAttribute('aria-label', text);
  box.append(field);
  return box;
}

export default function decorate(block) {
  if (block.querySelector('form')) return;
  const payment = block.classList.contains('payment');
  const blocked = payment || block.classList.contains('blocked');
  const captcha = !payment && !block.classList.contains('no-captcha');
  const slug = window.location.pathname.split('/').filter(Boolean).pop() || 'index';
  const form = document.createElement('form');
  form.className = 'form-body';
  form.id = `${slug}-form`;
  form.name = form.id;

  const message = document.createElement('p');
  message.className = 'form-message';
  message.setAttribute('role', 'status');
  form.append(message);

  const fields = document.createElement('div');
  fields.className = 'form-fields';
  const tail = [];
  const used = new Set();
  let submit;
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    // the delivery pipeline unwraps a lone <p> in a cell: re-wrap bare inline content
    cells.forEach((c) => {
      if (c.querySelector(':scope > :is(p, ul, ol, div)') || !c.textContent.trim()) return;
      const p = document.createElement('p');
      p.append(...c.childNodes);
      c.append(p);
    });
    const paras = [...row.querySelectorAll('p')];
    const bold = paras.length === 1 && paras[0].querySelector('strong')
      && !row.querySelector('ul, ol')
      && paras[0].textContent.trim() === paras[0].querySelector('strong').textContent.trim();
    if (bold && !submit) {
      [submit] = paras;
      return;
    }
    const multi = cells.some((c) => c.querySelectorAll(':scope > p').length > 1
      && !c.querySelector(':scope > ul, :scope > ol')
      && !FILE.test(textOf(c.querySelector('p'))));
    if (submit || multi) {
      tail.push(...cells.flatMap((c) => [...c.children]));
      return;
    }
    const split = cells.length > 1 ? ` form-row-split form-row-${cells.length}` : '';
    const line = wrap(`form-row${split}`);
    cells.forEach((c) => line.append(buildCell(c, used)));
    fields.append(line);
  });

  const email = fields.querySelector('input[name="email"]');
  if (email) {
    const hp = buildField({ name: 'email-confirm', placeholder: 'Email Confirm', className: 'form-hp' });
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    email.after(hp);
  }

  let slot = null;
  if (captcha) {
    slot = document.createElement('div');
    slot.className = 'recaptcha-slot form-captcha';
    fields.append(slot);
  }
  if (submit) {
    const control = wrap('form-submit', submit);
    control.setAttribute('role', 'button');
    control.tabIndex = 0;
    control.addEventListener('click', (e) => {
      e.preventDefault();
      form.requestSubmit();
    });
    control.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      form.requestSubmit();
    });
    const implicit = document.createElement('button');
    implicit.type = 'submit';
    implicit.className = 'form-implicit-submit';
    implicit.tabIndex = -1;
    implicit.setAttribute('aria-hidden', 'true');
    fields.append(wrap('form-actions', control, implicit));
  }
  if (tail.length) fields.append(wrap('form-disclaimer', ...tail));
  form.append(fields);
  block.replaceChildren(form);

  if (blocked) blockSubmission(form, message, payment);
  else wire(form, slot, `${slug}-page`);
}
