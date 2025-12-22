import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Login() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">Login</h1>
      <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Welcome Back</h2>
        <form className="space-y-4">
          <Input type="email" placeholder="Your Email" className="placeholder-black text-black" />
          <Input type="password" placeholder="Your Password" className="placeholder-black text-black" />
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-700 font-semibold hover:text-maroon transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
