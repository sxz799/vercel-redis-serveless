import { createClient } from 'ioredis';

const redis = createClient(process.env.REDIS_URL);

export default async (req, res) => {
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
};