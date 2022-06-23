import { getSession } from 'next-auth/react';
import { fetchReservationsWithProperty } from '../../../../utils/adapters/reservations';
import { checkSession } from '../../../../utils/dataValidation';

export default async function handler(req, res) {
  const { userID } = req.query;
  const session = await getSession({ req });
  let resWithPropeties;
  const validSession = checkSession(session, userID);

  if (!validSession) {
    return res
      .status(400)
      .json({ error: 'userID does not match logged in user' });
  }
  try {
    resWithPropeties = await fetchReservationsWithProperty(userID);
  } catch (e) {
    return res.status(500).json({ error: 'Error retrieving reservations' });
  }
  res.json({ reservations: resWithPropeties });
}
