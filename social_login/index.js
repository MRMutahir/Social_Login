import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import "./auth.js"
dotenv.config();
const port = 3000;
const app = express();
app.set("view engine", "ejs");
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
// Configure Passport to use Google OAuth 2.0 for authentication
// Define routes
app.get("/", (req, res) => {
    res.render("index");
});
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],

    }), (req, res) => {
        // User is authenticated, send JWT token as response
        res.json({ access_token: req.user });
    }
);
app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure',
    })
);

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/auth/google/failure', (req, res) => {
    res.send('Something went wrong!');
});

app.get('/auth/protected', isLoggedIn, (req, res) => {
    let access_token = req.user;
    // console.log(access_token, ">>>>>>>>>>>>>>>>>>>>access_token")
    res.json({ token: access_token });
});


app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


















// facebook

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: "email" }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/auth/facebook/success');
    });








app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
