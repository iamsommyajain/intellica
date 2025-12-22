"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && message) {
      setStatus("Message Sent!");
    } else {
      setStatus("Please fill in all details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-maroon mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="placeholder-black text-black" 
            />
            <Input 
              type="email" 
              placeholder="Your Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="placeholder-black text-black" 
            />
            <Textarea 
              placeholder="Your Message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className="placeholder-black text-black" 
            />
            <Button type="submit">Send Message</Button>
            {status && <p className="text-maroon font-semibold mt-2">{status}</p>}
          </form>
        </div>
        <div className="bg-white/90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Contact Information</h2>
          <div className="space-y-4 text-black">
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2 text-maroon" />
              <p>intellica2025@gmail.com</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-2 text-maroon" />
              <p>+91 8376XXXXXX</p>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-maroon" />
              <p>Bawana Rd, Delhi Technological University, Shahbad Daulatpur Village, Rohini, New Delhi, Delhi, 110042</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
