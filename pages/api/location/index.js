export default async function handler(req, res) {
  const { q, countrycodes, tag } = req.query;
  console.log('🚀 ~ file: index.js ~ line 3 ~ handler ~ req.query', req.query);
  let acResults = {};

  // validate params
  if (typeof q !== 'string' || !(q && q.length <= 100)) {
    return res.status(500).json({ error: 'bad query request' });
  }
  if (typeof countrycodes !== 'string' || countrycodes.length > 2) {
    return res.status(500).json({ error: 'bad query request' });
  }
  if (typeof tag !== 'string' || tag.length > 50) {
    return res.status(500).json({ error: 'bad query request' });
  }

  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.LOCATIONIQ_API_ACCESS_TOKEN}&q=${q}&countrycodes=${countrycodes}&tag=${tag}`
    );
    acResults = await response.json();
    console.log(
      '🚀 ~ file: index.js ~ line 22 ~ handler ~ acResults',
      acResults
    );
  } catch (e) {
    return res.status(500).json({ error: 'error fetching autocomplete data' });
  }

  res.status(200).json({ data: acResults });
}
