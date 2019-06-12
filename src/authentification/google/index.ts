import passport = require("passport");
import express = require("express");
import { Strategy } from "passport-google-oauth20";

import credential = require("./credentials.json"); // WARNING: Will cache it

export function initialize(passport: passport.PassportStatic, express: express.Express)
{
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    passport.use(new Strategy({
        clientID: credential.web.client_id,
        clientSecret: credential.web.client_secret,
        callbackURL: "http://127.0.0.1:8080/auth/google/callback" // TODO: fill with protocol + hostname + port
    },
    (token, refreshToken, profile, done) => done(null, { profile: profile, token: token })));

    express.get("/auth/google",
    passport.authenticate("google", { scope: "profile" }));

    express.get("/auth/google/callback",
                passport.authenticate("google", {
                    failureFlash: "Unable to authentificate your account"
                }),
                (req, res) => {
                    if(req.session) {
                        req.session.token = req.user.token;
                        // other data available in req.user.profile:
                        //  * displayName
                        //  * name
                        //      * familyName
                        //      * givenName
                        //  * emails
                        //      [] value
                        //      [] verified
                        //  * photos
                        //      [] value (url to a jpg)
                    }

                    res.redirect("/");
                });
}