import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { OAuth2Client } from "google-auth-library";
import connectDB from "./db/connect.js";

dotenv.config();
const port = 3000;
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: `http://localhost:3001`,
    methods: `GET,POST,PUT,DELETE`,
    credentials: true,
  })
);
app.use(
  session({
    secret: "12345678abc",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if user exists in database, if not, create one
      // This logic depends on your database implementation
      // For simplicity, let's assume you have a User model and you find/create the user here
      // Example:
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "Hi, my server is OK" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/dashboard", (req, res) => {
  res.send("Welcome to the dashboard!");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/", router);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
