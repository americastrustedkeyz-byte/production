(function () {
  'use strict';

  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.atk-nav-toggle');
    if (!toggle) return;

    const menu = document.querySelector('.atk-mobile-menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  });
})();
