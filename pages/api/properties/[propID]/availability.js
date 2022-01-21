import fetchAvailability from '../../../../utils/adapters/availability';

export default async function handler(req, res) {
  const { propID } = req.query;
  const availability = await fetchAvailability(propID);

  res.json(availability);
}
