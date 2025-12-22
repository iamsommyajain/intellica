import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link"; // ✅ Import Link from Next.js
import Header from "@/components/Header";
import WaveBackground from "@/components/WaveBackground";
import Chatbot from "@/components/chatbot";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "INTELLICA - Your Personalized Learning Assistant",
  description: "Discover tailored courses and learning paths with INTELLICA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-cream via-orange-50 to-cream min-h-screen`}>
        <WaveBackground />
        <Header />

        {/* ✅ Clickable Text Link Below Header */}
        <div className="text-center mt-4">
          <Link href="/daily-content">
            <span className="text-maroon font-semibold text-lg cursor-pointer hover:underline">
              👉 Click here for Problem of the Day & Latest News
            </span>
          </Link>
        </div>

        {children}
        <Chatbot />
      </body>
    </html>
  );
}
