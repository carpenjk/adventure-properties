import clientPromise from '../mongodb';

export default async function saveReservation(reservation) {
  const client = await clientPromise;
  // create reservation document
  try {
    await client.db().collection('reservations').insertOne(reservation);
  } catch (error) {
    throw new Error('Error making reservation', { cause: error });
  }

  // mark make availability date as booked
  try {
    await client
      .db()
      .collection('properties')
      .updateOne(
        { cmsID: reservation.cmsID },
        { $set: { 'availability.$[isBooked].booked': true } },
        {
          arrayFilters: [
            {
              'isBooked.date': {
                $gte: reservation.arriveDate,
                $lte: reservation.departDate,
              },
            },
          ],
        }
      );
  } catch (error) {
    throw new Error('Error booking availability', { cause: error });
  }
}
