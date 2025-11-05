"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyChat() {
  const phone = "46738907053"; // your WhatsApp number
  const text = encodeURIComponent("Hi! I'm interested in sourcing with WATC.");
  const href = `https://wa.me/${phone}?text=${text}`;

  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    // Trigger the ping every 10 seconds
    const interval = setInterval(() => {
      setShowPing(true);
      setTimeout(() => setShowPing(false), 2000); // ping lasts ~2s
    }, 8500); // every 8.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Ping effect when showPing is true */}
      {showPing && (
        <span className="absolute inset-0 rounded-full bg-green-600/40 animate-ping pointer-events-none" />
      )}

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg ring-1 ring-black/10 transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          <FaWhatsapp className="h-6 w-6" />
          <span className="sr-only">Open WhatsApp chat</span>
        </motion.button>
      </Link>
    </div>
  );
}
