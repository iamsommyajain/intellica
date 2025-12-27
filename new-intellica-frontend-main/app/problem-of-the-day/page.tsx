"use client";

import { useEffect, useState } from "react";
import { getDailyContent } from "@/lib/api";

export default function ProblemOfTheDay() {
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDailyContent("DSA");
        setProblem(data.problem_of_the_day);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!problem) return <p className="p-6">No problem available</p>;

  return (
    <div className="min-h-screen bg-cream p-8">
      <h1 className="text-3xl font-bold text-maroon mb-4">
        🧩 Problem of the Day
      </h1>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl text-red-600 font-semibold mb-2">
          {problem.problem}
        </h2>
        <p className="text-gray-600">
          Hint: {problem.hint}
        </p>
      </div>
    </div>
  );
}
