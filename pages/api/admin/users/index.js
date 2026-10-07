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

    const { search } = req.query;
    const filter = { role: 'user' };

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const users = await User.find(filter).sort({ createdAt: -1 }).lean();

    const usersWithCounts = await Promise.all(
      users.map(async (u) => {
        const orderCount = await Order.countDocuments({ user: u._id });
        return { ...toPublicUser(u), orderCount };
      })
    );

    return res.status(200).json({ success: true, users: usersWithCounts });
  } catch (error) {
    console.error('Admin users list error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load users' });
  }
}
