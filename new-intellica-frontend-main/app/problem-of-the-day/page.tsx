"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface ProblemData {
  problem: string;
  hint: string;
}

export default function ProblemOfTheDay() {
  const [userId, setUserId] = useState("");
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProblem = async () => {
    setMessage("");
    if (!userId) {
      setMessage("❌ Please enter a valid User ID.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/daily-content/?user_id=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      if (response.ok) {
        setProblem(data.problem_of_the_day);
      } else {
        setMessage(data.detail || "❌ Failed to fetch problem.");
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cream via-orange-50 to-cream px-6 text-center">
      <h1 className="text-2xl font-bold text-maroon">🧩 Problem of the Day</h1>
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-4">
        <Label>Enter Your User ID</Label>
        <Input value={userId} onChange={(e) => setUserId(e.target.value)} className="mb-4" />

        <Button onClick={fetchProblem} disabled={loading}>
          {loading ? "Fetching..." : "Get Today's Problem"}
        </Button>

        {message && <p className="text-red-500 mt-2">{message}</p>}

        {problem && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-maroon mb-2">📌 {problem?.problem}</h2>
            <p className="text-gray-700">{problem?.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
