import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
router.post("/", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Referrer-Policy", "no-referrer-when-downrade");
  const redirectUrl = "http://localhost:3000/oauth";
  const oAuth2Client = new OAuth2Client(
    process.env.Client_ID,
    process.env.Client_secret,
    redirectUrl
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
  res.json({
    url: authorizeUrl,
  });
});
