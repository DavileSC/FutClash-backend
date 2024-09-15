import { Request, Response, Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const authRouter = Router();

interface ExtendedUser extends Express.User {
  googleId?: string;
  provider?: string;
  displayName?: string;
  email?: string;
}

// Configuración de la sesión
authRouter.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

// Estrategias de Google para Web, Android, iOS
const strategies = [
  {
    name: "google-web",
    clientID: process.env.GOOGLE_CLIENT_ID_WEB!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_WEB!,
    callbackURL: process.env.CALLBACK_URL_WEB!,
  },
  {
    name: "google-android",
    clientID: process.env.GOOGLE_CLIENT_ID_ANDROID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_ANDROID!,
    callbackURL: process.env.CALLBACK_URL_ANDROID!,
  },
  {
    name: "google-ios",
    clientID: process.env.GOOGLE_CLIENT_ID_IOS!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_IOS!,
    callbackURL: process.env.CALLBACK_URL_IOS!,
  }
];

// Registrar cada estrategia
strategies.forEach((strategy) => {
  passport.use(
    strategy.name,
    new GoogleStrategy(
      {
        clientID: strategy.clientID,
        clientSecret: strategy.clientSecret,
        callbackURL: strategy.callbackURL,
      },
      async (accessToken, _refreshToken, profile, done) => {
        const user = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
        };
        return done(null, user);
      }
    )
  );
});

passport.serializeUser((user: any, done) => {
  done(null, user);
});
passport.deserializeUser((obj: ExtendedUser, done) => {
  done(null, obj);
});

// Rutas de autenticación para cada plataforma
authRouter.get("/google/web", passport.authenticate("google-web", { scope: ["profile", "email"] }));
authRouter.get("/google/android", passport.authenticate("google-android", { scope: ["profile", "email"] }));
authRouter.get("/google/ios", passport.authenticate("google-ios", { scope: ["profile", "email"] }));

// Callbacks
authRouter.get(
  "/google/web/callback",
  passport.authenticate("google-web", { failureRedirect: "/auth/google/web" }),
  (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_URL}?token=YOUR_TOKEN`);
  }
);

authRouter.get(
  "/google/android/callback",
  passport.authenticate("google-android", { failureRedirect: "/auth/google/android" }),
  (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_URL}?token=YOUR_TOKEN`);
  }
);

authRouter.get(
  "/google/ios/callback",
  passport.authenticate("google-ios", { failureRedirect: "/auth/google/ios" }),
  (req: Request, res: Response) => {
    res.redirect(`${process.env.FRONTEND_URL}?token=YOUR_TOKEN`);
  }
);

export default authRouter;
