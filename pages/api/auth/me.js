import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/authServer';
import { toPublicUser } from '@/lib/userPublic';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const payload = requireAuth(req, res);
  if (!payload) return;

  try {
    await connectDB();
    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user: toPublicUser(user) });
  } catch (error) {
    console.error('Auth me error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
