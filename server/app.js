// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var authRouter = require("./routes/oauth");
// var requestRouter = require("./routes/request");
// var htmlAuthRouter = require("./routes/htmlAuth");

// var htmlFileRouter = require("./routes/htmlResponse");

// var app = express();

// app.options("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", [
//     "X-Requested-With",
//     "content-type",
//     "credentials",
//   ]);
//   res.header("Access-Control-Allow-Methods", "GET,POST");
//   res.status(200);
//   next();
// });

// app.set("view engine", "pug");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/oauth", authRouter);
// app.use("/request", requestRouter);
// app.use("/htmlAuth", htmlAuthRouter);

// app.use("/htmlResponse", htmlFileRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/connect.js";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const port = 3000;
const app = express();
dotenv.config();
app.use(
  cors({
    origin: `http://localhost:3001/`,
    methods: `GET,POST,PUT,DELETE`,
    credentials: true,
  })
);
app.use(
  session({
    secret: "12345678abc",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_ID,
      clientSecret: process.env.Client_Secret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Google authentication callback logic
      // You can customize this part based on your requirements
    }
  )
);
app.use(express.json());
const router = express.Router();
app.get("/", (req, res, next) => {
  res.json({ message: "Hi  My  server  is Ok" });
});
app.listen(port, () => {
  console.log(`server  is  started ${port}`);
});

// router.post("/", async (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Referrer-Policy", "no-referrer-when-downrade");
//   const redirectUrl = "http://localhost:3000/oauth";
//   const oAuth2Client = new OAuth2Client(
//     process.env.Client_ID,
//     process.env.Client_secret,
//     redirectUrl
//   );
//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: "https://www.googleapis.com/auth/userinfo.profile openid",
//     prompt: "consent",
//   });
//   res.json({
//     url: authorizeUrl,
//   });
// });

// const getUserData = async (access_token) => {
//   const reponse = await fetch(
//     `http://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
//   );
//   const data = await response.json();
//   console.log(data, "data");
// };

// router.get("/", async function (req, res, next) {
//   const code = req.query.code;
//   try {
//     const redirectUrl = "http://localhost:3000/oauth";
//     const oAuth2Client = new OAuth2Client(
//       process.env.Client_ID,
//       process.env.Client_secret,
//       redirectUrl
//     );
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.tokens);
//     console.log("Token  acquired");
//     const user = oAuth2Client.credentials;
//     console.log("credentials", user);
//     await getUserData(user.access_token);
//   } catch (error) {
//     console.log(error);
//   }
// });
