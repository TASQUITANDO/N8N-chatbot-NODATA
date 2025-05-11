const userId = 'user_' + Math.floor(Math.random()*1e6);

window.addEventListener('DOMContentLoaded', () => {
  const header      = document.querySelector('.site-header');
  const exploreBtn  = document.querySelector('.explore-toggle');
  const exploreMenu = document.querySelector('.explore-menu');
  const menuBtn     = document.querySelector('.menu-toggle');
  const navMain     = document.querySelector('.main-nav');
  const chatBtn     = document.querySelector('.chat-toggle');
  const chatbox     = document.getElementById('chatbox');

  // Scroll → fondo header
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Dropdown "Explorar"
  exploreBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = exploreMenu.classList.toggle('open');
    exploreBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => exploreMenu.classList.remove('open'));

  // Menú móvil
  menuBtn?.addEventListener('click', () => {
    const open = navMain.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  // Chat
  chatBtn?.addEventListener('click', () => {
    const active = chatbox.classList.toggle('active');
    chatBtn.setAttribute('aria-expanded', active);
  });
});

function appendToChat(text, sender='bot') {
  const log = document.getElementById('chatlog');
  const div = document.createElement('div');
  div.className = `chat-message ${sender}-msg`;
  div.innerHTML = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('usermsg');
  const msg   = input.value.trim(); if(!msg) return;
  appendToChat(msg,'user'); input.value=''; appendToChat('...','bot');
  try {
    const res = await fetch('TU_ENDPOINT/webhook', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ user_id: userId, message: msg })
    });
    const data = await res.json();
    appendToChat(data.respuesta || '⚠️ Sin respuesta','bot');
  } catch(err) {
    appendToChat('❌ Error de conexión','bot');
    console.error(err);
  }
}
