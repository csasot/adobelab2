/* canon.js — the minimal chrome behaviour observed on the source (lifted from
   cmds_theme_child/js/scripts.js + wp-responsive-menu). No frameworks.
   - FIND A REP fab: `.active` once scrollY > 115 (source: #stickyquote.active — same class name)
   - Customer Resources CTA: click toggles its sub-list (source: slideToggle)
   - Mobile menu: hamburger toggles the left panel + body push; ▾ expands a sub-list
   - Newsletter popup: shown 6 s after load unless the firstViewRequest cookie is set */
(function () {
  var fab = document.querySelector('.fab-rep');
  function onScroll() {
    if (fab) fab.classList.toggle('active', window.scrollY > 115);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.cta-menu__item').forEach(function (item) {
    var link = item.querySelector(':scope > a');
    if (!item.querySelector('.cta-menu__sub') || !link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var open = item.classList.toggle('is-open');
      link.setAttribute('aria-expanded', String(open));
    });
  });

  var toggle = document.querySelector('.mobile-menu__toggle');
  var overlay = document.querySelector('.mobile-menu__overlay');
  function setMenu(open) {
    document.body.classList.toggle('is-menu-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('is-menu-open'));
    });
  }
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  document.querySelectorAll('.mobile-menu__expand').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  var popup = document.getElementById('contact-popup');
  function closePopup() {
    if (!popup) return;
    popup.classList.remove('is-in');
    setTimeout(function () { popup.hidden = true; }, 300);
  }
  if (popup) {
    popup.querySelectorAll('[data-dismiss="modal"]').forEach(function (b) { b.addEventListener('click', closePopup); });
    popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !popup.hidden) closePopup(); });
    if (document.cookie.indexOf('firstViewRequest') === -1) {
      setTimeout(function () {
        popup.hidden = false;
        requestAnimationFrame(function () { popup.classList.add('is-in'); });
        document.cookie = 'firstViewRequest=false;path=/';
      }, 6000);
    }
  }
}());
