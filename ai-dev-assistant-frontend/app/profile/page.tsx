/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setProfile(res.data.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center relative p-6 w-full max-w-2xl mx-auto mt-12 z-10">
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-zinc-400 hover:text-white transition">
          <ArrowLeft className="mr-2" size={20} /> Back to Home
        </Link>
        <div className="flex items-center space-x-2 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="w-full p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl space-y-8">
        {loading ? (
          <p className="text-center text-zinc-500">Loading profile...</p>
        ) : profile ? (
          <>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 rounded-full shadow-lg text-4xl font-bold">
                {profile.name?.substring(0, 1).toUpperCase() || profile.email.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{profile.name || "Developer"}</h2>
                <div className="flex items-center text-zinc-400 mt-2">
                  <Mail size={16} className="mr-2" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center text-zinc-500 mt-1">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 bg-black/30 rounded-2xl border border-white/5 text-center">
                <p className="text-3xl font-bold text-blue-400">
                  {profile.history?.filter((h: any) => h.type === "rephrase").length || 0}
                </p>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mt-1">Texts Rephrased</p>
              </div>
              <div className="p-4 bg-black/30 rounded-2xl border border-white/5 text-center">
                <p className="text-3xl font-bold text-purple-400">
                  {profile.history?.filter((h: any) => h.type === "commit").length || 0}
                </p>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mt-1">Commits Generated</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-red-400">Could not load profile data.</p>
        )}
      </div>
    </main>
  );
}