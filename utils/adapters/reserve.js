import clientPromise from '../mongodb';

export default async function saveReservation(reservation) {
  const client = await clientPromise;
  console.log(`reservation.cmsID: ${reservation.cmsID}`);
  try {
    await client.db().collection('reservations').insertOne(reservation);
  } catch (error) {
    // error
    console.log(
      '🚀 ~ file: reserve.js ~ line 9 ~ saveReservation ~ error',
      error
    );
  }

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
                $gte: reservation.start_date,
                $lte: reservation.end_date,
              },
            },
          ],
        }
      );
    console.log(`saved reservation: ${reservation.cmsID}`);
  } catch (error) {
    // error
    console.log(
      '🚀 ~ file: reserve.js ~ line 33 ~ saveReservation ~ error',
      error
    );
  }
}
