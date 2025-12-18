/* =========================
   AI CHAT FRONTEND
========================= */

// Elements
const aiChatBox = document.getElementById("ai-chat");
const aiInput = document.getElementById("aiPrompt");
const askBtn = document.getElementById("askAI");

/* =========================
   FORMAT AI TEXT → LIST
========================= */

function formatAIText(text) {
  const lines = text.split("\n").filter(l => l.trim() !== "");
  let html = "";
  let listItems = [];

  lines.forEach((line, index) => {
    const clean = line.trim();

    // Bullet / numbered points
    if (/^[-•*\d.]+\s+/.test(clean)) {
      listItems.push(
        clean.replace(/^[-•*\d.]+\s*/, "")
      );
    }
    // Ingredients / Calories type lines
    else if (clean.includes(":")) {
      html += `<p><strong>${clean.split(":")[0]}:</strong>${clean.split(":").slice(1).join(":")}</p>`;
    }
    // Heading (first line)
    else if (index === 0) {
      html += `<p><strong>${clean}</strong></p>`;
    }
    // Normal description
    else {
      html += `<p>${clean}</p>`;
    }
  });

  if (listItems.length) {
    html += `
      <ul class="ai-list">
        ${listItems.map(i => `<li>${i}</li>`).join("")}
      </ul>
    `;
  }

  return html;
}
/* =========================
   USER MESSAGE
========================= */

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `ai-msg ${type}`;
  msg.textContent = text;
  aiChatBox.appendChild(msg);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

/* =========================
   AI MESSAGE (WITH COPY)
========================= */

function addBotMessage(text) {
  const msg = document.createElement("div");
  msg.className = "ai-msg ai-bot";

  msg.innerHTML = `
    <div class="ai-content">
      ${formatAIText(text)}
      <button class="copy-btn">📋 Copy</button>
    </div>
  `;

  aiChatBox.appendChild(msg);
  aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

/* =========================
   TYPING INDICATOR
========================= */

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "ai-msg ai-bot typing-dots";
  typing.id = "typing";
  typing.textContent = "AI is typing...";
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    removeTyping();

    if (!data.choices || !data.choices[0]) {
      addBotMessage("⚠️ No response from AI. Try again.");
      return;
    }

    addBotMessage(data.choices[0].message.content);

  } catch (err) {
    removeTyping();
    addBotMessage("❌ Error connecting to AI.");
    console.error(err);
  }
}

/* =========================
   COPY BUTTON EVENT
========================= */

aiChatBox.addEventListener("click", e => {
  if (e.target.classList.contains("copy-btn")) {
    const text = e.target.parentElement.innerText
      .replace("📋 Copy", "")
      .trim();

    navigator.clipboard.writeText(text);

    e.target.textContent = "✅ Copied";
    setTimeout(() => {
      e.target.textContent = "📋 Copy";
    }, 1200);
  }
});

/* =========================
   EVENTS
========================= */

// Send button
askBtn.addEventListener("click", () => {
  const text = aiInput.value.trim();
  if (!text) return;

  addMessage(text, "ai-user");
  aiInput.value = "";
  askAI(text);
});

// Enter key
aiInput.addEventListener("keydown", e => {
  if (e.key === "Enter") askBtn.click();
});

/* =========================
   WELCOME MESSAGE
========================= */

addBotMessage(
  "👋 Hi! I’m your AI food assistant.\n\nYou can ask me:\n• Suggest a spicy meal 🌶️\n• Best food under 200₹ 💰\n• Quick snacks ⏱️\n• Healthy diet options 🥗"
);
