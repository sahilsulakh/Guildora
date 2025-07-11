import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// This is a placeholder. In a real app, you would call your backend to exchange the code for a token.
async function exchangeCodeForToken(code: string) {
  // Example: await fetch('/api/auth/discord/callback?code=' + code)
  // For now, just simulate a successful login
  return { user: { username: "DiscordUser", id: "123456" }, token: "fake-jwt-token" };
}

export default function DiscordCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      setError("No code found in URL.");
      setLoading(false);
      return;
    }
    exchangeCodeForToken(code)
      .then(async (data) => {
        // Save token/user info as needed (e.g., localStorage, context)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Save user info to Firestore
        try {
          await addDoc(collection(db, "users"), {
            discordId: data.user.id,
            username: data.user.username,
            loginAt: new Date().toISOString(),
          });
        } catch (e) {
          // Optionally handle Firestore error
        }
        // Always redirect to portal selection after authentication
        navigate("/portal-selection", { replace: true });
      })
      .catch(() => {
        setError("Failed to authenticate with Discord.");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Authenticating with Discord...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  return null;
}
