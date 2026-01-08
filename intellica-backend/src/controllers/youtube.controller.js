import { fetchTranscript } from "../services/transcript.service.js";
import { summarizeWithGroq } from "../services/summarizer.service.js";
import { sendSummaryEmail } from "../services/email.service.js";


export const youtubeSummaryController = async (req, res) => {
  try {
    const {
      youtube_url,
      language_code = "en",
      send_email,
      user_email,
    } = req.query;

    console.log("YouTube summary endpoint hit");
    console.log("URL:", req.query.youtube_url);

    if (!youtube_url) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    // 1. Fetch transcript (STRICT)
    const transcript = await fetchTranscript(youtube_url);

    if (!transcript) {
      return res.status(404).json({
        error: "Transcript not available for this video",
      });
    }

    // 2. Summarize using GROQ
    const summary = await summarizeWithGroq(
      transcript,
      language_code
    );

    // 3. Optional email
    let email_status;
    if (send_email === "true" && user_email) {
      await sendSummaryEmail(user_email, summary, youtube_url);
      email_status = "Summary sent to email successfully";
    }

    res.json({
      language: language_code,
      summary,
      video_url: youtube_url,
      email_status,
    });
  } catch (error) {
    console.error("YouTube summary error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
