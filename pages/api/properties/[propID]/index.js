import {
  fetchProperties,
  fetchProperty,
} from '../../../../controllers/property/property';

export default async function handler(req, res) {
  const { propID } = req.query;
  const aryIDs = propID.split(',');
  let properties;

  try {
    if (aryIDs) {
      if (aryIDs.length < 1) {
        return res.status(400).json({ error: 'Invalid request parameters' });
      }
      if (aryIDs.length > 1) {
        properties = await fetchProperties(aryIDs);
      } else {
        properties = await fetchProperty(propID);
      }
    }
  } catch (e) {
    return res.status(500).json({ error: 'Property not found' });
  }
  res.json(properties);
}
