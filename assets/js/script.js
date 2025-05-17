// assets/js/scripts.js

const userId = 'user_' + Math.floor(Math.random() * 1e6);

window.addEventListener('DOMContentLoaded', () => {
  /* HEADER: efecto scroll tras pasar altura del header */
  const header = document.querySelector('.site-header');
  const HEADER_HEIGHT = 120; // coincide con --header-height
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > HEADER_HEIGHT);
    });
  }

  /* TOGGLE “Explorar” */
  const exploreBtn  = document.querySelector('.explore-toggle');
  const exploreMenu = document.querySelector('.explore-menu');
  if (exploreBtn && exploreMenu) {
    exploreBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = exploreMenu.classList.toggle('open');
      exploreBtn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', e => {
      if (!exploreMenu.contains(e.target) && !exploreBtn.contains(e.target)) {
        exploreMenu.classList.remove('open');
        exploreBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  /* MÓVIL: slide-in menú */
  const menuBtn       = document.querySelector('.menu-toggle');
  const mobileNav     = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  if (menuBtn && mobileNav && mobileOverlay) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      mobileOverlay.style.display = isOpen ? 'block' : 'none';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileOverlay.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      mobileOverlay.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  /* CHAT: abrir/cerrar */
  const chatBtn = document.querySelector('.chat-toggle');
  const chatbox = document.getElementById('chatbox');
  if (chatBtn && chatbox) {
    chatBtn.addEventListener('click', () => {
      const active = chatbox.classList.toggle('active');
      chatBtn.setAttribute('aria-expanded', active);
      if (!active) document.getElementById('usermsg')?.focus();
    });
    document.addEventListener('click', e => {
      if (!chatbox.contains(e.target) && !chatBtn.contains(e.target)) {
        chatbox.classList.remove('active');
        chatBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  /* RECURSOS: filtrado de descargables */
  const filterBtns = document.querySelectorAll('.resource-filters button');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.resource-card').forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.type === filter)
            ? ''
            : 'none';
        });
      });
    });
  }

  /* CONTACTO: validación y feedback */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = form.name.value.trim();
      const email = form.email.value.trim();
      const msg   = form.message.value.trim();
      const fb    = document.getElementById('formFeedback');

      if (!name || !email || !msg) {
        fb.textContent = 'Por favor completa todos los campos.';
        fb.style.color = 'var(--accent)';
        return;
      }
      fb.textContent = '¡Mensaje enviado con éxito!';
      fb.style.color = 'var(--primary-dark)';
      // Aquí iría tu lógica real de envío (fetch/AJAX)
    });
  }
});

/* Helper para chat */
function appendToChat(text, sender = 'bot') {
  const log = document.getElementById('chatlog');
  if (!log) return;
  const div = document.createElement('div');
  div.className = `chat-message ${sender}-msg`;
  div.innerHTML = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('usermsg');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  appendToChat(msg, 'user');
  input.value = '';
  appendToChat('...', 'bot');

  try {
    const res = await fetch('TU_ENDPOINT/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message: msg })
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    setTimeout(() => {
      appendToChat(data.respuesta || '⚠️ Sin respuesta', 'bot');
    }, 500);
  } catch (err) {
    appendToChat('❌ Error de conexión', 'bot');
    console.error(err);
  }
}
