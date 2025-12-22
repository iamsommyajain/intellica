"use client";

import { useState } from "react";

export default function ForumDiscussion() {
  const [message, setMessage] = useState("");  // State for text input
  const [buttonText, setButtonText] = useState("Post");

  const handlePostClick = () => {
    if (!message.trim()) return; // Prevent posting empty messages

    setButtonText("Posted ✅"); // Change text to "Posted"
    setMessage(""); // Clear the textarea

    setTimeout(() => {
      setButtonText("Post"); // Reset back to "Post" after 2 seconds
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Info Block */}
      <div className="bg-orange-100 p-4 rounded-lg shadow-md mb-6">
        <p className="text-maroon font-semibold">
          Here you can chat with other users, discuss your doubts, and collaborate on learning topics.
        </p>
      </div>

      {/* Discussion Input Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-maroon mb-4">Start a Discussion</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 caret-black text-black"
          placeholder="Type your message..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          onClick={handlePostClick}
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-maroon transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
