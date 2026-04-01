"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Added useRouter
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, History, Zap } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const router = useRouter(); // <-- Initialize router
  const [user, setUser] = useState<{ email: string; name?: string } | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showRestriction, setShowRestriction] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
  };

  const handleToolClick = (path: string) => {
    if (!user) {
      setShowRestriction(true);
      return;
    }
    router.push(path); // <-- Now actually routes the user!
  };

  const handleDropdownNav = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  return (
    <main className="flex-1 flex flex-col items-center relative">
      {/* --- NEW BACKGROUND ELEMENTS --- */}
      {/* Animated Aurora Blobs */}
      <div className="bg-container" />
      {/* Subtle Noise Texture overlay */}
      <div className="bg-noise" />
      {/* ---------------------------------- */}

      {/* Navbar Section */}
      <nav className="w-full p-6 flex justify-end items-center absolute top-0 right-0 z-20">
        {!user ? (
          <div className="space-x-4 font-medium text-lg">
            <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-purple-400 transition">
              Sign in
            </button>
            <button onClick={() => setIsAuthModalOpen(true)} className="px-5 py-2 bg-white text-black rounded-full hover:bg-zinc-200 transition">
              Sign up
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white/20 hover:scale-105 transition shadow-lg"
            >
              <span className="font-bold text-lg">{user.email.substring(0, 2).toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 py-2 bg-black/60 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl flex flex-col"
                >
                  {/* Routed to /profile */}
                  <button onClick={() => handleDropdownNav("/profile")} className="flex items-center px-4 py-3 hover:bg-white/10 transition text-left">
                    <User size={18} className="mr-3 text-zinc-400" /> Profile
                  </button>
                  {/* Routed to /history */}
                  <button onClick={() => handleDropdownNav("/history")} className="flex items-center px-4 py-3 hover:bg-white/10 transition text-left">
                    <History size={18} className="mr-3 text-zinc-400" /> History
                  </button>
                  <div className="h-px bg-zinc-700 my-1 mx-2"></div>
                  <button onClick={handleSignOut} className="flex items-center px-4 py-3 hover:bg-red-500/20 text-red-400 transition text-left">
                    <LogOut size={18} className="mr-3" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl mt-20 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-24 flex flex-col items-center"
        >
          {/* Main Title Container */}
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
              Rephraser
            </h1>
            {/* Subtitle anchored to bottom right of title */}
            <p className="absolute -bottom-6 right-0 text-xl md:text-2xl text-purple-400 font-medium italic transform -rotate-2">
              By Rehan
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-6">
          <motion.button
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToolClick("/rephrase")} // <-- Updated to pass the route path
            className="flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all group shadow-2xl"
          >
            <Zap size={40} className="text-blue-400 mb-4 group-hover:text-blue-300 transition" />
            <span className="text-2xl font-semibold">Text Rephraser</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToolClick("/commit")} // <-- Updated to pass the route path
            className="flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all group shadow-2xl"
          >
            <History size={40} className="text-purple-400 mb-4 group-hover:text-purple-300 transition" />
            <span className="text-2xl font-semibold">Commit Rephraser</span>
          </motion.button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={setUser} />

      {/* Unauthenticated Restriction Modal */}
      <AnimatePresence>
        {showRestriction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-950 border border-zinc-700 p-8 rounded-3xl shadow-2xl text-center max-w-sm backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Hold up! 🛑</h3>
              <p className="text-zinc-400 mb-6">Please sign in to use the Rephraser tools.</p>
              <div className="flex space-x-4">
                <button onClick={() => setShowRestriction(false)} className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">Cancel</button>
                <button
                  onClick={() => {
                    setShowRestriction(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-white font-medium"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}