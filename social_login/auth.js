
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken, ">>>>>>>>>>>>>>>>>>>>>>>>>>> accessToken")
    // console.log(refreshToken, ">>>>>>>>>>>>>>>>>>>>>>>>>>> refreshToken")
    // console.log(profile, ">>>>>>>>>>>>>>>>>>>>>>>>>>> profile")
    // done(null, profile)
    const token = jwt.sign(
        { id: profile.sub, name: profile.name, email: profile.email, accessToken: accessToken },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );
    // console.log(token, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>token")
    done(null, token); // Pass token to serializeUser
}));

// Serialize user object into session
passport.serializeUser((token, done) => {
    // done(null, user);
    done(null, token);
});

// Deserialize user object from session
passport.deserializeUser((token, done) => {
    // done(null, user);
    done(null, token);
});






// Facebook 



passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile, ">>>>>>>>>>>>>>>>>>>>>>>>>>profile")
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));