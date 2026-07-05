// Products hover drawer: opens on hover, closes 140ms after mouse-leave
// (grace period so the cursor can travel into the drawer).
(function () {
  var wrap = document.querySelector('.nav-products');
  if (!wrap) return;
  var closeTimer = null;

  wrap.addEventListener('mouseenter', function () {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    wrap.classList.add('is-open');
  });

  wrap.addEventListener('mouseleave', function () {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      wrap.classList.remove('is-open');
    }, 140);
  });

  // Touch fallback: first tap opens the drawer, tap elsewhere closes it.
  wrap.querySelector('.nav-link').addEventListener('touchend', function (e) {
    if (!wrap.classList.contains('is-open')) {
      e.preventDefault();
      wrap.classList.add('is-open');
    }
  });
  document.addEventListener('touchend', function (e) {
    if (!wrap.contains(e.target)) wrap.classList.remove('is-open');
  });
})();
