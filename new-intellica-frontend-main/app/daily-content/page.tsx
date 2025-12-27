"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type DailyContentType = {
  problem_of_the_day: {
    problem: string;
    hint: string;
  };
  news_articles: {
    title: string;
    summary: string;
    url: string;
    source: string;
  }[];
};

export default function DailyContent() {
  const [interest, setInterest] = useState("");
  const [dailyContent, setDailyContent] = useState<DailyContentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDailyContent = async () => {
    if (!interest.trim()) {
      setError("Please enter an area of interest.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/daily-content?interest=${encodeURIComponent(interest)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data: DailyContentType = await response.json();
      setDailyContent(data);
    } catch {
      setError("Unable to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-maroon mb-6 text-center">
        Daily Learning Boost
      </h1>

      {/* Interest Input */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Label className="text-black font-medium">
          What are you interested in today?
        </Label>
        <Input
          className="mt-2 text-black"
          placeholder="e.g. DSA, AI, Web Development, Philosophy"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />

        <Button
          className="mt-4 bg-orange-500 hover:bg-maroon text-white w-full"
          onClick={fetchDailyContent}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Today’s Content"}
        </Button>

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Content Section */}
      {dailyContent && (
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-red-600">🧩 Problem of the Day</h2>
            <p className="text-gray-800">{dailyContent.problem_of_the_day.problem}</p>
            <p className="text-gray-500 mt-2">
              💡 Hint: {dailyContent.problem_of_the_day.hint}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-600">📰 Latest News</h2>
            <div className="space-y-4">
              {dailyContent.news_articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <h3 className="text-maroon font-semibold">{article.title}</h3>
                  <p className="text-gray-600 text-sm">{article.summary}</p>
                  <span className="text-orange-500 text-xs">
                    {article.source}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
