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
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(400).send('Missing key or value');
  }

  try {
    await redis.set(key, value);
    res.status(200).json({ success: true, message: `Key '${key}' set to '${value}'` });
  } catch (error) {
    console.error('Redis SET error:', error);
    res.status(500).json({ success: false, message: 'Failed to set value in Redis', error: error.message });
  }
});