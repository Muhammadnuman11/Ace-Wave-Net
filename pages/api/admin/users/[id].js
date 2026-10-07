import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/authServer';
import { toPublicUser } from '@/lib/userPublic';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    await connectDB();

    const user = await User.findById(req.query.id).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      user: toPublicUser(user),
      orders,
    });
  } catch (error) {
    console.error('Admin user detail error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load user' });
  }
}
