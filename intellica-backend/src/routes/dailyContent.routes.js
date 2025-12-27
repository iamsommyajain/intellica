import express from "express";
import { groqChat } from "../utils/groqClient.js";

const router = express.Router();

console.log("dailyContent routes loaded");


router.get("/", async (req, res) => {
  const { interest } = req.query;

  if (!interest) {
    return res.status(400).json({ message: "Interest is required" });
  }

  try {
    const prompt = `
You must respond with VALID JSON ONLY.
Do not include explanations, markdown, or text outside JSON.

Schema (strict):

{
  "problem_of_the_day": {
    "problem": string,
    "hint": string
  },
  "news_articles": [
    {
      "title": string,
      "summary": string,
      "source": string
    }
  ]
}

Interest: "${interest}"
`;



    const responseText = await groqChat([
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ]);

    console.log("GET /daily-content hit with interest:", interest);


    // Parse LLM JSON safely
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}");
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);

    res.json(parsed);
  } catch (error) {
    console.error("Daily Content Error:", error.message);
    res.status(500).json({ message: "Failed to generate daily content" });
  }
});

export default router;
