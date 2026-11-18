/**
 * rep-locator — US state map with click-to-show sales reps (contact-rep-locator.css · rep-map;
 * source: Draw Attention hotspot map, event "click"). The map image and every rep are authored;
 * the 50 clickable state outlines are a code asset of the block (REGIONS below).
 *
 * Authoring rows:
 *   intro row — the row with a heading: map image (any cell) + h2 title + intro paragraph(s).
 *               The panel shows the title and paragraphs until a state is clicked.
 *   rep rows  — one row per representative, cells in this order:
 *               photo | name, phone (tel: link), email (mailto: link) paragraphs | states list
 *               Each list item is a state name, optionally followed by a note in brackets that
 *               shows above the name for that state only: "California (Bay Area, ...)".
 *               A state lists its reps in row order.
 * Behaviour: hover / focus fills the state blue and a tooltip with its name follows the pointer;
 * click (Enter / Space) shows that state's rep cards in the blue panel; clicking the active state
 * again restores the intro.
 * EW: each rep's authored nodes are MOVED into its first card (with the states list, shown in
 * edit mode only); the same rep under later states is a presentational clone.
 * @ew-exempt derived: per-state region titles and bracketed role notes come from the states list
 * Decode tier: intro template-slotted; reps reconstructive (one item per row).
 */
const SVG_NS = 'http://www.w3.org/2000/svg';

// The 50 clickable state outlines (source: Draw Attention hotspots traced over the authored map
// image, coordinates in the 1024 x 746 viewBox). Keys are the state names authors type.
const VIEWBOX = '0 0 1024 746';

