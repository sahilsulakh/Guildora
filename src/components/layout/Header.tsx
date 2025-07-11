'use client';
import { Bell, Search, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  selectedServer: string;
}

export const Header = ({ selectedServer }: HeaderProps) => {
  const [user, setUser] = React.useState<{ username: string; avatar: string; id: string } | null>(null);

  React.useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser({ username: parsed.username, avatar: parsed.avatar, id: parsed.id });
      }
    } catch {
      // ignore error
    }
  }, []);

  return (
    <header className="h-16 bg-black/10 backdrop-blur-xl border-b border-white/10 flex items-center px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5" />
      <div className="flex items-center gap-4 flex-1 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{selectedServer}</h2>
            <p className="text-xs text-gray-400">Online • 1,234 members</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search members, quests..." 
            className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-purple-500/50"
          />
        </div>
        <Button size="sm" variant="ghost" className="relative text-gray-400 hover:text-white hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </Button>
        <Link href="/admin-profile" className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-purple-500/25 transition-transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500">
          {user && user.avatar ? (
            <Image
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <span className="text-sm font-bold text-white">A</span>
          )}
        </Link>
      </div>
    </header>
  )
};
