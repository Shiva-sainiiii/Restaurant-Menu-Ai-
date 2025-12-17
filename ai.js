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