import { generateDailyContent } from "../services/dailyContent.service.js";

export const getDailyContent = async (req, res) => {
  try {
    const { interest } = req.query;

    if (!interest || !interest.trim()) {
      return res.status(400).json({ message: "Interest is required" });
    }

    const content = await generateDailyContent(interest);

    res.status(200).json(content);
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ message: "Failed to generate daily content" });
  }
};
