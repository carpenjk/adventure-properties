import fetchReservations from '../../../../utils/adapters/reservations';

export default async function handler(req, res) {
  const { userID } = req.query;
  const reservations = await fetchReservations(userID);
  res.json(reservations);
}
