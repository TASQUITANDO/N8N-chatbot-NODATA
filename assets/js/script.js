// assets/js/scripts.js

// Genera un ID de usuario único para la sesión
const userId = 'user_' + Math.floor(Math.random() * 1e6);

// Control de visibilidad del chat + menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  // Chat toggle
  const chatToggle = document.querySelector('.chat-toggle');
  const chatbox = document.getElementById('chatbox');
  let chatVisible = false;

  chatToggle.addEventListener('click', () => {
    chatVisible = !chatVisible;
    chatbox.style.display = chatVisible ? 'flex' : 'none';
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMain = document.querySelector('.nav-main');
  if (menuToggle && navMain) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMain.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }
});

// Cambia fondo del header al hacer scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Función para añadir mensajes al chat
function appendToChat(text, sender = 'bot') {
  const chatlog = document.getElementById('chatlog');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
  msgDiv.innerHTML = text;
  chatlog.appendChild(msgDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}

// Quita el mensaje de espera "..." del bot
function removeLastBotMessage() {
  const log = document.getElementById('chatlog');
  const last = log.lastElementChild;
  if (
    last &&
    last.classList.contains('bot-msg') &&
    last.textContent.trim() === '...'
  ) {
    log.removeChild(last);
  }
}

// Envía el mensaje del usuario al backend (ngrok) y muestra la respuesta
async function sendMessage() {
  const input = document.getElementById('usermsg');
  const msg = input.value.trim();
  if (!msg) return;

  // Añade mensaje del usuario
  appendToChat(msg, 'user');
  input.value = '';

  // Placeholder de espera del bot
  appendToChat('...', 'bot');

  try {
    const res = await fetch(
      'https://abb4-2a02-9130-2ef-a5eb-4185-3c35-e508-5210.ngrok-free.app/webhook/b34494ec-97a2-4570-a977-b98930dbfbe4',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: msg }),
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
