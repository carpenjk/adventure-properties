import { fetchActivities } from '../../utils/adapters/activities';

export default async function handler(req, res) {
  const { q } = req.query;
  const isValid = typeof q === 'string' && q.length < 50;
  try {
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
    const activities = await fetchActivities(q);
    return res.json(activities);
  } catch (e) {
    return res.status(500).json({ error: 'error fetching activities' });
  }
}
