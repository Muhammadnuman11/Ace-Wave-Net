import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/authServer';
import { toPublicUser } from '@/lib/userPublic';
import { isAdminRole } from '@/lib/roles';

export default async function handler(req, res) {
  const payload = requireAuth(req, res);
  if (!payload) return;

  await connectDB();

  if (req.method === 'GET') {
    try {
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, user: toPublicUser(user) });
    } catch (error) {
      console.error('Profile GET error:', error);
      return res.status(500).json({ success: false, message: 'Failed to load profile' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      if (isAdminRole(user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Admins manage settings from the admin dashboard.',
        });
      }

      const { name, phone, address, city, state, zip } = req.body;

      if (name !== undefined) user.name = String(name).trim();
      if (phone !== undefined) user.phone = String(phone).trim();
      if (address !== undefined) user.address = String(address).trim();
      if (city !== undefined) user.city = String(city).trim();
      if (state !== undefined) user.state = String(state).trim().toUpperCase().slice(0, 2);
      if (zip !== undefined) user.zip = String(zip).replace(/\D/g, '').slice(0, 5);

      if (!user.name) {
        return res.status(400).json({ success: false, message: 'Name is required' });
      }

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: toPublicUser(user),
      });
    } catch (error) {
      console.error('Profile PATCH error:', error);
      return res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
