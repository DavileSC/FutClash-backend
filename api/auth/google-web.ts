import passport from 'passport';
import { Request, Response } from 'express';

export default function handler(req : Request, res : Response) {
  passport.authenticate('google-web', { scope: ['profile', 'email'] })(req, res);
}
