'use client';
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { functions } from "@/lib/firebase";
import { httpsCallable } from "firebase/functions";

const exchangeCodeForToken = httpsCallable(functions, 'exchangeDiscordCode');

function DiscordCallbackComponent() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError("No code found in URL. Please try authenticating again.");
      setLoading(false);
      return;
    }

    const redirectUri = window.location.origin + "/discord-callback";

    exchangeCodeForToken({ code, redirectUri })
      .then(async (result) => {
        const { token, user } = result.data as { token: string; user: { id: string; username: string; avatar: string }};
        
        if (!token || !user) {
          throw new Error("Invalid response from authentication service.");
        }

        // Save token/user info
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        // Signal success to the main window and close the popup
        if (window.opener) {
          window.opener.postMessage('authSuccess', window.location.origin);
          window.close();
        } else {
            // Fallback for non-popup scenarios
            router.replace("/portal-selection");
        }
      })
      .catch((err) => {
        console.error("Authentication Error:", err);
        setError("Failed to authenticate with Discord. Please try again.");
        setLoading(false);
      });
  }, [router, searchParams]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Authenticating with Discord...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-red-500">{error}</div>;
  return null;
}

export default function DiscordCallback() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>}>
            <DiscordCallbackComponent />
        </Suspense>
    )
}
