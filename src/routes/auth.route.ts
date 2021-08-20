import { Router } from "express";
import { googleCallback, logout, error } from "../controllers/auth.controller";
import passport from "passport";

const router = Router();

router.get(
  "/auth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  }, 
  
  ),
  googleCallback
);

router.get('/logout', logout)

router.get('/error', error)


export default router;
