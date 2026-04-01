"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setHistory(res.data.data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center relative p-6 w-full max-w-4xl mx-auto mt-12 z-10">
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-zinc-400 hover:text-white transition">
          <ArrowLeft className="mr-2" size={20} /> Back to Home
        </Link>
        <div className="flex items-center space-x-2 text-white">
          <Clock size={24} className="text-zinc-400" />
          <h1 className="text-2xl font-bold">Activity History</h1>
        </div>
      </div>

      <div className="w-full space-y-4">
        {loading ? (
          <p className="text-center text-zinc-500 py-10">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-zinc-500 py-10">No history found. Start generating!</p>
        ) : (
          history.map((item, idx) => (
            <div key={idx} className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${item.type === "rephrase" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                  {item.type}
                </span>
                <p className="text-xs text-zinc-500">{new Date(item.createdAt).toLocaleString()}</p>
                <p className="text-xs text-zinc-400 mt-1">Tone: {item.tone}</p>
              </div>
              <div className="md:w-3/4 space-y-2">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase">Input</h4>
                  <p className="text-sm text-zinc-300 bg-black/30 p-3 rounded-lg border border-white/5">{item.input}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase">Output</h4>
                  <p className="text-sm text-white bg-white/10 p-3 rounded-lg border border-white/10 font-medium">{item.output}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}