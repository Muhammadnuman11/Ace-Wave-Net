import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { isAdminRole } from '@/lib/roles';

export function getTokenFromRequest(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  return null;
}

export function verifyToken(token) {
  if (!token || !process.env.JWT_SECRET) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function signToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role || 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function requireAuth(req, res) {
  const token = getTokenFromRequest(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ success: false, message: 'Login required to complete this action.' });
    return null;
  }
  return payload;
}

export async function requireAdmin(req, res) {
  const payload = requireAuth(req, res);
  if (!payload) return null;

  try {
    await connectDB();
    const user = await User.findById(payload.userId).select('role email name');
    if (!user || !isAdminRole(user.role)) {
      res.status(403).json({ success: false, message: 'Admin access required.' });
      return null;
    }
    return { ...payload, adminUser: user };
  } catch (error) {
    console.error('requireAdmin error:', error);
    res.status(500).json({ success: false, message: 'Authorization failed' });
    return null;
  }
}

export async function getAuthUser(userId) {
  await connectDB();
  return User.findById(userId).select('+password');
}
