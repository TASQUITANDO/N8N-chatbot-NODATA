// Genera un ID de usuario único para la sesión
const userId = 'user_' + Math.floor(Math.random() * 1e6);

document.addEventListener('DOMContentLoaded', () => {
  // — Chat toggle —
  const chatToggle = document.querySelector('.chat-toggle');
  const chatbox    = document.getElementById('chatbox');
  chatToggle?.addEventListener('click', () => {
    const open = chatbox.classList.toggle('active');
    chatToggle.setAttribute('aria-expanded', open);
    chatToggle.setAttribute('aria-controls', 'chatbox');
  });

  // — Menú hamburguesa móvil —
  const menuToggle = document.querySelector('.menu-toggle');
  const navMain    = document.querySelector('.main-nav');
  const overlay    = document.querySelector('.nav-overlay');

  menuToggle?.addEventListener('click', () => {
    const open = navMain.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    overlay.classList.toggle('active', open);
  });

  overlay?.addEventListener('click', () => {
    navMain.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
    overlay.classList.remove('active');
    closeExplore();
  });

  // — Dropdown “Explorar” —
  const exploreToggle = document.querySelector('.explore-toggle');
  const exploreMenu   = document.getElementById('explore-menu');

  exploreToggle?.addEventListener('click', e => {
    e.stopPropagation();
    const open = exploreMenu.classList.toggle('open');
    exploreToggle.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.explore-container')) closeExplore();
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      navMain.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
      overlay.classList.remove('active');
      closeExplore();
    }
  });

  function closeExplore() {
    if (exploreMenu.classList.contains('open')) {
      exploreMenu.classList.remove('open');
      exploreToggle.setAttribute('aria-expanded', false);
    }
  }

  // — Header background on scroll —
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
});

// — Chat helper functions —
function appendToChat(text, sender = 'bot') {
  const log    = document.getElementById('chatlog');
  const div    = document.createElement('div');
  div.className = `chat-message ${sender}-msg`;
  div.innerHTML = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
async function sendMessage() {
  const input = document.getElementById('usermsg');
  const msg   = input.value.trim();
  if (!msg) return;
  appendToChat(msg, 'user');
  input.value = '';
  appendToChat('...', 'bot');
  try {
    const res = await fetch('https://…/webhook/…', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message: msg })
    });
    const data = await res.json();
    appendToChat(data.respuesta || '⚠️ No se recibió respuesta.', 'bot');
  } catch {
    appendToChat('❌ Error al conectar.', 'bot');
  }
}
