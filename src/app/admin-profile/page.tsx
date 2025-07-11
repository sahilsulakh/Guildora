'use client';
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, UserCircle2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DISCORD_API = "https://discord.com/api/users/@me";

export default function AdminProfile() {
  type DiscordProfile = {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
  const [profile, setProfile] = useState<DiscordProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/discord-auth");
      return;
    }
    fetch(DISCORD_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Discord profile.");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
  if (error || !profile) return <div className="flex items-center justify-center min-h-screen text-red-600">{error || 'Could not load profile.'}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto p-10 border-0 shadow-2xl bg-gradient-to-br from-slate-50/80 via-purple-400/80 to-pink-200/80 backdrop-blur-2xl flex flex-col items-center animate-auth-card">
        <Badge className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white border-0 shadow-lg px-6 py-3 text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 mr-2" />
          Admin Profile
        </Badge>
        <UserCircle2 className="w-24 h-24 text-indigo-500 mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-extrabold mb-2 text-indigo-900 text-center drop-shadow-2xl tracking-tight" style={{textShadow: '0 4px 24px #c4b5fd, 0 1px 0 #fff'}}>{profile.username}#{profile.discriminator}</h1>
        <p className="mb-4 text-purple-800 text-center text-lg font-semibold drop-shadow-lg" style={{textShadow: '0 2px 8px #c4b5fd, 0 1px 0 #fff'}}>ID: <span className='text-pink-500 font-bold'>{profile.id}</span></p>
        <Image src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`} alt="Avatar" width={128} height={128} className="w-32 h-32 rounded-full border-4 border-pink-400 shadow-xl mb-6" />
        <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-extrabold border-0 shadow-2xl shadow-pink-500/30 px-8 py-3 text-lg rounded-xl transition-all duration-200 focus:ring-4 focus:ring-pink-400 flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 mr-2" />
          Edit Profile
        </Button>
      </Card>
    </div>
  );
}
