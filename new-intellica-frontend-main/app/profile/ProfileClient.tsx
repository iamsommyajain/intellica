"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  education_level?: string;
  specialization?: string;
  learning_style?: string;
  budget?: number;
  completedCourses?: string[];
  inProgressCourses?: string[];
}

export default function ProfileClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error);
  }, [userId]);

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    // ⬅️ keep your JSX exactly as-is here
    <div className="container mx-auto px-4 py-8">
      {/* existing JSX */}
    </div>
  );
}
