import clientPromise from '../mongodb';

export default async function fetchAvailability(id) {
  const client = await clientPromise;
  const availability = await client
    .db()
    .collection('properties')
    .findOne(
      { cmsID: id },
      { projection: { _id: 0, availability: 1, guests: 1 } }
    );

  return availability;
}
