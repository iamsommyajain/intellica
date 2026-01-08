"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Star } from "lucide-react";

// Course type
type Course = {
  title: string;
  platform: string;
  rating: number;
  price: number;
  link: string;
  reason?: string;
};


export default function Courses() {
  const [topic, setTopic] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState({
    platform: "",
    minRating: 0,
    maxPrice: 10000,
    limit: 5,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch recommended courses
  const fetchCourses = async () => {
  setMessage("");

  if (!topic.trim()) {
    setMessage("Please enter a topic.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      `/api/recommend?topic=${encodeURIComponent(topic)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();

    if (Array.isArray(data.results)) {
      // Optional: limit results on frontend
      setCourses(data.results.slice(0, filters.limit));
    } else {
      setMessage("Invalid response from ML service.");
    }
  } catch (error) {
    console.error(error);
    setMessage("ML service unavailable.");
  } finally {
    setLoading(false);
  }
};


  // Apply filters
  const filteredCourses = courses.filter(
  (course) =>
    (filters.platform === "" ||
      filters.platform === "all" ||
      course.platform === filters.platform) &&
    Number(course.rating) >= filters.minRating &&
    Number(course.price) <= filters.maxPrice
);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">
        Recommended Courses
      </h1>

      {/* Topic input */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <Label className="text-black">Topic</Label>
        <Input
          placeholder="e.g. Data Structures, Machine Learning, Web Development"
          className="text-black mb-4"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <Label className="text-black">Number of Courses</Label>
        <Input
          type="number"
          min="1"
          max="10"
          value={filters.limit}
          onChange={(e) =>
            setFilters({ ...filters, limit: Number(e.target.value) })
          }
          className="mb-4 text-black"
        />

        <Button
          onClick={fetchCourses}
          className="w-full bg-orange-500 text-white hover:bg-maroon"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Recommendations"}
        </Button>

        {message && (
          <p className="text-center text-red-500 mt-2">{message}</p>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select
          value={filters.platform}
          onValueChange={(value) =>
            setFilters({ ...filters, platform: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Udemy">Udemy</SelectItem>
            <SelectItem value="Coursera">Coursera</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={(e) =>
            setFilters({ ...filters, minRating: Number(e.target.value) })
          }
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
        />
      </div>

      {/* Course cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white/90 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-orange-700 mb-2">
              {course.title}
            </h2>
            <p className="text-maroon mb-2">
              Platform: {course.platform}
            </p>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span className="text-maroon font-semibold">
                {course.rating}
              </span>
            </div>
            <p className="text-maroon mb-2">Price: ₹{course.price}</p>

            <Button
  onClick={() => window.open(course.link, "_blank", "noopener,noreferrer")}
>
  Enroll Now
</Button>

          </div>
        ))}
      </div>
    </div>
  );
}
