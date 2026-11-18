/* contact-rep-locator.js — rep-map behaviour observed on the source (Draw Attention, event-click):
   - hover a state: fill fades to blue (CSS, 300 ms) and a tooltip with the state name follows
     the pointer, left of it on the right half of the map, right of it on the left half;
   - click a state: it stays highlighted and its rep card(s) replace the intro in the blue panel
     (500 ms fade-in); clicking the active state again restores the intro; other clicks do nothing.
   Keyboard: Enter / Space on a focused state acts as a click. */
(function () {
  var map = document.querySelector('.rep-map');
  if (!map) return;
  var panel = map.querySelector('.rep-map__panel');
  var intro = map.querySelector('.rep-map__intro');
  var layer = map.querySelector('.rep-map__layer');
  var tip = map.querySelector('.rep-map__tip');
  var areas = map.querySelectorAll('.rep-map__area');
  var active = null;

  function show(el) {
    Array.prototype.forEach.call(panel.children, function (c) {
      var on = c === el;
      c.hidden = !on;
      c.classList.toggle('is-in', on && c !== intro);
    });
  }

  function select(area) {
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
    show(document.getElementById(area.getAttribute('aria-controls')));
  }

  function moveTip(e, area) {
    var box = layer.getBoundingClientRect();
    var x = e.clientX - box.left;
    var y = e.clientY - box.top;
    tip.textContent = area.getAttribute('aria-label');
    tip.hidden = false;
    var left = x > box.width / 2;
    tip.className = 'rep-map__tip rep-map__tip--' + (left ? 'left' : 'right');
    var w = tip.offsetWidth;
    var h = tip.offsetHeight;
    tip.style.transform = 'translate(' + Math.round(left ? x - w - 6 : x + 6) + 'px,' + Math.round(y - h / 2) + 'px)';
  }

  Array.prototype.forEach.call(areas, function (area) {
    area.addEventListener('click', function () { select(area); });
    area.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(area); }
    });
    area.addEventListener('mouseenter', function (e) { moveTip(e, area); });
    area.addEventListener('mousemove', function (e) { moveTip(e, area); });
    area.addEventListener('mouseleave', function () { tip.hidden = true; });
  });
}());
