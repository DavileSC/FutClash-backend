// src/middleware/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

interface User {
    id: string;
    displayName: string;
    emails: { value: string }[];
  }

// Configurar Passport para Android
passport.use('google-android', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID_ANDROID!,
  clientSecret: '',
  callbackURL: "/auth/google/callback/android"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Configurar Passport para iOS
passport.use('google-ios', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID_IOS!,
  clientSecret: '',
  callbackURL: "/auth/google/callback/ios"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Configurar Passport para Web (pruebas en navegador)
passport.use('google-web', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID_WEB!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_WEB!,  // Para aplicaciones web sí es necesario el secret
  callbackURL: "/auth/google/callback/web"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user as User);
});

passport.deserializeUser((user, done) => {
  done(null, user as User);
});
