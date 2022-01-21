import clientPromise from '../mongodb';

export default async function fetchAvailability(id) {
  const client = await clientPromise;
  const dbProperty = await client
    .db()
    .collection('properties')
    .findOne({ cmsID: id });

  const { availability } = dbProperty;
  return availability;
}
