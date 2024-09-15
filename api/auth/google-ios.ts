import passport from 'passport';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req : VercelRequest, res : VercelResponse) {
  passport.authenticate('google-ios', { scope: ['profile', 'email'] })(req, res);
}
