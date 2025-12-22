"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select } from "../../components/ui/select";
import { Star } from "lucide-react";

// ✅ Define Course Type
type Course = {
  title: string;
  platform: string;
  rating: number;
  price: number;
  link: string;
};

export default function Courses() {
  const [userId, setUserId] = useState(""); // Store User ID
  const [courses, setCourses] = useState<Course[]>([]); // ✅ Typed courses array
  const [filters, setFilters] = useState({
    platform: "",
    minRating: 0,
    maxPrice: 10000,
    limit: 5, // ✅ Default limit to 5 courses
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch Recommended Courses
  const fetchCourses = async () => {
    setMessage("");
    if (!userId) {
      setMessage("❌ Please enter your User ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://visionx-backend.onrender.com/recommendations/recommend_courses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, limit: filters.limit }),
      });

      const data = await response.json();
      if (response.ok) {
        setCourses(data.final_recommendations.slice(0, filters.limit)); // ✅ Apply limit on frontend as well
      } else {
        setMessage(data.error || "❌ Failed to fetch recommendations.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };

  // ✅ Filter Courses
  const filteredCourses = courses.filter(
    (course) =>
      (filters.platform === "" || course.platform === filters.platform) &&
      course.rating >= filters.minRating &&
      course.price <= filters.maxPrice
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">Recommended Courses</h1>

      {/* ✅ Enter User ID to Fetch Recommendations */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <Label className="text-black">Enter Your User ID</Label>
        <Input
          id="user_id"
          placeholder="Enter User ID"
          className="caret-black text-black placeholder-black mb-4"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <Label className="text-black">Number of Courses</Label>
        <Input
          type="number"
          min="1"
          max="10"
          value={filters.limit}
          onChange={(e) => setFilters({ ...filters, limit: Number(e.target.value) })}
          className="mb-4"
        />

        <Button onClick={fetchCourses} className="w-full bg-orange-500 text-white hover:bg-maroon" disabled={loading}>
          {loading ? "Fetching..." : "Get Recommendations"}
        </Button>
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
      </div>

      {/* ✅ Filters Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
        >
          <option value="">All Platforms</option>
          <option value="Udemy">Udemy</option>
          <option value="Coursera">Coursera</option>
          <option value="YouTube">YouTube</option>
        </Select>

        <Input
          type="number"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
      </div>

      {/* ✅ Display Recommended Courses */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <div key={index} className="bg-white/90 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-orange-700 mb-2">{course.title}</h2>
            <p className="text-maroon mb-2">Platform: {course.platform}</p>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span className="text-maroon font-semibold">{course.rating}</span>
            </div>
            <p className="text-maroon mb-2">Price: ₹{course.price}</p>
            <Button>
              <a href={course.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center">
                Enroll Now
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
