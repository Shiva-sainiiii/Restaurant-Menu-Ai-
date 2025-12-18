/* =========================
   AI CHAT FRONTEND
========================= */

// Elements
const aiChatBox = document.getElementById("ai-chat");
const aiInput = document.getElementById("aiPrompt");
const askBtn = document.getElementById("askAI");

/* =========================
   BASIC MESSAGE (USER / SYSTEM)
========================= */

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `ai-msg ${type}`;
  msg.textContent = text;
  aiChatBox.appendChild(msg);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

/* =========================
   AI STREAMING MESSAGE
========================= */

function addBotMessageStream(text) {
  const msg = document.createElement("div");
  msg.className = "ai-msg ai-bot";
  aiChatBox.appendChild(msg);

  let i = 0;
  const words = text.split(" ");

  const interval = setInterval(() => {
    msg.textContent += words[i] + " ";
    aiChatBox.scrollTop = aiChatBox.scrollHeight;
    i++;
    if (i >= words.length) clearInterval(interval);
  }, 40);
}

/* =========================
   TYPING INDICATOR
========================= */

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "ai-msg ai-bot typing-dots";
  typing.id = "typing";
  typing.textContent = "AI is typing";
  aiChatBox.appendChild(typing);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

/* =========================
   ASK AI
========================= */

async function askAI(prompt) {
  try {
    showTyping();

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    removeTyping();

    if (!data.choices || !data.choices[0]) {
      addBotMessageStream("⚠️ No response from AI. Try again.");
      return;
    }

    addBotMessageStream(data.choices[0].message.content);

  } catch (err) {
    removeTyping();
    addBotMessageStream("❌ Error connecting to AI.");
    console.error(err);
  }
}

/* =========================
   EVENTS
========================= */

// Send button
askBtn.addEventListener("click", () => {
  const text = aiInput.value.trim();
  if (!text) return;

  addMessage(text, "ai-user"); // instant user msg
  aiInput.value = "";
  askAI(text);
});

// Enter key
aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    askBtn.click();
  }
});

/* =========================
   WELCOME MESSAGE
========================= */

addBotMessageStream(
  "👋 Hi! I’m your AI food assistant.\n\nYou can ask me:\n• Suggest a spicy meal 🌶️\n• Best food under 200₹ 💰\n• Quick snacks ⏱️\n• Healthy diet options 🥗"
);
