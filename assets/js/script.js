// assets/js/scripts.js

// Genera un ID de usuario único para la sesión
const userId = 'user_' + Math.floor(Math.random() * 1e6);

document.addEventListener('DOMContentLoaded', () => {
  // — Chat widget toggle —
  const chatToggle = document.querySelector('.chat-toggle');
  const chatbox    = document.getElementById('chatbox');
  let chatVisible  = false;

  chatToggle?.addEventListener('click', () => {
    chatVisible = !chatVisible;
    chatToggle.setAttribute('aria-expanded', chatVisible);
    chatToggle.setAttribute('aria-controls', 'chatbox');
    if (chatbox) {
      chatbox.classList.toggle('active', chatVisible);
    }
  });

  // — Menú hamburguesa móvil + overlay —
  const menuToggle = document.querySelector('.menu-toggle');
  const navMain    = document.querySelector('.nav-main');
  const overlay    = document.querySelector('.nav-overlay');

  menuToggle?.addEventListener('click', () => {
    const open = navMain?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', !!open);
    if (overlay) {
      overlay.classList.toggle('active', open);
    }
  });

  overlay?.addEventListener('click', () => {
    // Cierra nav móvil y dropdown “Explorar”
    navMain?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', false);
    overlay.classList.remove('active');
    closeExplore();
  });

  // — Mega-dropdown “Explorar” —
  const exploreToggle = document.querySelector('.explore-toggle');
  const exploreMenu   = document.getElementById('explore-menu');

  exploreToggle?.addEventListener('click', e => {
    e.stopPropagation();
    const open = exploreMenu?.classList.toggle('open');
    exploreToggle.setAttribute('aria-expanded', !!open);

    // Enfocar primer elemento si está abierto
    if (open) {
      const firstItem = exploreMenu?.querySelector('a');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 0);
      }
    }
  });

  // Cierra “Explorar” al clicar fuera o pulsar Escape
  document.addEventListener('click', e => {
    const isInside = e.target.closest('.explore-container');
    if (!isInside) {
      closeExplore();
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      // Esc cierra todo
      navMain?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', false);
      overlay?.classList.remove('active');
      closeExplore();
    }
  });

  function closeExplore() {
    if (exploreMenu?.classList.contains('open')) {
      exploreMenu.classList.remove('open');
      exploreToggle.setAttribute('aria-expanded', false);
    }
  }

  // — Cambia fondo del header al hacer scroll —
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
});

// — Funciones del chat —
function appendToChat(text, sender = 'bot') {
  const chatlog = document.getElementById('chatlog');
  const msgDiv  = document.createElement('div');
  msgDiv.className = `chat-message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
  msgDiv.innerHTML = text;
  chatlog?.appendChild(msgDiv);
  chatlog.scrollTop = chatlog?.scrollHeight;
}

function removeLastBotMessage() {
  const log  = document.getElementById('chatlog');
  const last = log?.lastElementChild;
  if (last?.classList.contains('bot-msg') && last.textContent.trim() === '...') {
    log.removeChild(last);
  }
}

async function sendMessage() {
  const input = document.getElementById('usermsg');
  const msg   = input?.value.trim();
  if (!msg) return;

  // Usuario → chat
  appendToChat(msg, 'user');
  input.value = '';

  // Placeholder de espera
  appendToChat('...', 'bot');

  try {
    const res = await fetch(
      'https://abb4-2a02-9130-2ef-a5eb-4185-3c35-e508-5210.ngrok-free.app/webhook/b34494ec-97a2-4570-a977-b98930dbfbe4 ',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: msg })
      }
    );
    const data = await res.json();
    removeLastBotMessage();
    appendToChat(data.respuesta || '⚠️ No se recibió respuesta del asistente.', 'bot');
  } catch (error) {
    removeLastBotMessage();
    appendToChat('❌ Error al conectar con el asistente.', 'bot');
    console.error('Chat error:', error);
  }
}
