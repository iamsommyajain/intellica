"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  /* SEND LOGIN OTP */
  const handleSendOTP = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "User not found");
        return;
      }

      setUserId(data.user_id);
      setOtpSent(true);
      setTimer(120);
      setMessage("OTP sent to your email");

    } catch (err) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* VERIFY OTP */
  const handleVerifyOTP = async () => {
    if (!otp || !userId) {
      setMessage("OTP verification failed");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/user/verify_otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid OTP");
        return;
      }

      setMessage("🎉 Login successful!");
      setTimeout(() => {
        router.push(`/profile?userId=${data.userId}`);
      }, 800);

    } catch (err) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* OTP TIMER */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-maroon text-center py-4">
        Login to INTELLICA
      </h1>

      <form className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-black">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your registered email"
            className="caret-black text-black placeholder-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || otpSent}
          />
        </div>

        <Button
          type="button"
          onClick={handleSendOTP}
          className="bg-orange-500 text-white hover:bg-maroon w-full"
          disabled={loading || (otpSent && timer > 0)}
        >
          {otpSent
            ? timer > 0
              ? `Resend OTP in ${timer}s`
              : "Resend OTP"
            : "Send OTP"}
        </Button>

        {otpSent && (
          <div>
            <Label htmlFor="otp" className="text-black">
              Enter OTP
            </Label>
            <Input
              id="otp"
              placeholder="Enter OTP"
              className="caret-black text-black placeholder-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />

            <Button
              type="button"
              onClick={handleVerifyOTP}
              className="mt-4 bg-orange-500 text-white hover:bg-maroon w-full"
              disabled={loading}
            >
              Verify OTP
            </Button>
          </div>
        )}

        {message && (
          <p className="text-center mt-4 text-red-500">{message}</p>
        )}

        <div className="text-center mt-4">
          <p className="text-black">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-orange-600 font-semibold hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
