// src/router/authRouter.ts
import { Router } from 'express';
import passport from 'passport';
import { authController } from '../controller/authController';

const router = Router();

// Rutas de autenticación para Android
router.get('/google/android', passport.authenticate('google-android', { scope: ['profile', 'email'] }));
router.get('/google/callback/android', authController.googleAndroidCallback);

// Rutas de autenticación para iOS
router.get('/google/ios', passport.authenticate('google-ios', { scope: ['profile', 'email'] }));
router.get('/google/callback/ios', authController.googleIosCallback);

// Rutas de autenticación para Web (pruebas en navegador)
router.get('/google/web', passport.authenticate('google-web', { scope: ['profile', 'email'] }));
router.get('/google/callback/web', authController.googleWebCallback);

export default router;
