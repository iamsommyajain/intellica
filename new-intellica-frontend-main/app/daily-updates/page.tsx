"use client";

import { useRouter } from "next/navigation";

export default function DailyUpdates() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cream via-orange-50 to-cream">
      <h1 className="text-2xl font-bold text-maroon mb-6">Daily Updates</h1>

      <div className="flex flex-col gap-6">
        {/* Problem of the Day Button */}
        <button
          onClick={() => router.push("/problem-of-the-day")}
          className="relative px-8 py-4 text-lg font-semibold text-white bg-maroon shadow-lg transition-transform hover:scale-105"
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
          }}
        >
          🧩 Problem of the Day
        </button>

        {/* Latest News Button */}
        <button
          onClick={() => router.push("/latest-news")}
          className="relative px-8 py-4 text-lg font-semibold text-white bg-orange-500 shadow-lg transition-transform hover:scale-105"
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
          }}
        >
          📰 Latest News
        </button>
      </div>
    </div>
  );
}
