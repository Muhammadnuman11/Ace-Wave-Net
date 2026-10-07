import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/authServer';
import { getPlanById } from '@/lib/siteData';

const VALID_STATUSES = ['pending', 'processing', 'confirmed', 'active', 'cancelled'];

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  await connectDB();

  if (req.method === 'GET') {
    try {
      const order = await Order.findById(req.query.id)
        .populate('user', 'name email phone address city state zip role createdAt')
        .lean();

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      return res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Admin get order error:', error);
      return res.status(500).json({ success: false, message: 'Failed to load order' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const order = await Order.findById(req.query.id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      const { status, notes, planId, installAddress, phone, zip, city, state } = req.body;

      if (status !== undefined) {
        if (!VALID_STATUSES.includes(status)) {
          return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        order.status = status;
        if (['processing', 'confirmed', 'active'].includes(status)) {
          order.processedBy = admin.userId;
          order.processedAt = new Date();
        }
      }

      if (notes !== undefined) order.notes = String(notes).trim();

      if (planId !== undefined) {
        const plan = getPlanById(planId);
        if (!plan) {
          return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        order.planId = plan.id;
        order.planSlug = plan.slug;
        order.provider = plan.provider;
        order.providerSlug = plan.providerSlug;
        order.planName = plan.name;
        order.planType = plan.type;
        order.speed = plan.speed;
        order.monthlyPrice = plan.price;
      }

      if (installAddress !== undefined) order.installAddress = String(installAddress).trim();
      if (phone !== undefined) order.phone = String(phone).trim();
      if (zip !== undefined) order.zip = String(zip).replace(/\D/g, '').slice(0, 5);
      if (city !== undefined) order.city = String(city).trim();
      if (state !== undefined) order.state = String(state).trim();

      await order.save();

      const updated = await Order.findById(order._id)
        .populate('user', 'name email phone')
        .lean();

      return res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        order: updated,
      });
    } catch (error) {
      console.error('Admin update order error:', error);
      return res.status(500).json({ success: false, message: 'Failed to update order' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
