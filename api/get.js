import { createClient } from 'ioredis';

const redis = createClient(process.env.REDIS_URL);

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { key } = req.query;

  if (!key) {
    return res.status(400).send('Missing key');
  }

  try {
    const value = await redis.get(key);
    if (value !== null) {
      console.log(key,value);
      res.status(200).json({ success: true, key, value });
    } else {
      res.status(404).json({ success: false, message: `Key '${key}' not found` });
    }
  } catch (error) {
    console.error('Redis GET error:', error);
    res.status(500).json({ success: false, message: 'Failed to get value from Redis', error: error.message });
  }
});