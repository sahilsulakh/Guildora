import { https, logger } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fetch from "node-fetch";

initializeApp();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

export const exchangeDiscordCode = https.onCall(async (data, context) => {
  const code = data.code;
  const redirectUri = data.redirectUri;

  if (!code || typeof code !== "string") {
    throw new https.HttpsError("invalid-argument", "The function must be called with 'code'.");
  }
  if (!redirectUri || typeof redirectUri !== "string") {
    throw new https.HttpsError("invalid-argument", "The function must be called with 'redirectUri'.");
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    logger.error("Discord environment variables are not set.");
    throw new https.HttpsError("internal", "Server configuration error.");
  }
  
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      logger.error("Failed to exchange code for token:", errorBody);
      throw new https.HttpsError("unavailable", "Failed to authenticate with Discord.");
    }

    const tokenData = await tokenResponse.json() as { access_token: string };

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
        throw new https.HttpsError("unavailable", "Failed to fetch user data from Discord.");
    }

    const userData = await userResponse.json() as { id: string; username: string; avatar: string };

    const appToken = tokenData.access_token; 

    await getFirestore().collection("users").doc(userData.id).set({
        discordId: userData.id,
        username: userData.username,
        avatar: userData.avatar,
        lastLogin: new Date(),
    }, { merge: true });

    return {
      token: appToken,
      user: {
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
      },
    };

  } catch (error) {
    logger.error("Error in exchangeDiscordCode function:", error);
    if (error instanceof https.HttpsError) {
      throw error;
    }
    throw new https.HttpsError("internal", "An unexpected error occurred.");
  }
});
