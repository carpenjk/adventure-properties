export default async function handler(req, res) {
  console.log('server recieved search request');
  const { query } = req;
  console.log('query', query);
  try {
    console.log('searching');
  } catch (e) {
    return res.status(500).json({ error: 'Invalid Search Parameters' });
  }
  res.json({ data: 'hello world' });
}
