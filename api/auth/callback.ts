import passport from 'passport';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req : VercelRequest, res : VercelResponse) {
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
