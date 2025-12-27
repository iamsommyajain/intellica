import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function callGroqModel(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const body = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
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

app.post("/learning/generate_learning_path", async (req, res) => {
  console.log("💡 POST request received at /learning/generate_learning_path");
  console.log("Request body:", req.body);

  const { goal } = req.body;
  if (!goal) return res.status(400).json({ detail: "Learning goal is required" });

  try {
    const prompt = `Generate a step-by-step learning path for this goal: "${goal}"`;
    const result = await callGroqModel(prompt);

    const learningPath = result
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.json({ learning_path: learningPath });
  } catch (error) {
    console.error("❌ AI generation failed:", error);
    res.status(500).json({ detail: "AI generation failed." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
