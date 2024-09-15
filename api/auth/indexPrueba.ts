// api/index.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Esta es la ruta principal, maneja las solicitudes al dominio raíz.
  res.status(200).send('<a href="/auth/google/android">Login with Google</a>');
}