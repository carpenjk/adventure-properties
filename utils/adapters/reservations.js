import clientPromise from '../mongodb';

export default async function fetchReservations(user) {
  const client = await clientPromise;
  const reservations = await client
    .db()
    .collection('reservations')
    .find({ userID: user })
    .sort({ arriveDate: 1 })
    .toArray();
  return reservations;
}
