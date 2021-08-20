"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.logout = exports.googleCallback = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const environment_dev_1 = require("../environments/environment.dev");
let token = "";
passport_1.default.serializeUser((user, done) => {
    //@ts-ignore
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.findById(id);
    done(null, user);
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.googleOAuth.googleClientId,
    clientSecret: config_1.default.googleOAuth.googleClientSecret,
    callbackURL: "/auth/google/callback",
}, (accesToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    token = accesToken;
    let user = yield user_1.default.findOne({ googleId: profile.id });
    if (user) {
        done(null, user);
    }
    else {
        let newUser = new user_1.default({
            googleId: profile.id,
            displayName: profile.displayName,
        });
        let final_user = yield newUser.save();
        done(null, final_user);
    }
})));
const googleCallback = (req, res) => {
    res.cookie("token", token);
    res.redirect(`${environment_dev_1.environment.frontEnd}/cat?page=1`);
};
exports.googleCallback = googleCallback;
const logout = (req, res) => {
    req.logOut();
    res.status(200).json({ isSucces: true });
};
exports.logout = logout;
const error = (req, res) => {
    return res.status(401).json({ error: "No tienes permisos" });
};
exports.error = error;
