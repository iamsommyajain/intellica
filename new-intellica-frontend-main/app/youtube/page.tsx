"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Youtube } from "lucide-react";

interface SummaryData {
  language: string;
  summary: string;
  video_url: string;
  email_status?: string;
}

export default function YouTubeSummaries() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [sendEmail, setSendEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [message, setMessage] = useState("");

  const fetchYouTubeSummary = async () => {
    setMessage("");
    if (!youtubeUrl) {
      setMessage("❌ Please enter a YouTube URL.");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = new URL("https://visionx-backend.onrender.com/youtube/youtube_summary/");
      apiUrl.searchParams.append("youtube_url", youtubeUrl);
      apiUrl.searchParams.append("language_code", language);
      if (sendEmail) {
        apiUrl.searchParams.append("send_email", "true");
        apiUrl.searchParams.append("user_email", userEmail);
      }

      const response = await fetch(apiUrl.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setSummaryData(data);
      } else {
        setMessage(data.error || "❌ Failed to fetch summary.");
      }
    } catch (error) {
      console.error("❌ API Request Failed:", error);
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">YouTube Video Summaries</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Label className="block text-maroon">Enter YouTube Video URL</Label>
        <Input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="mb-4"
          placeholder="https://www.youtube.com/watch?v=example"
        />

        <Label className="block text-maroon">Select Language</Label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="kn">Kannada</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
          <option value="pa">Punjabi</option>
          <option value="gu">Gujarati</option>
          <option value="ur">Urdu</option>
        </select>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={() => setSendEmail(!sendEmail)}
            className="mr-2"
          />
          <Label>Send Summary via Email</Label>
        </div>

        {sendEmail && (
          <>
            <Label className="block text-maroon">Enter Email</Label>
            <Input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mb-4"
              placeholder="your-email@example.com"
            />
          </>
        )}

        <Button onClick={fetchYouTubeSummary} disabled={loading}>
          {loading ? "Fetching Summary..." : "Get Summary"}
        </Button>
      </div>

      {message && <p className="mt-4 text-red-600">{message}</p>}

      {summaryData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Youtube className="text-red-500 w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold text-orange-700">Summary</h2>
          </div>
          <p className="text-maroon mb-2">
            <strong>Language:</strong> {summaryData?.language}
          </p>
          <p className="text-gray-700 mb-4">{summaryData?.summary}</p>
          <a href={summaryData?.video_url} target="_blank" rel="noopener noreferrer">
            <Button>Watch Full Video</Button>
          </a>
          {summaryData?.email_status && (
            <p className="mt-4 text-green-600">{summaryData.email_status}</p>
          )}
        </div>
      )}
    </div>
  );
}
