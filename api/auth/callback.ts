import { Request, Response } from 'express';
import passport from 'passport';

export default function handler(req: Request, res: Response) {
  const platform = req.query.platform; // Detecta la plataforma desde una query string
  
  let strategy;
  switch (platform) {
    case 'web':
      strategy = 'google-web';
      break;
    case 'android':
      strategy = 'google-android';
      break;
    case 'ios':
      strategy = 'google-ios';
      break;
    default:
      return res.redirect('/login');
  }

  passport.authenticate(strategy, { failureRedirect: '/' }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }
    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}?token=YOUR_TOKEN`);
  })(req, res);
}
