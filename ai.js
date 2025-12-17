/* =========================
   AI CHAT FRONTEND
========================= */

// Elements
const aiChatBox = document.getElementById("ai-chat");
const aiInput = document.getElementById("aiPrompt");
const askBtn = document.getElementById("askAI");

/* =========================
   UTIL FUNCTIONS
========================= */

// Add a message to the chat box
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `ai-msg ${type}`;
  msg.textContent = text;
  aiChatBox.appendChild(msg);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

// Show typing indicator
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "ai-msg ai-bot";
  typing.id = "typing";
  typing.textContent = "AI is typing...";
  aiChatBox.appendChild(typing);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

// Remove typing indicator
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    removeTyping();

    if (!data.choices || !data.choices[0]) {
      addMessage("⚠️ No response from AI. Try again.", "ai-bot");
      return;
    }

    addMessage(data.choices[0].message.content, "ai-bot");
  } catch (err) {
    removeTyping();
    addMessage("❌ Error connecting to AI.", "ai-bot");
    console.error(err);
  }
}

/* =========================
   EVENTS
========================= */

// Click on ask button
askBtn.addEventListener("click", () => {
  const text = aiInput.value.trim();
  if (!text) return;

  addMessage(text, "ai-user");
  aiInput.value = "";
  askAI(text);
});

// Press Enter to send message
aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    askBtn.click();
  }
});

/* =========================
   DEFAULT WELCOME MESSAGE
========================= */
addMessage(
  "👋 Hi! I’m your AI food assistant. Ask me things like:\n• Suggest a spicy meal\n• Best food under 200₹\n• Quick snacks\n• Healthy options",
  "ai-bot"
);
