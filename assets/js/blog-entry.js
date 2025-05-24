// File: assets/js/blog-entry.js
document.addEventListener('DOMContentLoaded', ()=> {
  // 1) Lottie animación reloj→corazón
  lottie.loadAnimation({
    container: document.getElementById('lottie-heart-clock'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../../assets/lottie/heart-clock.json'
  });

  // 2) GSAP animaciones
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.epic-hero__title', {
    opacity: 1, y: 0, duration: 1.2,
    ease: 'power3.out', delay: .5
  });
  gsap.to('.epic-quote__text', {
    scrollTrigger: {
      trigger: '.epic-quote',
      start: 'top 80%'
    },
    opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.7)'
  });
  gsap.to('.epic-conclusion__text', {
    scrollTrigger: {
      trigger: '.epic-conclusion',
      start: 'top 80%'
    },
    opacity: 1, duration: 1
  });

  // 3) Quiz colaborativo (demo con localStorage)
  const form = document.getElementById('quiz-form');
  const cloud = document.getElementById('word-cloud');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = document.getElementById('quiz-input').value.trim();
    if(!val) return;
    const span = document.createElement('span');
    span.textContent = val;
    span.classList.add('word-cloud__word');
    cloud.append(span);
    form.reset();
  });

  // 4) Conexión de constelaciones al hover
  // Aquí podrías inicializar un canvas/SVG que dibuje líneas al mover el ratón.
});

