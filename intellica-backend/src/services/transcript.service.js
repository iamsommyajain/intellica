import { YoutubeTranscript } from "youtube-transcript";

export const fetchTranscript = async (youtubeUrl) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(youtubeUrl);
    return transcript.map((t) => t.text).join(" ");
  } catch (err) {
    console.error("Transcript fetch failed");
    return null;
  }
};
