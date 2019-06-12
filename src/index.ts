import passport = require("passport");
import express = require("express");
import authentification = require("./authentification");
import cookieParser = require("cookie-parser");
import cookieSession = require("cookie-session");

const app = express();
const port = process.env.PORT || 8080;

app.use(passport.initialize());

app.use(cookieSession({
    name: "session",
    secret: "pFJVTUJiGRofqVlCiSbglvhmRhnOR4On2YGeBQWsEzagmRlpiCKrKBKaAD1WrtWhVihvbGz663K1zn0m",
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

authentification.initialize(passport, app);

app.get("/", (req, res, next) => {
    // TODO: Add type (for typescript)
    if(req.session && req.session.token) {
        res.json({status: "authentificated"});
    } else {
        res.json({status: "anonyme"});
    }
});

app.get("/logout", (req, res, next) => {
    req.logout(); // passport

    if(req.session) {
        req.session.token = null;
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});