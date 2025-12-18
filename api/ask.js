// api/ask.js

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  // Basic validation
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Prompt length protection (anti-spam)
  if (prompt.length > 300) {
    return res.status(400).json({
      error: "Prompt too long"
    });
  }

  /* =========================
     FOOD-ONLY FILTER
  ========================= */

  const forbidden = [
    "code", "coding", "programming",
    "politics", "movie", "film",
    "relationship", "love",
    "hacking", "hack",
    "math", "physics"
  ];

  const words = prompt.toLowerCase().split(/\s+/);

  if (forbidden.some(word => words.includes(word))) {
    return res.status(200).json({
      choices: [{
        message: {
          content: "🍽️ I can help only with food & diet related questions."
        }
      }]
    });
  }

  /* =========================
     MODEL SELECTION
  ========================= */

  const models = [
    "mistralai/devstral-2512:free",          // PRIMARY (BEST)
    "meta-llama/llama-3.1-8b-instruct:free"  // BACKUP
  ];

  const model = models[0];

  try {
    /* =========================
       OPENROUTER API CALL
    ========================= */

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: `
You are a FOOD & DIET AI assistant for a restaurant app.

STRICT RULES:
- Answer ONLY food, meals, diet plans, nutrition, calories & budget meals
- If question is unrelated, reply:
  "🍽️ I can help only with food & diet related questions."

Allowed:
- Indian meals
- Diet plans
- Weight loss food
- Gym diet
- Healthy snacks
- Kids & festival food

Never break these rules.
`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 220
        })
      }
    );

    // Handle OpenRouter errors
    if (!response.ok) {
      console.error("OpenRouter Error:", response.status);
      return res.status(200).json({
        choices: [{
          message: {
            content: "⚠️ AI is busy right now. Please try again shortly."
          }
        }]
      });
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(200).json({
        choices: [{
          message: {
            content: "⚠️ No response from AI."
          }
        }]
      });
    }

    // Send response to frontend
    return res.status(200).json(data);

  } catch (err) {
    console.error("AI request error:", err);
    return res.status(500).json({
      error: "AI request failed"
    });
  }
    }
