import clientPromise from '../mongodb';

export default async function fetchAvailability(id) {
  const client = await clientPromise;
  const dbProperty = await client
    .db()
    .collection('properties')
    .findOne({ cmsID: id }, { projection: { _id: 0, availability: 1 } });

  const { availability } = dbProperty;
  return availability;
}
