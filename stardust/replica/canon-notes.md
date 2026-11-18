# Canon notes (index archetype → later archetypes)

Files: `stardust/prototypes/canon.css` (shared, gated), `canon.js` (chrome behaviour), `index.css` (home only). Load order: canon.css, then your `<slug>.css`; `<script src="canon.js">` at the end of body. Assets: `prototypes/assets/{img,fonts}`.

## Modules in canon.css (`/* == module: <name> == */`)
- tokens: `--c-*`, `--font-body` (Arial), `--font-ui` (Arial, sans-serif), `--font-display` (frutigerbold, Arial), `--bg-texture`
- fonts: FA5 Free Solid 900 + `wprmenu` icon font (rehosted) · base: universal border-box (lifted from bootstrap 3), body 300 14px/1.42857, `p` 16px/0 0 10px, h1–h3, `.u-blue`, `.u-br-xs`, `.u-br-sm-up`; html padding-top 42px below 768
- layout: `.wrap` (bootstrap container: 750/970/949/1110/1310 at 768/992/995/1200/1400), `.site-wide` (90%, max 1600, z 99)
- buttons: `.btn` + `--blue|--black|--white` (skewX -10, inner `<a>`/`<button>` un-skews; 40px, 12/18 padding)
- header: `header.site-header` > `.aux-nav` (`.aux-nav__list`), `.site-header__top` > `.site-wide.site-header__row` > `.site-header__logo` | `nav.site-nav` | `.site-header__cta`, then `.site-header__scrim` (rgba 0,0,0,.5). Home variant `.site-header--home` + `.hero-band` live in index.css; inner pages need their own variant (header-contract.json was recorded on /about/).
- header-nav: `.site-nav__list > li(.has-sub) > a` + `.site-nav__sub` (hover/focus-within dropdown) · header-cta-menu: `.cta-menu > .cta-menu__item > a` + `.cta-menu__sub` (click → `.is-open`)
- mobile-menu (outside `<header>`, after the footer): `.mobile-menu` > `__overlay`, `__bar` (`__toggle` > `__box` > `__lines`, `__title`), `nav.__panel` > `ul.__list` (`li.has-sub` + `button.mobile-menu__expand`); body `.is-menu-open`
- call-mobile: `a.call-mobile` (black REQUEST INFO tab <768) · fab-rep: `a.fab-rep > span.fab-rep__text` (`.active` past 115px scroll)
- page-section: `section.page-section` > `.wrap.page-section__wrap` (40px pad, centered) > `.intro` (8-col offset-2 column); h2 margin 20/15
- feature-row: `.feature-row-wrap > section.feature-row.feature-row--img-right|--img-left > .wrap.feature-row__wrap > __spacer(--lead) / __media(--xs|--sm-up) / __text`, `img.feature-row__img`
- partners: `section.page-section.partners > .wrap.page-section__wrap.partners__wrap > .partners__head + .partners__slider > .partners__list > .partners__track > .partners__slide(--clone,--lead)`; 3 lead clones + 10 + 10 trailing clones (CSS marquee)
- bands: `.band-pair > section.band.band--insights#insights-section` (`.band__inner`, `.band__posts > a.post-tile` with `__date`, `__title`) + `section.band.band--contact#footer-form-section` (`form.contact-form`, `__field`, `.recaptcha-slot`, `p.btn.btn--black.contact-form__submit`, `.contact-form__disclaimer`). Place between `</main>` and `<footer>` (outside the content root, as on live).
- footer: `footer.site-footer > .wrap.site-footer__wrap > __brand (__logo, __social) | __nav > ul.footer-menu | __legal > p.footer-copy`
- modal: `div.modal#contact-popup[hidden] > .modal__dialog > .modal__body > button.modal__close[data-dismiss] + .modal__inner` · icons: `.icon.icon--chevron-circle-right|--times`

## Content root / instruments
- `--main "#interior-content"`: live `div#interior-content`; prototype `<main id="interior-content">`. Bands + footer sit outside it on both sides.
- Consent/dismiss: built-in candidates were enough — Didomi handled, the timed popup closed via `[data-dismiss]`. No `--consent`/`--dismiss` needed.
- Header crop band: 1440 `--y 0 --height 855` (95vh hero at 900 vh); 360 `--height 492` (42px fixed bar + 450px header). Footer 325px (1440) / 339px (360).

## Live-site quirks
- Live renders the Google reCAPTCHA v2 checkbox (304×78) in the contact band; the build leaves `.recaptcha-slot` empty (residual: about 10% of that band at 360). It belongs to dynamic-features D2.
- The partners marquee position is random per capture (permanent residual, ≤3.6% band). The 'frutigerbold' face 404s on live, so both sides render Arial.
- Both of the live `ul#nav` lists (aux strip + main nav) are hidden below 768px. The footer menu is also hidden below 768px. Do not declare it as a units.json family, because it errors at 360.
- At 360, live keeps a two-line wrapped skewed button's line box at 40px. canon sets `.feature-row__text .btn { vertical-align: top }` to match; add the same in your own file if one of your buttons wraps.
- motion-observe skips dismissing timed modals on localhost. To observe the build, preset `document.cookie="firstViewRequest=false"` in a temporary copy of the page, or the popup blocks every hover probe.

## Gate-loop lessons
- Lifting computed styles with one `measure.mjs --json` live run at 1440+360 (≈120 selectors, then `--all-matches` for repeats) got 1440 to 0.81% / Δ0 on round 1.
- Bootstrap floats were rebuilt as `display: flow-root` blocks plus % widths. The margins come out the same, except where the source relies on collapse through a non-BFC wrapper (insights post at <768).
