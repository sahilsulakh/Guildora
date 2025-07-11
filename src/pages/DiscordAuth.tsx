
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REDIRECT_URI = encodeURIComponent(window.location.origin + "/discord-callback");
const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email`;

export default function DiscordAuth() {
  const handleLogin = () => {
    window.location.href = DISCORD_OAUTH_URL;
  };
  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      <span
        onClick={handleBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-indigo-700 hover:text-pink-500 font-bold text-lg underline cursor-pointer transition-colors z-50"
        style={{background: 'none', boxShadow: 'none', padding: 0, borderRadius: 0}}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </span>
      <Card className="relative z-10 w-full max-w-md mx-auto p-10 border-0 shadow-2xl bg-gradient-to-br from-slate-50/80 via-purple-400/60 to-pink-200/80 backdrop-blur-2xl flex flex-col items-center animate-auth-card">
        <Badge className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white border-0 shadow-lg px-6 py-3 text-lg flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path fill="#fff" d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.112.112 0 0 0-.12.056c-.522.927-.99 1.89-1.404 2.885a18.524 18.524 0 0 0-5.59 0A12.76 12.76 0 0 0 8.366 3.157a.115.115 0 0 0-.12-.057A19.736 19.736 0 0 0 3.684 4.369a.104.104 0 0 0-.047.041C.533 9.09-.32 13.58.099 18.021a.117.117 0 0 0 .045.082c2.053 1.507 4.042 2.422 5.993 3.029a.112.112 0 0 0 .123-.042c.462-.63.875-1.295 1.233-1.994a.112.112 0 0 0-.062-.157c-.652-.247-1.27-.549-1.87-.892a.112.112 0 0 1-.011-.186c.126-.094.252-.192.372-.291a.112.112 0 0 1 .114-.013c3.927 1.793 8.18 1.793 12.061 0a.112.112 0 0 1 .115.012c.12.099.246.197.372.291a.112.112 0 0 1-.01.186c-.6.344-1.219.645-1.87.892a.112.112 0 0 0-.062.157c.36.699.773 1.364 1.234 1.994a.112.112 0 0 0 .123.042c1.95-.607 3.94-1.522 5.993-3.029a.115.115 0 0 0 .045-.082c.5-5.177-.838-9.637-3.573-13.611a.09.09 0 0 0-.048-.041ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z"/></svg>
          Discord Authentication
        </Badge>
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-900 text-center drop-shadow-2xl tracking-tight" style={{textShadow: '0 4px 24px #c4b5fd, 0 1px 0 #fff'}}>Sign in to Guildora</h1>
        <p className="mb-8 text-purple-800 text-center text-lg max-w-xs font-semibold drop-shadow-lg" style={{textShadow: '0 2px 8px #c4b5fd, 0 1px 0 #fff'}}>Authenticate with Discord to access <span className='text-pink-500 font-bold'>exclusive features</span> and join the <span className='text-indigo-600 font-bold'>community</span>.</p>
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-extrabold py-4 px-8 rounded-xl shadow-2xl shadow-pink-500/30 flex items-center justify-center gap-3 text-xl transition-all duration-200 focus:ring-4 focus:ring-pink-400"
          onClick={handleLogin}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.112.112 0 0 0-.12.056c-.522.927-.99 1.89-1.404 2.885a18.524 18.524 0 0 0-5.59 0A12.76 12.76 0 0 0 8.366 3.157a.115.115 0 0 0-.12-.057A19.736 19.736 0 0 0 3.684 4.369a.104.104 0 0 0-.047.041C.533 9.09-.32 13.58.099 18.021a.117.117 0 0 0 .045.082c2.053 1.507 4.042 2.422 5.993 3.029a.112.112 0 0 0 .123-.042c.462-.63.875-1.295 1.233-1.994a.112.112 0 0 0-.062-.157c-.652-.247-1.27-.549-1.87-.892a.112.112 0 0 1-.011-.186c.126-.094.252-.192.372-.291a.112.112 0 0 1 .114-.013c3.927 1.793 8.18 1.793 12.061 0a.112.112 0 0 1 .115.012c.12.099.246.197.372.291a.112.112 0 0 1-.01.186c-.6.344-1.219.645-1.87.892a.112.112 0 0 0-.062.157c.36.699.773 1.364 1.234 1.994a.112.112 0 0 0 .123.042c1.95-.607 3.94-1.522 5.993-3.029a.115.115 0 0 0 .045-.082c.5-5.177-.838-9.637-3.573-13.611a.09.09 0 0 0-.048-.041ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z"/></svg>
          Sign in with Discord
        </Button>
        <div className="mt-8 text-center text-base text-indigo-900 font-bold drop-shadow-lg" style={{textShadow: '0 2px 8px #c4b5fd, 0 1px 0 #fff'}}>
          By signing in, you agree to our <a href="#" className="underline text-pink-500 hover:text-pink-600 font-bold">Terms of Service</a> and <a href="#" className="underline text-indigo-600 hover:text-indigo-700 font-bold">Privacy Policy</a>.
        </div>
      </Card>
    </div>
  );
}
