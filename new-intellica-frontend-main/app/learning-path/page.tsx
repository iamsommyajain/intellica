"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

interface LearningPathData {
  learning_path: string[];
}

export default function LearningPath() {
  const [goal, setGoal] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateLearningPath = async () => {
    setMessage("");
    setLearningPath(null);

    if (!goal) {
      setMessage("❌ Please enter your learning goal.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/learning/generate_learning_path/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "test-user",
          goal,
          send_email: sendEmail,
          user_email: sendEmail ? userEmail : undefined,
        }),
      });

      const data = await response.json();
      console.log("🔍 API Response:", data);

      if (response.ok) {
        setLearningPath(data);
      } else {
        console.error("❌ API Error:", data.detail || "Unknown error");
        setMessage(data.detail || "❌ Learning path generation failed.");
      }
    } catch (error) {
      console.error("❌ Server error:", error);
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">Generate Your Learning Path</h1>
      
      {/* Input for Learning Goal */}
      <Label className="text-lg font-semibold">Enter Learning Goal</Label>
      <Textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="mb-4 w-full p-2 border rounded-lg"
        placeholder="E.g. I want to become a full-stack developer with Web3 and AI integration..."
      />

      {/* Email Input (only if checkbox is checked) */}
      {sendEmail && (
        <>
          <Label className="text-lg font-semibold">Enter Your Email</Label>
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="mb-4 w-full p-2 border rounded-lg"
            placeholder="you@example.com"
          />
        </>
      )}

      {/* Generate Button */}
      <Button onClick={generateLearningPath} disabled={loading}>
        {loading ? "Generating..." : "Generate Learning Path"}
      </Button>

      {/* Error or Success Message */}
      {message && <p className="text-red-600 mt-4 font-semibold">{message}</p>}

      {/* Display Learning Path */}
      {learningPath?.learning_path && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-maroon mb-4">📚 Your Learning Path</h2>
          <ul className="list-disc pl-5 space-y-2">
            {learningPath.learning_path.map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
