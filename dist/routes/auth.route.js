"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.get("/auth", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}), auth_controller_1.googleCallback);
router.get('/logout', auth_controller_1.logout);
router.get('/error', auth_controller_1.error);
exports.default = router;
