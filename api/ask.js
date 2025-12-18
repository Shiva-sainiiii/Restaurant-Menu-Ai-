// api/ask.js

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }
    //filter 
    const forbidden = ["code", "politics", "movie", "relationship", "hacking"];

if(forbidden.some(word => prompt.toLowerCase().includes(word))){
  return res.status(200).json({
    choices:[{message:{content:"🍽️ I can help only with food & diet related questions."}}]
  });
}
  
  try {
    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/devstral-2512:free",
        messages: [
          {
  role: "system",
  content: `
You are a FOOD & DIET AI assistant for a restaurant app.

RULES (STRICT):
- Answer ONLY food, meals, diet plans, nutrition, calories, price-based meals
- If user asks anything unrelated (coding, politics, math, personal advice):
  reply politely: "🍽️ I can help only with food & diet related questions."

Allowed examples:
- Meal suggestions
- Indian diet plans
- Weight loss food
- Budget meals
- Healthy snacks
- Gym diet
- Kids food
- Festival food

Never break these rules.
`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(200).json({ choices: [{ message: { content: "⚠️ No response from AI." } }] });
    }

    // Send AI response to frontend
    res.status(200).json(data);

  } catch (err) {
    console.error("AI request error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
          }
