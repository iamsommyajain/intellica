"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-maroon/90 text-cream py-4 backdrop-blur-md sticky top-0 z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold hover:text-orange-300 transition-colors">
          INTELLICA
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Menu */}
        <nav className={`md:flex ${menuOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full md:w-auto bg-maroon md:bg-transparent p-4 md:p-0 transition-all`}>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Quiz", path: "/quiz" },
              { name: "Learning Path", path: "/learning-path" },
              { name: "Courses", path: "/courses" },
              { name: "YouTube", path: "/youtube" },
              { name: "Forum Discussion", path: "/forum-discussion" }, // ✅ Fixed Forum Path
              { name: "Contact Us", path: "/contact" }
            ].map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block py-2 md:py-0 transition-colors ${
                    pathname === link.path ? "text-maroon font-semibold bg-cream px-3 py-1 rounded-lg" : "hover:text-orange-300"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons - Visible on Desktop */}
        <div className="hidden md:flex space-x-2">
          {/* <Link href="/login">
            <Button className="text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              Sign Up
            </Button>
          </Link> */}
          <Link href="/profile">
            <Button className="text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Button Section - Appears in Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center space-y-2 mt-4 md:hidden">
          <Link href="/login">
            <Button className="w-full text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              Sign Up
            </Button>
          </Link>
          <Link href="/profile">
            <Button className="w-full text-cream border-cream bg-orange-500 hover:bg-maroon transition-colors">
              View Profile
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
