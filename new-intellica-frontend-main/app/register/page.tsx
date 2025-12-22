"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function Register() {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userId, setUserId] = useState(""); // Store user ID
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    degree: "",
    interest: "",
    level: "",
    learningType: "",
    budget: "",
  });

  const [otp, setOtp] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Send OTP Request to Backend
  const handleSendOTP = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          education_level: formData.degree,
          specialization: formData.interest,
          preferred_difficulty: formData.level,
          learning_style: formData.learningType,
          budget: parseFloat(formData.budget),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setUserId(data.user_id);
        setTimer(10); // Start 10-second timer
        setMessage(`OTP sent to ${formData.email}. Your User ID: ${data.user_id}`);
      } else {
        setMessage(data.error || "Error sending OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again.");
    }
    setLoading(false);
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/user/verify_otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Registration successful!");
        setRegistrationComplete(true);
      } else {
        setMessage(data.error || "Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again.");
    }
    setLoading(false);
  };

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-maroon text-center py-4">
        Register for INTELLICA
      </h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-black">Name</Label>
          <Input id="name" placeholder="Enter your full name" className="caret-black text-black placeholder-black" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email" className="text-black">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" className="caret-black text-black placeholder-black" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="degree" className="text-black">Degree</Label>
          <Input id="degree" placeholder="Enter your highest degree" className="caret-black text-black placeholder-black" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="interest" className="text-black">Interest / Specialization</Label>
          <Input id="interest" placeholder="What do you want to learn?" className="caret-black text-black placeholder-black" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="level" className="text-black">Current Level</Label>
          <Select id="level" className="text-black bg-white border border-gray-300" onChange={handleChange}>
            <option value="">Select your level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="learningType" className="text-black">Preferred Learning Type</Label>
          <Select id="learningType" className="text-black bg-white border border-gray-300" onChange={handleChange}>
            <option value="">Select learning type</option>
            <option value="text">Text-based</option>
            <option value="video">Video-based</option>
            <option value="mixed">Mixed</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="budget" className="text-black">Budget</Label>
          <Input id="budget" type="number" placeholder="Enter your budget" className="caret-black text-black placeholder-black" onChange={handleChange} />
        </div>

        {/* OTP Button & Timer */}
        <Button
          type="button"
          onClick={handleSendOTP}
          className="bg-orange-500 text-white hover:bg-maroon hover:text-cream transition-colors w-full"
          disabled={loading || (otpSent && timer > 0)}
        >
          {otpSent ? (timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP") : "Send OTP"}
        </Button>

        {otpSent && (
          <div>
            <Label htmlFor="otp" className="text-black">Enter OTP</Label>
            <Input id="otp" placeholder="Enter OTP" className="caret-black text-black placeholder-black" onChange={(e) => setOtp(e.target.value)} />
            <Button type="button" onClick={handleVerifyOTP} className="mt-4 bg-orange-500 text-white hover:bg-maroon hover:text-cream transition-colors w-full">
              Verify OTP
            </Button>
          </div>
        )}

        {message && <p className={`text-center ${registrationComplete ? "text-green-500" : "text-red-500"}`}>{message}</p>}

        {registrationComplete && (
          <div className="text-center text-green-500 mt-4">
            🎉 Registration Complete!  
            Your **User ID**: <b>{userId}</b>
          </div>
        )}
      </form>
    </div>
  );
}
