import clientPromise from '../mongodb';

export default async function fetchReservations(user) {
  const client = await clientPromise;
  const reservations = await client
    .db()
    .collection('reservations')
    .find({ user })
    .toArray();

  return reservations;
}
