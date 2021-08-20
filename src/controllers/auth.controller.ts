import { Response, Request } from "express";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import config from "../config/config";
import User from "../models/user";
import {
  doneDeserializerFn,
  doneSerializerFn,
  userInterface,
} from "../interfaces/authinterfaces";
import { environment } from "../environments/environment.dev";

let token: string = "";

passport.serializeUser<userInterface>(
  (user: Express.User, done: doneSerializerFn<userInterface>) => {
    //@ts-ignore
    done(null, user.id);
  }
);

passport.deserializeUser<string>(
  async (id, done: doneDeserializerFn<userInterface>) => {
    let user = await User.findById(id);
    done(null, user);
  }
);

passport.use(
  new Strategy(
    {
      clientID: config.googleOAuth.googleClientId,
      clientSecret: config.googleOAuth.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accesToken, refreshToken, profile, done) => {
      token = accesToken;
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        let newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
        });
        let final_user = await newUser.save();
        done(null, final_user);
      }
    }
  )
);

export const googleCallback = (req: Request, res: Response) : void => {
  res.cookie("token", token);
  res.redirect(`${environment.frontEnd}/cat?page=1`);
};

export const logout = (req: Request, res: Response): void => {
  req.logOut();
  res.status(200).json({ isSucces: true });
};

export const error = (req: Request, res: Response): Response => {
  return res.status(401).json({ error: "No tienes permisos" });
};
