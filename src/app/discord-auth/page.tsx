'use client'
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Crown } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

export default function DiscordAuth() {
  const [redirectUri, setRedirectUri] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectUri(encodeURIComponent(window.location.origin + "/discord-callback"));

      const handleAuthMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data === 'authSuccess') {
          router.replace('/portal-selection');
        }
      };
      
      window.addEventListener('message', handleAuthMessage);
      return () => window.removeEventListener('message', handleAuthMessage);
    }
  }, [router]);

  if (!redirectUri) {
    return null; // Or a loading spinner
  }

  const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email`;

  const handleLogin = () => {
    const width = 600;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      DISCORD_OAUTH_URL, 
      'discordAuthPopup', 
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      <ParticleBackground />
      <Link 
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>
      <Card className="relative z-10 w-full max-w-md mx-auto p-8 sm:p-10 border-white/20 bg-white/10 backdrop-blur-2xl flex flex-col items-center animate-auth-card shadow-2xl shadow-purple-500/10 rounded-2xl">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Crown className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
          Sign in to Guildora
        </h1>
        
        <p className="mb-8 text-white/70 text-center text-base max-w-xs">
          Connect with Discord to unlock your community's full potential.
        </p>

        <Button
          size="lg"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-7 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-indigo-400/50"
          onClick={handleLogin}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0"><path fill="currentColor" d="M20.317 4.369a19.791 19.791 0 0 0-3.432-1.27a.112.112 0 0 0-.12.056c-.522.927-.99 1.89-1.404 2.885a18.524 18.524 0 0 0-5.59 0A12.76 12.76 0 0 0 8.366 3.157a.115.115 0 0 0-.12-.057A19.736 19.736 0 0 0 3.684 4.37a.104.104 0 0 0-.047.04C.533 9.09-.32 13.58.1 18.021a.117.117 0 0 0 .045.082c2.053 1.507 4.042 2.422 5.993 3.029a.112.112 0 0 0 .123-.042c.462-.63.875-1.295 1.233-1.994a.112.112 0 0 0-.062-.157c-.652-.247-1.27-.549-1.87-.892a.112.112 0 0 1-.011-.186c.126-.094.252-.192.372-.291a.112.112 0 0 1 .114-.013c3.927 1.793 8.18 1.793 12.061 0a.112.112 0 0 1 .115.012c.12.099.246.197.372.291a.112.112 0 0 1-.01.186c-.6.344-1.219.645-1.87.892a.112.112 0 0 0-.062.157c.36.699.773 1.364 1.234 1.994a.112.112 0 0 0 .123.042c1.95-.607 3.94-1.522 5.993-3.029a.115.115 0 0 0 .045-.082c.5-5.177-.838-9.637-3.573-13.611a.09.09 0 0 0-.048-.041ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z"/></svg>
          Continue with Discord
        </Button>
        <div className="mt-8 text-center text-xs text-white/50">
          By continuing, you agree to our <a href="#" className="underline hover:text-white/80">Terms of Service</a>.
        </div>
      </Card>
    </div>
  );
}
