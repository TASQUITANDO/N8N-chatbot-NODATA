// scripts.js
function toggleChat() {
  const chatbox = document.getElementById("chatbox");
  chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
}

async function sendMessage() {
  const input = document.getElementById("usermsg");
  const msg = input.value.trim();
  if (!msg) return;

  appendToChat(msg, "user");
  input.value = "";
  appendToChat("...", "bot");

  try {
    const res = await fetch("https://abb4-2a02-9130-2ef-a5eb-4185-3c35-e508-5210.ngrok-free.app/webhook/b34494ec-97a2-4570-a977-b98930dbfbe4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "user_123", message: msg }),
    });
    const data = await res.json();
    removeLastBotMessage();
    appendToChat(data.respuesta || "⚠️ No se recibió respuesta.", "bot");
  } catch (error) {
    removeLastBotMessage();
    appendToChat("❌ Error al conectar.", "bot");
  }
}

function appendToChat(text, sender = "bot") {
  const chatlog = document.getElementById("chatlog");
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${sender === "user" ? "user-msg" : "bot-msg"}`;
  msgDiv.innerHTML = text;
  chatlog.appendChild(msgDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function removeLastBotMessage() {
  const log = document.getElementById("chatlog");
  const last = log.lastChild;
  if (last && last.classList.contains("bot-msg") && last.textContent === "...") {
    log.removeChild(last);
  }
}
