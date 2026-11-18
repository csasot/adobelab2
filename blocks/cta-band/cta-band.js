/**
 * cta-band — full-bleed photo call-to-action band ("Do you need inspiration for your
 * formulation?"): 100px rhythm, text column on the left (canon.css · cta-band).
 *
 * Authoring (one row; cells in any order, or one flat cell):
 *   picture — the band photo (cover, centred); optional — without it the band is plain white
 *   h2      — heading; <em> marks the blue word
 *   p       — lede paragraph(s)
 *   p > strong > a — CTA (a.button.primary after decorateButtons)
 * Decode tier: template-slotted (query by role, never by row index).
 */

export default function decorate(block) {
  const media = block.querySelector('picture') || block.querySelector('img');
  const nodes = [...block.querySelectorAll(':scope > div > div > *')]
    .filter((n) => n !== media && !(media && n.contains(media)));

  const mediaBox = document.createElement('div');
  mediaBox.className = 'cta-band-media';
  if (media) mediaBox.append(media);
  else block.classList.add('no-photo');

  const content = document.createElement('div');
  content.className = 'cta-band-content';
  content.append(...nodes);

  const wrap = document.createElement('div');
  wrap.className = 'wrap cta-band-wrap';
  wrap.append(content);

  block.replaceChildren(mediaBox, wrap);
}
