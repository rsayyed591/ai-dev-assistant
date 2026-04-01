"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, History } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function CommitPage() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCommit = async () => {
    if (!context.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/commit`,
        { context, tone: tone.trim() || "concise and direct" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setOutput(res.data.data);
    } catch (error) {
      console.error("Commit generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 flex flex-col items-center relative p-6 w-full max-w-3xl mx-auto mt-12 z-10">
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-zinc-400 hover:text-white transition">
          <ArrowLeft className="mr-2" size={20} /> Back to Home
        </Link>
        <div className="flex items-center space-x-2 text-purple-400">
          <History size={24} />
          <h1 className="text-2xl font-bold text-white">Commit Rephraser</h1>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl space-y-4">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="What changes did you make? (e.g., added login api and fixed token bug)"
            className="w-full h-32 px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500 resize-none"
          />
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="Tone (Optional) - Default: concise and direct"
            className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500"
          />
          <button
            onClick={handleCommit}
            disabled={loading || !context.trim()}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Commit"}
          </button>
        </div>

        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/5 backdrop-blur-lg border border-purple-500/30 rounded-3xl shadow-2xl relative"
          >
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Conventional Commit</h3>
            <p className="text-xl font-mono text-purple-200 pr-8">{output}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}