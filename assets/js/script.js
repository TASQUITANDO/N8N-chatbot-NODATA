const userId = 'user_' + Math.floor(Math.random() * 1e6);

window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const exploreBtn = document.querySelector('.explore-toggle');
  const exploreMenu = document.querySelector('.explore-menu');
  const menuBtn = document.querySelector('.menu-toggle');
  const navMain = document.querySelector('.main-nav');
  const chatBtn = document.querySelector('.chat-toggle');
  const chatbox = document.getElementById('chatbox');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');


// Botón "Explorar"
const exploreBtn = document.querySelector('.explore-toggle');
const exploreMenu = document.querySelector('.explore-menu');

// Evento para abrir/cerrar el desplegable
exploreBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = exploreMenu.classList.toggle('open');
  exploreBtn.setAttribute('aria-expanded', open);
});

// Cerrar el desplegable al hacer clic fuera de él
document.addEventListener('click', (e) => {
  if (!exploreMenu.contains(e.target)) {
    exploreMenu.classList.remove('open');
    exploreBtn.setAttribute('aria-expanded', false);
  }
});
  
  // Scroll → fondo header con efecto de transición suave
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Dropdown "Explorar" con accesibilidad mejorada
  exploreBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = exploreMenu.classList.toggle('open');
    exploreBtn.setAttribute('aria-expanded', open);
    if (open) {
      exploreMenu.focus(); // Mejora la navegación por teclado
    }
  });

  document.addEventListener('click', (e) => {
    if (!exploreMenu.contains(e.target)) {
      exploreMenu.classList.remove('open');
      exploreBtn.setAttribute('aria-expanded', false);
    }
  });

  // Menú móvil con overlay y animación
  menuBtn?.addEventListener('click', () => {
    const open = navMain.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    mobileOverlay.style.display = open ? 'block' : 'none'; // Muestra/oculta el overlay
    document.body.style.overflow = open ? 'hidden' : ''; // Bloquea/desbloquea scroll
  });

  mobileOverlay?.addEventListener('click', () => {
    navMain.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
    mobileOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Chat con funcionalidad mejorada
  chatBtn?.addEventListener('click', () => {
    const active = chatbox.classList.toggle('active');
    chatBtn.setAttribute('aria-expanded', active);
    if (!active) {
      document.getElementById('usermsg')?.focus(); // Enfoca el input al abrir el chat
    }
  });

  // Cerrar chat al hacer clic fuera del contenedor
  document.addEventListener('click', (e) => {
    if (!chatbox.contains(e.target) && !chatBtn.contains(e.target)) {
      chatbox.classList.remove('active');
      chatBtn.setAttribute('aria-expanded', false);
    }
  });
});

function appendToChat(text, sender = 'bot') {
  const log = document.getElementById('chatlog');
  const div = document.createElement('div');
  div.className = `chat-message ${sender}-msg`;
  div.innerHTML = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('usermsg');
  const msg = input.value.trim();
  if (!msg) return;

  appendToChat(msg, 'user');
  input.value = '';
  appendToChat('...', 'bot'); // Indicador de carga

  try {
    const res = await fetch('TU_ENDPOINT/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message: msg }),
    });

    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    // Retraso simulado para mejorar la experiencia de usuario
    setTimeout(() => {
      appendToChat(data.respuesta || '⚠️ Sin respuesta', 'bot');
    }, 500);
  } catch (err) {
    appendToChat('❌ Error de conexión', 'bot');
    console.error(err);
  }
}
