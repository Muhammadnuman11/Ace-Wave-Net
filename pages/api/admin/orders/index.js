import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/authServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    await connectDB();

    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { orderNumber: regex },
        { customerName: regex },
        { customerEmail: regex },
        { provider: regex },
      ];
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone role')
      .lean();

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Admin orders list error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load orders' });
  }
}
