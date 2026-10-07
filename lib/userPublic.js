export function toPublicUser(user) {
  if (!user) return null;
  return {
    id: user._id?.toString?.() || user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    zip: user.zip || '',
    createdAt: user.createdAt,
  };
}
