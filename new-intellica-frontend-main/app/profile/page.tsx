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


export default function Profile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId"); // get userId from query params
  const [user, setUser] = useState<User | null>(null);


  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/user/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error(err));
    }
  }, [userId]);

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8 text-center">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Your Profile</h2>
        <div className="space-y-4 text-black">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Degree:</strong> {user.education_level || "-"}</p>
          <p><strong>Specialization:</strong> {user.specialization || "-"}</p>
          <p><strong>Learning Type:</strong> {user.learning_style || "-"}</p>
          <p><strong>Budget:</strong> {user.budget ? `$${user.budget}` : "-"}</p>
        </div>

        {/* Buttons */}
        <Button
          className="mt-6 w-full bg-orange-500 text-white hover:bg-maroon hover:text-cream transition-colors"
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </Button>
        <Button
          className="mt-2 w-full bg-red-600 text-white hover:bg-red-700"
          onClick={() => router.push("/")}
        >
          Logout
        </Button>
      </div>

      {/* Courses Section */}
      <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <h3 className="text-xl font-semibold text-maroon mb-4">Your Courses</h3>

        {/* Completed Courses */}
        <div>
          <h4 className="text-lg font-semibold text-orange-700 mb-2">Completed Courses</h4>
          <ul className="list-none space-y-2 text-black">
            {user.completedCourses?.length
              ? user.completedCourses.map((course: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {course}
                  </li>
                ))
              : <li>No completed courses yet</li>}
          </ul>
        </div>

        {/* In-Progress Courses */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-orange-700 mb-2">In-Progress Courses</h4>
          <div className="space-y-4">
            {user.inProgressCourses?.length
              ? user.inProgressCourses.map((course: string, idx: number) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-black">{course}</span>
                    <Button className="bg-orange-500 text-white hover:bg-maroon flex items-center">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))
              : <div>No courses in progress</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
