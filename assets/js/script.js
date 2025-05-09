// Genera un ID de usuario único para la sesión
const userId = 'user_' + Math.floor(Math.random() * 1e6);

document.addEventListener('DOMContentLoaded', () => {
  // — Chat widget toggle —
  const chatToggle = document.querySelector('.chat-toggle');
  const chatbox    = document.getElementById('chatbox');
  let chatVisible  = false;

  chatToggle?.addEventListener('click', () => {
    chatVisible = !chatVisible;
    chatbox.classList.toggle('active', chatVisible);
  });

  // — Menú hamburguesa móvil —
  const menuToggle = document.querySelector('.menu-toggle');
  const navMain    = document.querySelector('.nav-main');

  menuToggle?.addEventListener('click', () => {
    const open = navMain.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
});

// — Cambia fondo del header al hacer scroll —
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});


// — Funciones del chat —

function appendToChat(text, sender = 'bot') {
  const chatlog = document.getElementById('chatlog');
  const msgDiv  = document.createElement('div');
  msgDiv.className = `chat-message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
  msgDiv.innerHTML = text;
  chatlog.appendChild(msgDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
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
  const msg   = input.value.trim();
  if (!msg) return;

  // Usuario → chat
  appendToChat(msg, 'user');
  input.value = '';

  // Placeholder de espera
  appendToChat('...', 'bot');

  try {
    const res = await fetch(
      'https://abb4-2a02-9130-2ef-a5eb-4185-3c35-e508-5210.ngrok-free.app/webhook/b34494ec-97a2-4570-a977-b98930dbfbe4',
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

