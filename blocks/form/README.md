# form

Custom **form** block. Purpose: Page-content form with split field rows, reCAPTCHA slot, centred skewed submit and disclaimer.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per form line; each cell is one field whose text is its label (2-3 cells = split row); a cell with a list is a select; textarea/email/tel/file inferred from labels.

## Supported variations

| Variation | Option class |
| --- | --- |
| No captcha | `no-captcha` |
| Submission blocked | `blocked` |
| Payment | `payment` |
| Tight | `tight` |

## Universal Editor fields

N/A (Document Authoring project)
