import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
const router = express.Router();

const getUserData = async (access_token) => {
  const reponse = await fetch(
    `http://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
  );
  const data = await response.json();
  console.log(data, "data");
};

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectUrl = "http://localhost:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.Client_ID,
      process.env.Client_secret,
      redirectUrl
    );
    const res = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(res.tokens);
    console.log("Token  acquired");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(user.access_token);
  } catch (error) {
    console.log(error);
  }
});
