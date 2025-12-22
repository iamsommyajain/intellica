"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Quiz() {
  const [userId, setUserId] = useState(""); // Store User ID
  const [quizStarted, setQuizStarted] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Start Quiz when user submits their User ID
  const startQuiz = async () => {
    setMessage("");
    if (!userId) {
      setMessage("❌ Please enter your User ID.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/quiz/start_quiz/", {  // ✅ Correct API path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestion(data.question);
        setQuestionNumber(data.question_number);
        setQuizStarted(true);
      } else {
        setMessage(data.error || "❌ Failed to start quiz.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };

  // ✅ Submit answer and fetch next question
  const submitAnswer = async () => {
    setMessage("");
    if (!selectedAnswer) {
      setMessage("❌ Please select an answer.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/quiz/answer_question/", {  // ✅ Correct API path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,  // ✅ Ensure user_id is sent correctly
          answer: selectedAnswer,  // ✅ Ensure answer is sent correctly
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.message === "Quiz completed!") {
          setScore(data.final_score);
          setTotalQuestions(data.total_questions);
          setQuizCompleted(true);
        } else {
          setQuestion(data.question);
          setQuestionNumber(data.question_number);
          setSelectedAnswer(""); // ✅ Reset selection for next question
        }
      } else {
        setMessage(data.error || "❌ Error submitting answer.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">Aptitude Test</h1>

      {/* ✅ Enter User ID Before Starting Quiz */}
      {!quizStarted && !quizCompleted && (
        <div className="bg-white/90 p-8 rounded-lg shadow-lg">
          <Label className="text-black">Enter Your User ID</Label>
          <Input
            id="user_id"
            placeholder="Enter User ID"
            className="caret-black text-black placeholder-black mb-4"
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button onClick={startQuiz} className="w-full bg-orange-500 text-white hover:bg-maroon" disabled={loading}>
            {loading ? "Starting..." : "Start Quiz"}
          </Button>
          {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </div>
      )}

      {/* ✅ Display Quiz Questions */}
      {quizStarted && !quizCompleted && (
        <div className="bg-white/90 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">
            Question {questionNumber} of {totalQuestions}
          </h2>
          <p className="text-lg mb-4 text-red-600 font-semibold">{question}</p>

          <div className="space-y-4">
            {["A", "B", "C", "D"].map((option) => (
              <Button
                key={option}
                className={`w-full text-left justify-start ${
                  selectedAnswer === option ? "bg-maroon text-white" : ""
                }`}
                variant="outline"
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={submitAnswer} className="bg-orange-500 text-white hover:bg-maroon" disabled={loading}>
              {loading ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </div>
      )}

      {/* ✅ Show Final Quiz Results */}
      {quizCompleted && (
        <div className="bg-white/90 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-green-700">🎉 Quiz Completed!</h2>
          <p className="text-lg mt-4">Your Final Score: {score} / {totalQuestions}</p>
          <p className="text-lg mt-2">Correct Percentage: {(score / totalQuestions) * 100}%</p>
        </div>
      )}
    </div>
  );
}
