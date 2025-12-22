import { Button } from "../../components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8 text-center">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Your Profile</h2>
        <div className="space-y-4 text-black">
          <p><strong>Name:</strong> Samridh</p>
          <p><strong>Email:</strong> Samridh@example.com</p>
          <p><strong>Contact Number:</strong> +91 8376XXXXXX</p>
        </div>

        {/* Buttons */}
        <Button className="mt-6 w-full bg-orange-500 text-white hover:bg-maroon hover:text-cream transition-colors">
          Edit Profile
        </Button>
        <Button className="mt-2 w-full bg-red-600 text-white hover:bg-red-700">
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
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Machine Learning Basics
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Advanced Python Programming
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Deep Learning with TensorFlow
            </li>
          </ul>
        </div>

        {/* In-Progress Courses */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-orange-700 mb-2">In-Progress Courses</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-black">Natural Language Processing</span>
              <Button className="bg-orange-500 text-white hover:bg-maroon flex items-center">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-black">Data Structures & Algorithms</span>
              <Button className="bg-orange-500 text-white hover:bg-maroon flex items-center">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
