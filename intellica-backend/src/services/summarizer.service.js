import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const summarizeWithGroq = async (text, language) => {
  const prompt = `
You are summarizing a YouTube video transcript.

Rules:
- Use ONLY the transcript
- Do NOT add external knowledge
- Be concise but complete
- Output language: ${language}

Transcript:
${text}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return completion.choices[0].message.content.trim();
};