const REGIONS = [
  ['Alabama', 'M672 498L674 458L673 446L717 443L724 472L738 503L735 514L737 531L690 535L687 540L691 544L693 551L688 554L688 550L685 544L681 545L680 549L677 551L674 548z'],
  ['Alaska', 'M250 669L248 614L248 607L250 602L249 596L245 594L243 591L232 592L229 589L225 589L222 587L219 583L212 583L212 580L209 577L206 582L201 581L190 585L187 589L183 591L177 590L180 596L181 603L185 608L186 615L183 616L175 611L177 607L173 607L170 610L165 610L166 619L168 623L183 623L183 628L181 633L178 635L171 637L165 634L164 637L157 642L158 647L161 649L158 653L159 659L164 660L166 657L169 661L169 665L166 668L166 672L170 670L176 670L175 675L180 673L185 675L183 680L173 690L163 694L158 693L149 698L142 698L146 700L166 695L171 696L198 679L195 675L209 662L214 660L219 662L218 666L213 665L208 675L212 676L214 671L222 671L226 673L222 668L223 665L227 664L230 668L238 673L252 675L258 672L258 678L267 685L273 687L270 691L274 694L274 697L278 699L279 697L283 703L284 700L287 709L292 712L290 708L293 707L299 711L299 703L291 699L282 685L274 677L264 682L258 672L252 672z'],
  ['Arizona', 'M199 375L285 390L268 515L225 511L219 504L191 493L166 473L172 467L171 461L167 460L170 452L171 457L171 453L172 452L171 455L178 440L182 438L184 435L177 418L181 413L181 392L188 397L194 396L195 389z'],
  ['Arkansas', 'M555 483L554 448L551 418L587 418L629 415L632 418L625 427L638 427L637 431L632 437L633 443L630 450L627 452L624 463L617 471L619 474L614 480L613 484L617 488L615 495L563 495L561 483z'],
  ['California', 'M175 424L173 415L100 306L117 239L51 221L47 239L37 252L42 276L42 280L37 290L46 303L48 316L52 320L49 333L50 337L52 337L56 341L59 348L53 353L58 371L71 393L68 403L86 411L94 422L99 422L102 429L100 432L108 434L120 452L122 467L135 464L148 464L154 465L159 469L167 468L170 464L164 461L165 455L173 442L180 434z'],
  ['Colorado', 'M301 299L395 310L418 311L412 400L288 387z'],
  ['Connecticut', 'M905 244L931 238L933 243L934 251L919 256L917 255L915 259L910 262L909 256z'],
  ['Delaware', 'M895 330L887 332L880 312L878 305L879 304L880 309L884 312L895 326z'],
  ['Florida', 'M694 544L691 539L738 534L743 540L795 536L800 541L798 541L798 543L801 537L801 530L809 531L819 550L836 572L836 580L840 590L848 600L854 632L849 648L840 653L833 639L825 637L820 628L813 626L799 606L795 593L797 580L790 567L783 566L768 550L762 549L756 551L749 559L740 560L731 553L720 548L696 550z'],
  ['Georgia', 'M721 442L760 439L761 443L769 447L777 460L785 465L792 472L803 478L803 485L816 498L813 501L813 505L809 516L809 528L799 527L797 530L799 533L799 537L796 533L745 537L740 528L740 520L737 516L741 503L727 471z'],
  ['Hawaii', 'M375 658L380 673L380 677L375 680L380 690L380 697L382 699L391 691L396 692L400 686L397 684L394 678L380 671L375 658L352 648L335 645L332 639L328 640L301 627L300 625L296 629L288 628L284 631L284 636L290 630L288 628L296 629L301 632L303 628L328 640L330 644L349 648L350 650L357 650L363 654L362 653L368 661z'],
  ['Idaho', 'M205 93L215 97L215 107L212 117L216 125L214 133L221 139L226 153L229 153L233 156L227 165L227 172L224 180L226 183L228 183L236 179L239 198L246 205L247 211L250 208L262 212L266 209L269 211L272 207L275 212L267 268L170 248L171 238L182 201L181 198L179 197L179 194L183 190L187 180L196 174L197 170L192 164L192 151L198 132z'],
  ['Illinois', 'M621 278L618 276L660 272L661 277L667 288L671 351L673 361L667 370L665 386L659 391L659 396L652 393L648 398L645 395L645 391L642 384L634 380L628 374L627 371L631 363L630 358L622 356L616 347L609 342L603 332L605 322L609 319L613 310L611 302L615 302L622 298L625 289L624 281z'],
  ['Indiana', 'M670 291L675 292L682 288L714 285L721 350L716 354L710 355L710 358L708 359L709 364L706 364L701 371L696 367L694 372L687 376L677 375L669 377L669 371L676 359L673 350L672 310z'],
  ['Iowa', 'M518 263L515 254L524 258L574 255L603 255L603 258L605 259L603 262L604 266L607 270L613 272L614 277L623 284L622 289L620 294L614 299L610 299L607 306L611 310L607 317L603 319L602 323L599 318L528 318L529 313L524 293L523 291L522 292L523 289L519 284L518 277L515 272L517 266z'],
  ['Kansas', 'M419 333L534 337L542 339L538 346L541 349L542 353L547 355L547 403L415 399z'],
  ['Kentucky', 'M745 398L707 403L669 405L667 408L649 411L649 407L651 405L648 402L652 396L659 399L662 396L661 392L668 387L667 382L670 380L676 379L677 377L684 380L691 378L692 375L696 374L697 371L701 374L707 366L711 366L712 357L718 356L720 352L725 351L723 347L727 346L735 351L741 351L746 354L753 353L756 351L763 356L763 362L768 370L772 371L774 375L769 381L764 383L764 386L759 392L747 399z'],
  ['Louisiana', 'M563 499L616 499L618 501L617 505L621 510L617 512L617 519L614 523L614 526L611 527L611 532L608 534L610 536L609 538L612 544L632 541L645 541L645 548L650 558L647 560L646 563L650 567L652 567L655 563L656 565L655 568L652 568L649 571L649 575L652 577L660 577L663 581L660 582L649 578L648 574L646 574L643 578L643 582L641 583L638 579L637 581L632 581L632 584L629 585L620 581L620 576L614 574L612 570L608 569L601 570L599 574L600 575L580 570L568 571L571 563L569 558L571 556L569 554L574 544L572 535L568 532L568 527L563 520L564 517z'],
  ['Maine', 'M932 139L937 111L940 106L946 110L956 103L963 106L972 137L978 137L982 146L987 147L991 150L989 156L985 157L978 166L975 163L969 170L966 167L962 169L962 180L959 180L946 190L943 206L938 202L927 161L930 160L935 145z'],
  ['Maryland', 'M815 323L815 317L875 304L885 334L887 335L895 332L895 337L890 350L888 362L887 363L887 353L890 345L886 339L877 338L877 331L875 327L877 321L873 317L876 314L876 310L873 310L867 318L867 327L872 340L864 340L860 336L863 330L862 326L853 323L851 320L841 313L831 315L830 317L824 318L823 320L820 319L815 324z'],
  ['Massachusetts', 'M905 240L905 227L926 223L937 219L942 214L944 217L942 222L943 227L948 228L954 237L949 239L947 244L942 238L942 236L940 236L940 234L919 237z'],
  ['Michigan', 'M736 279L728 279L717 283L715 282L686 284L690 263L683 245L682 234L685 220L687 219L687 213L691 212L693 216L699 214L698 205L705 202L705 199L701 196L705 192L709 195L726 199L729 203L727 205L731 210L731 221L728 222L727 227L721 231L720 234L720 237L725 242L731 237L736 228L741 226L744 229L744 236L750 250L744 260L745 262L740 274z'],
  ['Minnesota', 'M506 129L536 129L537 121L541 121L542 132L549 135L552 138L560 139L564 138L565 135L569 138L576 139L579 142L584 140L585 145L595 148L601 145L611 148L615 147L619 150L603 159L596 169L591 173L587 174L582 179L582 188L580 195L574 200L573 205L577 211L575 225L587 232L592 239L602 247L603 252L575 252L527 255L523 255L518 252L516 244L518 217L517 211L511 207L514 202L512 166L506 151z'],
  ['Mississippi', 'M631 453L633 451L654 450L670 447L671 450L669 498L673 552L657 552L652 557L651 552L647 549L648 539L630 539L622 541L613 541L612 539L616 524L621 519L621 514L624 511L620 504L620 496L618 496L620 494L620 491L615 482L618 478L621 479L621 471L628 463L628 458z'],
  ['Missouri', 'M533 328L530 322L596 321L601 325L601 335L607 344L613 348L620 359L624 358L628 361L624 367L624 373L627 378L640 387L642 392L641 395L648 405L646 407L648 408L641 416L639 424L630 425L636 418L632 413L627 412L595 415L551 415L551 354L546 352L541 346L546 342L544 336L536 334z'],
  ['Montana', 'M277 200L277 207L272 205L268 207L265 206L262 208L250 206L247 201L242 198L237 175L228 180L227 175L230 171L229 167L235 157L234 153L229 150L225 140L218 132L219 124L214 117L218 107L219 98L246 103L307 109L327 115L354 119L375 118L399 121L391 212L334 207L278 199z'],
  ['Nebraska', 'M419 330L421 308L386 306L390 262L444 264L459 267L480 267L485 269L486 271L501 270L510 274L512 277L517 279L517 285L520 289L519 292L522 294L522 299L524 302L528 327L533 334z'],
  ['Nevada', 'M178 405L178 411L176 414L104 304L121 240L215 261L191 391L189 393L180 389L177 394L178 398z'],
  ['New Hampshire', 'M919 167L918 166L921 162L936 203L939 205L942 211L936 216L917 221L915 211L917 189L915 186L918 186L922 181L920 169z'],
  ['New Mexico', 'M276 519L270 516L288 390L394 403L386 514L316 507L316 514L303 510L288 509L283 519z'],
  ['Wyoming', 'M324 300L267 290L280 202L334 210L391 215L383 306z'],
  ['New Jersey', 'M883 272L887 266L901 269L899 283L903 281L904 282L905 298L897 316L895 311L886 308L884 303L896 291L893 287L887 284L888 282L885 282L884 274z'],
  ['New York', 'M889 175L889 182L893 189L891 197L899 212L903 227L903 245L907 262L905 265L907 270L911 268L921 267L928 261L932 261L927 267L904 276L903 267L889 263L882 258L878 252L873 250L828 259L799 263L814 244L809 236L809 233L823 230L828 230L831 232L835 229L839 230L845 226L849 221L853 221L854 219L852 213L852 206L848 206L866 183L870 181L876 181z'],
  ['North Carolina', 'M889 378L900 393L902 402L901 405L898 406L892 414L887 413L888 408L892 407L899 398L900 393L899 391L896 390L896 398L890 404L888 405L884 402L881 403L882 407L886 409L883 416L888 416L890 419L888 421L878 423L873 427L864 442L854 446L833 430L809 432L806 427L799 425L772 432L761 437L742 437L743 434L747 432L747 429L750 425L755 425L758 421L765 419L767 417L766 415L776 408L780 408L784 402L787 402L788 396L838 389L862 382L881 380z'],
  ['North Dakota', 'M453 195L396 190L402 121L434 127L447 126L480 129L503 129L503 148L509 163L511 196z'],
  ['Ohio', 'M727 343L723 343L717 285L738 281L744 285L749 286L750 288L756 286L758 287L785 271L791 294L791 298L788 299L788 320L781 328L776 331L776 335L774 338L771 339L771 344L768 351L765 354L757 348L745 351L741 349L736 349L730 344z'],
  ['Oklahoma', 'M464 466L450 459L452 414L397 411L398 402L469 406L547 406L551 451L551 480L540 475L535 477L532 475L530 477L523 477L520 479L516 479L512 475L511 478L507 475L503 477L501 474L497 477L493 474L489 476L486 470L483 471L480 469L477 471L475 469L465 468z'],
  ['Oregon', 'M167 244L167 247L109 234L50 217L48 214L50 210L50 197L58 192L60 189L61 181L68 169L70 158L77 149L81 134L84 131L86 131L89 128L91 131L94 132L97 137L97 146L101 149L118 150L122 154L132 153L137 155L147 155L148 153L189 160L191 166L195 171L194 173L188 175L177 192L176 199L180 200L175 213L168 242z'],
  ['Pennsylvania', 'M861 304L797 318L788 270L796 263L797 267L808 266L817 263L872 253L877 254L880 260L886 263L880 272L882 276L881 282L892 290L887 296L881 300z'],
  ['Rhode Island', 'M936 250L936 243L934 238L937 236L937 238L940 239L944 245L938 248z'],
  ['South Carolina', 'M790 466L785 461L779 458L773 447L763 441L764 439L790 429L801 428L805 430L807 435L831 433L852 448L845 458L844 466L838 469L838 472L832 477L828 483L823 483L822 490L815 495L811 488L806 485L806 479L804 476L800 475z'],
  ['South Dakota', 'M465 264L446 261L413 261L390 258L396 194L449 198L511 199L509 207L516 218L513 237L515 252L512 254L514 258L513 261L515 262L515 264L512 272L501 267L487 268L481 264L475 263z'],
  ['Tennessee', 'M642 425L642 422L644 421L644 416L646 414L669 411L670 407L701 406L744 401L752 402L765 398L780 397L785 395L781 405L773 407L773 409L772 408L767 411L763 416L757 418L754 422L750 422L747 427L744 427L745 430L741 432L740 437L633 448L636 444L635 437L639 434z'],
  ['Texas', 'M318 515L319 512L388 517L397 414L450 418L447 460L448 462L462 468L464 471L474 472L477 475L480 472L484 473L486 477L491 479L493 477L497 480L500 478L501 481L503 481L504 479L507 478L508 480L512 480L515 482L522 482L523 480L530 480L532 478L538 480L538 478L540 477L548 483L556 486L559 485L561 516L560 521L566 528L566 533L569 536L569 540L572 544L567 555L568 561L564 572L553 577L528 596L501 610L496 614L494 617L495 621L491 636L494 659L471 654L463 649L460 640L456 636L457 633L454 629L449 615L439 606L436 601L434 592L421 569L394 565L390 567L380 581L381 579L380 581L373 580L357 568L352 560L349 547L344 540L341 539L341 537L335 532L332 524L326 523z'],
  ['Utah', 'M219 262L267 271L264 293L298 299L286 386L199 372z'],
  ['Vermont', 'M892 175L901 174L917 169L918 171L918 183L915 183L912 186L915 190L915 197L912 205L912 212L915 216L913 219L914 222L905 223L902 218L902 211L895 197L895 189L892 181z'],
  ['Virginia', 'M751 399L763 392L767 383L771 383L776 376L784 382L795 379L806 372L807 373L809 360L815 351L816 344L818 347L822 346L825 336L828 338L829 337L834 328L835 322L844 326L846 325L846 322L849 322L850 325L859 328L860 327L861 330L857 336L858 339L864 343L876 346L877 354L879 357L877 357L876 360L881 365L880 371L887 370L889 375L869 378L840 386L817 388L788 394L785 392L766 396z'],
  ['Washington', 'M83 124L83 122L86 121L87 118L85 113L90 110L86 105L87 99L84 86L85 78L92 84L113 91L113 87L115 85L114 93L120 97L121 95L119 91L121 89L119 84L122 82L122 77L118 71L164 84L203 92L194 137L190 147L189 157L149 150L136 151L131 149L128 151L123 151L121 148L115 146L103 147L99 145L99 136L96 130L92 129L91 125L86 125z'],
  ['West Virginia', 'M766 360L765 357L768 356L774 342L779 336L779 332L783 330L783 328L790 321L791 303L794 321L812 318L814 330L819 322L822 324L827 319L831 319L832 316L836 317L837 315L839 315L845 319L843 321L844 323L834 318L832 319L832 324L828 334L824 334L820 344L817 342L813 344L812 350L806 362L806 369L801 372L797 372L798 375L790 376L784 379L781 378L768 365L768 363z'],
  ['Wisconsin', 'M576 204L576 202L582 197L584 192L584 180L596 179L603 174L606 174L603 177L603 180L605 182L613 181L617 186L654 198L656 202L654 206L659 209L653 220L655 227L657 226L668 209L662 224L661 240L657 253L660 263L660 270L616 274L614 270L609 269L606 266L608 258L606 256L604 246L602 243L592 236L589 230L578 224L577 219L580 210L578 207z'],
];

