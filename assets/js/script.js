// assets/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const header        = document.querySelector('.site-header');
  const overlay       = document.querySelector('.nav-overlay');
  const exploreToggle = document.querySelector('.explore-toggle');
  const exploreMenu   = document.getElementById('explore-menu');
  const menuToggle    = document.querySelector('.menu-toggle');
  const navMain       = document.getElementById('mobile-nav');

  let isExploreOpen = false;
  let isMobileOpen  = false;

  // 1) Scroll: cambia clase para fondo oscuro
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 200);
  });

  // 2) Toggle dropdown “Explorar”
  exploreToggle.addEventListener('click', e => {
    e.stopPropagation();
    isExploreOpen = !isExploreOpen;

    exploreToggle.setAttribute('aria-expanded', isExploreOpen);
    exploreMenu.classList.toggle('open', isExploreOpen);
    exploreMenu.setAttribute('aria-hidden', !isExploreOpen);

    // activa overlay si hay algún menú abierto
    overlay.classList.toggle('active', isExploreOpen || isMobileOpen);
  });

  // 3) Toggle menú móvil
  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    isMobileOpen = !isMobileOpen;

    menuToggle.setAttribute('aria-expanded', isMobileOpen);
    navMain.classList.toggle('open', isMobileOpen);
    navMain.setAttribute('aria-hidden', !isMobileOpen);

    // si abres móvil, cierra “Explorar”
    if (isMobileOpen && isExploreOpen) {
      isExploreOpen = false;
      exploreToggle.setAttribute('aria-expanded', false);
      exploreMenu.classList.remove('open');
      exploreMenu.setAttribute('aria-hidden', true);
    }

    overlay.classList.toggle('active', isExploreOpen || isMobileOpen);
  });

  // 4) Clic en overlay cierra todo
  overlay.addEventListener('click', () => {
    if (isExploreOpen) {
      isExploreOpen = false;
      exploreToggle.setAttribute('aria-expanded', false);
      exploreMenu.classList.remove('open');
      exploreMenu.setAttribute('aria-hidden', true);
    }
    if (isMobileOpen) {
      isMobileOpen = false;
      menuToggle.setAttribute('aria-expanded', false);
      navMain.classList.remove('open');
      navMain.setAttribute('aria-hidden', true);
    }
    overlay.classList.remove('active');
  });

  // 5) Escape cierra todo
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape' && (isExploreOpen || isMobileOpen)) {
      overlay.click();
    }
  });

  // 6) Click fuera del dropdown cierra “Explorar”
  document.addEventListener('click', e => {
    if (
      isExploreOpen &&
      !e.target.closest('.explore-container') &&
      !e.target.closest('.menu-toggle')
    ) {
      exploreToggle.click();
    }
  });
});

