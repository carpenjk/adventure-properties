import fetchAvailability from '../../../../utils/adapters/availability';

export default async function handler(req, res) {
  const { propID } = req.query;
  try {
    if (!(propID && propID.length < 23)) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
    const availability = await fetchAvailability(propID);
    return res.json(availability);
  } catch (e) {
    return res.status(500).json({ error: 'Property not found' });
  }
}
