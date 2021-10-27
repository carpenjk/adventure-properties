import { parseCookies } from '../../../utils/cookies';

export default async function handler(req, res) {
  const { reservation } = parseCookies(req);
  res.json({ reservation: reservation && reservation });
}
