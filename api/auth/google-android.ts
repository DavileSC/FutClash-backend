import passport from 'passport';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  passport.authenticate('google-android', { scope: ['profile', 'email'] })(req, res);
}