function el(tag, className, nodes = []) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  e.append(...nodes);
  return e;
}

function norm(name) {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** Parse one rep row: the authored nodes (moved later, never rebuilt) + its states. */
function readRep(row) {
  const cells = [...row.children];
  const photo = row.querySelector('picture') || row.querySelector('img');
  const list = row.querySelector('ul, ol');
  const textCell = cells.find((c) => !c.contains(photo) && !c.contains(list)) || cells[1];
  let lines = textCell ? [...textCell.querySelectorAll('p')] : [];
  if (!lines.length && textCell && textCell.textContent.trim()) {
    // the pipeline unwraps a single paragraph: wrap the bare cell content in place
    lines = [el('p', '', [...textCell.childNodes])];
  }
  const states = list ? [...list.querySelectorAll('li')].map((li) => {
    const text = li.textContent.trim();
    const m = text.match(/^([^(]+?)\s*(\(.*\))\s*$/);
    return m ? { key: norm(m[1]), note: m[2] } : { key: norm(text), note: '' };
  }) : [];
  return {
    photo, lines, list, states, master: null,
  };
}

const INDEX_ATTRS = ['data-prose-index', 'data-image-index'];

/** The rep's first card MOVES the authored nodes; later states get presentational clones. */
function repCard(rep, note) {
  let card;
  if (!rep.master) {
    card = el('div', 'rep-card');
    if (rep.photo) card.append(el('p', 'rep-card-photo', [rep.photo]));
    rep.lines.forEach((line) => {
      const a = line.querySelector('a');
      const href = a ? a.getAttribute('href') || '' : '';
      if (href.startsWith('tel:')) line.classList.add('rep-card-phone');
      else if (href.startsWith('mailto:')) line.classList.add('rep-card-email');
      else if (!a) line.classList.add('rep-card-name');
      card.append(line);
    });
    if (rep.list) {
      rep.list.classList.add('rep-card-states');
      card.append(rep.list);
    }
    card.querySelectorAll('img').forEach((img) => { img.loading = 'lazy'; });
    rep.master = card;
  } else {
    card = rep.master.cloneNode(true);
    card.querySelectorAll('.rep-card-states, .rep-card-role').forEach((n) => n.remove());
    [card, ...card.querySelectorAll('*')].forEach((n) => {
      INDEX_ATTRS.forEach((attr) => n.removeAttribute(attr));
    });
  }
  if (note) {
    const role = el('p', 'rep-card-role', [note]);
    const name = card.querySelector('.rep-card-name');
    if (name) name.before(role);
    else card.prepend(role);
  }
  return card;
}

function bindMap(map) {
  const panel = map.querySelector('.rep-map-panel');
  const intro = map.querySelector('.rep-map-intro');
  const layer = map.querySelector('.rep-map-layer');
  const tip = map.querySelector('.rep-map-tip');
  let active = null;

  const show = (target) => {
    [...panel.children].forEach((c) => {
      const on = c === target;
      c.hidden = !on;
      c.classList.toggle('is-in', on && c !== intro);
    });
  };

  const select = (area) => {
    if (active) {
      active.classList.remove('is-active');
      active.setAttribute('aria-pressed', 'false');
    }
    if (area === active) {
      active = null;
      show(intro);
      return;
    }
    active = area;
    area.classList.add('is-active');
    area.setAttribute('aria-pressed', 'true');
    show(panel.querySelector(`#${area.getAttribute('aria-controls')}`));
  };

  const moveTip = (e, area) => {
    const box = layer.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    tip.textContent = area.getAttribute('aria-label');
    tip.hidden = false;
    const left = x > box.width / 2;
    tip.className = `rep-map-tip rep-map-tip-${left ? 'left' : 'right'}`;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    const tx = Math.round(left ? x - w - 6 : x + 6);
    tip.style.transform = `translate(${tx}px, ${Math.round(y - h / 2)}px)`;
  };

  map.querySelectorAll('.rep-map-area[aria-controls]').forEach((area) => {
    area.addEventListener('click', () => select(area));
    area.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(area);
      }
    });
  });
  map.querySelectorAll('.rep-map-area').forEach((area) => {
    area.addEventListener('mouseenter', (e) => moveTip(e, area));
    area.addEventListener('mousemove', (e) => moveTip(e, area));
    area.addEventListener('mouseleave', () => { tip.hidden = true; });
  });
}

