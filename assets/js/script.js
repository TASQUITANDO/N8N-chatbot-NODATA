// scripts.js
const userId = 'user_' + Math.floor(Math.random() * 1e6);

window.addEventListener('DOMContentLoaded', () => {
  const header        = document.querySelector('.site-header');
  const menuBtn       = document.querySelector('.menu-toggle');
  const mobileNav     = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const chatBtn       = document.querySelector('.chat-toggle');
  const chatbox       = document.getElementById('chatbox');

  // Efecto al hacer scroll en header
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Dropdown “Explorar” solo en desktop
  if (window.innerWidth > 768) {
    const exploreBtn  = document.querySelector('.explore-toggle');
    const exploreMenu = document.querySelector('.explore-menu');

    if (exploreBtn && exploreMenu) {
      exploreBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const open = exploreMenu.classList.toggle('open');
        exploreBtn.setAttribute('aria-expanded', open);
      });
      document.addEventListener('click', e => {
        if (
          !exploreMenu.contains(e.target) &&
          !exploreBtn.contains(e.target)
        ) {
          exploreMenu.classList.remove('open');
          exploreBtn.setAttribute('aria-expanded', false);
        }
      });
    }
  }

  // Slide-in menú móvil
  if (menuBtn && mobileNav && mobileOverlay) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      mobileOverlay.style.display = open ? 'block' : 'none';
      document.body.style.overflow  = open ? 'hidden' : '';
    });
    mobileOverlay.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      mobileOverlay.style.display = 'none';
      document.body.style.overflow  = '';
    });
  }

  // Chat toggle
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
});

// Helpers de chat
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
  } catch(err) {
    appendToChat('❌ Error de conexión', 'bot');
    console.error(err);
  }
}
