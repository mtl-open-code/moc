import passport = require("passport");
import express = require("express");
import google = require("./google");

export function initialize(passport: passport.PassportStatic, express: express.Express)
{
    google.initialize(passport, express);
};