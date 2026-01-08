import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/recommend", async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const response = await axios.get(
      "http://127.0.0.1:8000/api/recommend",
      {
        params: { topic }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("ML Service Error:", error.message);
    res.status(503).json({ error: "ML service unavailable" });
  }
});

export default router;
