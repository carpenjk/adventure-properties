import clientPromise from '../../../../utils/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  console.log('🚀 ~ file: availability.js ~ line 5 ~ handler ~ id', id);

  const client = await clientPromise;
  const dbProperty = await client
    .db()
    .collection('properties')
    .findOne({ cmsID: id });
  console.log(
    '🚀 ~ file: availability.js ~ line 11 ~ handler ~ dbProperties',
    dbProperty
  );

  const { availability } = dbProperty;

  res.json(availability);
}
