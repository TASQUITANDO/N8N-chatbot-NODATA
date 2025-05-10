// assets/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const header        = document.querySelector('.site-header');
  const exploreToggle = document.querySelector('.explore-toggle');
  const exploreMenu   = document.querySelector('.explore-menu');
  const menuToggle    = document.querySelector('.menu-toggle');
  const navMain       = document.querySelector('.main-nav');
  let isExploreOpen   = false;

  // scroll → header oscuro
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // dropdown Explorar
  exploreToggle.addEventListener('click', e => {
    e.stopPropagation();
    isExploreOpen = !isExploreOpen;
    exploreToggle.setAttribute('aria-expanded', isExploreOpen);
    exploreMenu.classList.toggle('open', isExploreOpen);
  });

  // click fuera cierra “Explorar”
  document.addEventListener('click', () => {
    if (isExploreOpen) {
      isExploreOpen = false;
      exploreToggle.setAttribute('aria-expanded', 'false');
      exploreMenu.classList.remove('open');
    }
  });

  // menú móvil (si lo usas)
  menuToggle.addEventListener('click', () => {
    const open = navMain.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
});

