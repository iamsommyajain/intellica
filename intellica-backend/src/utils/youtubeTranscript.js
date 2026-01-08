// utils/youtubeTranscript.js
import pkg from "youtube-transcript";
const { getTranscript } = pkg;


/**
 * Fetches the transcript for a given YouTube video.
 * - Prefers manually created captions
 * - Falls back gracefully if language not available
 */
export async function getYouTubeTranscript(url, lang = "en") {
  try {
    // ✅ Robust video ID extraction (supports youtu.be, shorts, embed)
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/
    );

    if (!match) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }

    const videoId = match[1];

    let transcriptArray;

    // 1️⃣ Try requested language (manual captions)
    try {
      transcriptArray = await getTranscript(videoId, {
        lang,
        country: "IN",
      });
    } catch (_) {
      transcriptArray = null;
    }

    // 2️⃣ Fallback to English if requested language unavailable
    if (!transcriptArray || transcriptArray.length === 0) {
      try {
        transcriptArray = await getTranscript(videoId, {
          lang: "en",
          country: "IN",
        });
      } catch (_) {
        transcriptArray = null;
      }
    }

    if (!transcriptArray || transcriptArray.length === 0) {
      console.error("Transcript not available for video:", videoId);
      return null;
    }

    // 3️⃣ Normalize transcript text
    const transcriptText = transcriptArray
      .map(t => t.text.trim())
      .join(" ")
      .replace(/\s+/g, " ");

    return transcriptText;

  } catch (err) {
    console.error("Error fetching transcript:", err.message);
    return null;
  }
}