export default function decorate(block) {
  if (block.querySelector('.rep-map')) return;
  const rows = [...block.children];
  const introRow = rows.find((r) => r.querySelector('h1, h2, h3, h4')) || rows[0];
  const repRows = rows.filter((r) => r !== introRow && r.querySelector('ul, ol'));

  const mapPic = introRow && (introRow.querySelector('picture') || introRow.querySelector('img'));
  const introNodes = introRow
    ? [...introRow.querySelectorAll('h1, h2, h3, h4, p')].filter((n) => !n.querySelector('img'))
    : [];
  introNodes.filter((n) => /^H\d$/.test(n.tagName)).forEach((h) => h.classList.add('rep-map-title'));
  const intro = el('div', 'rep-map-intro', introNodes);
  const title = introNodes.find((n) => /^H\d$/.test(n.tagName));

  // state key -> [{ rep, note }] in row order
  const byState = new Map();
  const reps = repRows.map(readRep);
  reps.forEach((rep) => {
    rep.states.forEach(({ key, note }) => {
      if (!byState.has(key)) byState.set(key, []);
      byState.get(key).push({ rep, note });
    });
  });

  const panel = el('div', 'rep-map-panel', [intro]);
  panel.setAttribute('aria-live', 'polite');
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'rep-map-svg');
  svg.setAttribute('viewBox', VIEWBOX);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('role', 'group');
  if (title) svg.setAttribute('aria-label', title.textContent.trim());

  REGIONS.forEach(([name, d], i) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('class', 'rep-map-area');
    path.setAttribute('d', d);
    path.setAttribute('aria-label', name);
    const stateReps = byState.get(norm(name));
    if (stateReps) {
      const id = `rep-region-${i}`;
      const region = el('div', 'rep-map-region', [
        el('h2', 'rep-map-title', [name]),
        ...stateReps.map(({ rep, note }) => repCard(rep, note)),
      ]);
      region.id = id;
      region.dataset.region = name;
      region.hidden = true;
      panel.append(region);
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-controls', id);
      path.setAttribute('aria-pressed', 'false');
    }
    svg.append(path);
  });

  const unassigned = reps.filter((rep) => !rep.master);
  if (unassigned.length) {
    const rest = el('div', 'rep-map-region', unassigned.map((rep) => repCard(rep, '')));
    rest.hidden = true;
    panel.append(rest);
  }

  const tip = el('div', 'rep-map-tip');
  tip.setAttribute('aria-hidden', 'true');
  tip.hidden = true;
  const layer = el('div', 'rep-map-layer', [svg, tip]);
  const media = el('div', 'rep-map-media', mapPic ? [mapPic, layer] : [layer]);
  if (mapPic) {
    const img = mapPic.tagName === 'IMG' ? mapPic : mapPic.querySelector('img');
    if (img) img.classList.add('rep-map-img');
  }

  const map = el('div', 'rep-map', [panel, media]);
  block.replaceChildren(el('div', 'wrap rep-locator-wrap', [el('div', 'rep-locator-inner', [map])]));
  bindMap(map);
}
