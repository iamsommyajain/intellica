import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/**
 * Call Groq LLaMA model via Groq API
 * @param {string} prompt
 * @returns {Promise<string>} AI-generated text
 */
async function callGroqModel(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not defined in .env");

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const body = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a highly efficient learning assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 3000,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error: ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * Clean AI output: remove code fences and parse JSON
 */
function cleanAndParseAIOutput(aiText) {
  const cleaned = aiText.replace(/```(json)?/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI output as JSON:", err);
    return null;
  }
}

/**
 * POST /learning/generate_learning_path
 * Body: { goal: string }
 */
router.post("/generate_learning_path", async (req, res) => {
  const { goal: userGoal } = req.body;
  if (!userGoal || userGoal.trim() === "") {
    return res.status(400).json({ detail: "Learning goal is required." });
  }

  try {
    const prompt = `
You are an expert learning strategist and educational coach.

The user’s goal is: "${userGoal}"

Please generate a concise and actionable learning path:

1. Provide exactly 10 steps. Keep each step short, clear, and actionable.
2. At the end, provide a list of relevant resources for the entire path.
3. Output strictly in JSON:

{
  "steps": ["Step 1: ...", "...", "Step 10: ..."],
  "resources": ["Resource 1: ...", "..."]
}
`;

    const aiText = await callGroqModel(prompt);

    const parsed = cleanAndParseAIOutput(aiText);
    if (!parsed) {
      return res.status(500).json({ detail: "Failed to parse AI response." });
    }

    // Return structured JSON directly
    res.json(parsed);

  } catch (err) {
    console.error("AI generation failed:", err);
    res.status(500).json({ detail: "AI generation failed." });
  }
});

export default router;
