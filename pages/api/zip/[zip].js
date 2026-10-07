import { lookupZip } from '@/lib/zipLookup';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { zip } = req.query;
  const result = lookupZip(zip);

  if (!result.valid) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}
