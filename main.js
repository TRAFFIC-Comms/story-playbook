(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var frames = Array.prototype.slice.call(document.querySelectorAll('.frame'));
  var total = frames.length, cur = 0;
  var count = document.getElementById('count'), chap = document.getElementById('chap'), bar = document.getElementById('pbar');
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function setCurrent(i) {
    cur = i;
    count.textContent = pad(i + 1) + ' / ' + total;
    chap.textContent = frames[i].getAttribute('data-chap') || '';
    bar.style.setProperty('--p', ((i + 1) / total).toFixed(4));
  }
  // reveal each slide when most of it is on screen
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var i = frames.indexOf(e.target);
      if (e.isIntersecting) { e.target.classList.add('is-in'); if (e.intersectionRatio >= 0.5) setCurrent(i); }
    });
  }, { threshold: [0.25, 0.5] });
  frames.forEach(function (f) { io.observe(f); });
  frames[0].classList.add('is-in');
  setCurrent(0);
  function go(i) {
    i = Math.max(0, Math.min(total - 1, i));
    frames[i].scrollIntoView({ block: 'center' });
  }
  document.getElementById('prev').addEventListener('click', function () { go(cur - 1); });
  document.getElementById('next').addEventListener('click', function () { go(cur + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) { e.preventDefault(); go(cur + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)) { e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(total - 1); }
  });
  var fs = document.getElementById('fs');
  if (!root.requestFullscreen) { fs.hidden = true; }
  fs.addEventListener('click', function () {
    var p = document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen();
    if (p && p.catch) p.catch(function () { fs.hidden = true; });
  });
  document.addEventListener('fullscreenchange', function () {
    fs.textContent = document.fullscreenElement ? 'Exit' : 'Present';
    setTimeout(function () { go(cur); }, 120);
  });
  // open at a slide named in the link (#s12)
  var m = /^#s(\d+)$/.exec(location.hash);
  if (m) setTimeout(function () { go(parseInt(m[1], 10) - 1); }, 60);
})();
