"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, payload);
      
      if (res.data.success) {
        // Save token & user to localStorage (or a context)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onSuccess(res.data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md p-8 overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition">
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {error && <div className="mb-4 p-3 text-sm text-red-400 bg-red-900/30 rounded-lg border border-red-500/50">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:text-purple-300 font-medium">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}