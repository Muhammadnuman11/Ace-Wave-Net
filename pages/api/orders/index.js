import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import { requireAuth } from '@/lib/authServer';
import { getPlanById } from '@/lib/siteData';
import { lookupZip } from '@/lib/zipLookup';
import { generateOrderNumber } from '@/lib/orders';
import { isAdminRole } from '@/lib/roles';

export default async function handler(req, res) {
  const payload = requireAuth(req, res);
  if (!payload) return;

  await connectDB();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find({ user: payload.userId })
        .sort({ createdAt: -1 })
        .lean();
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('List orders error:', error);
      return res.status(500).json({ success: false, message: 'Failed to load orders' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { planId, zip, installAddress, phone, city, state } = req.body;

      if (!planId || !zip || !installAddress || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Plan, ZIP code, install address, and phone are required.',
        });
      }

      const plan = getPlanById(planId);
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      const zipResult = lookupZip(zip);
      if (!zipResult.valid) {
        return res.status(400).json({ success: false, message: zipResult.error });
      }

      const user = await User.findById(payload.userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (isAdminRole(user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Admin accounts cannot purchase plans. Use a customer account.',
        });
      }

      const orderNumber = generateOrderNumber();

      const order = await Order.create({
        user: user._id,
        orderNumber,
        planId: plan.id,
        planSlug: plan.slug,
        provider: plan.provider,
        providerSlug: plan.providerSlug,
        planName: plan.name,
        planType: plan.type,
        speed: plan.speed,
        monthlyPrice: plan.price,
        zip: zipResult.zip,
        city: city || zipResult.city,
        state: state || zipResult.state,
        installAddress: installAddress.trim(),
        phone: phone.trim(),
        customerName: user.name,
        customerEmail: user.email,
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Plan purchased successfully!',
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          planName: order.planName,
          provider: order.provider,
          monthlyPrice: order.monthlyPrice,
          status: order.status,
          createdAt: order.createdAt,
        },
      });
    } catch (error) {
      console.error('Create order error:', error);
      if (error.code === 11000) {
        return res.status(409).json({ success: false, message: 'Order conflict, please try again.' });
      }
      return res.status(500).json({ success: false, message: 'Failed to create order' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
