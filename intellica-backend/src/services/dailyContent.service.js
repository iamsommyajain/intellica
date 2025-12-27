import { groqChat } from "../utils/groqClient.js";

export const generateDailyContent = async (interest) => {
  const prompt = `
You are an educational AI assistant.

Interest area: "${interest}"

Generate:

1. ONE "Problem of the Day" (challenging but approachable)
2. ONE short hint (no solution)
3. THREE recent-style news summaries related to the interest

Respond ONLY in valid JSON:

{
  "problem_of_the_day": {
    "problem": "...",
    "hint": "..."
  },
  "news_articles": [
    {
      "title": "...",
      "summary": "...",
      "source": "...",
      "url": "https://..."
    }
  ]
}
`;

  const raw = await groqChat([
    { role: "system", content: "Return only JSON. No explanations." },
    { role: "user", content: prompt },
  ]);

  return safeParseJSON(raw);
};

/* ---------- Helpers ---------- */

const safeParseJSON = (text) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("No JSON block found");
    }
    return JSON.parse(text.slice(start, end + 1));
  } catch (err) {
    console.error("LLM JSON parse failure:", text);
    throw new Error("Invalid LLM output");
  }
};
