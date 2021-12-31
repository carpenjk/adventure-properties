import clientPromise from '../../../../utils/mongodb';
import fetchAvailability from '../../../../utils/availability';

export default async function handler(req, res) {
  const { id } = req.query;
  const availability = await fetchAvailability(id);
  // const client = await clientPromise;
  // const dbProperty = await client
  //   .db()
  //   .collection('properties')
  //   .findOne({ cmsID: id });

  // const { availability } = dbProperty;

  res.json(availability);
}
