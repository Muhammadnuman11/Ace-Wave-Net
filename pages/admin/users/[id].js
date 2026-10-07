'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout, { AdminBreadcrumb } from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { authHeaders } from '@/lib/authClient';
import { Mail, Phone, MapPin, Package } from 'lucide-react';

export default function AdminUserDetailPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.query.id) return;
    fetch(`/api/admin/users/${router.query.id}`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.success && setData(d))
      .finally(() => setLoading(false));
  }, [router.query.id]);

  if (loading) {
    return (
      <AdminLayout title="User Details">
        <p className="text-gray-500">Loading...</p>
      </AdminLayout>
    );
  }

  if (!data?.user) {
    return (
      <AdminLayout title="User Details">
        <p className="text-red-600 font-bold">User not found</p>
      </AdminLayout>
    );
  }

  const { user, orders } = data;

  return (
    <AdminLayout title={user.name}>
      <AdminBreadcrumb
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Users', href: '/admin/users' },
          { label: user.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-montserrat font-black text-lg mb-6">User details</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-teal-600" />
              <span className="font-medium">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="font-medium">{user.phone}</span>
              </div>
            )}
            {(user.address || user.city) && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-600 mt-0.5" />
                <span className="font-medium">
                  {[user.address, user.city, user.state, user.zip].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
            <p className="text-gray-500 font-bold pt-2">
              Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </p>
            <p className="text-[10px] font-black uppercase text-gray-400">Role: {user.role}</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#00875A]" />
            <h2 className="font-montserrat font-black text-lg">Orders ({orders.length})</h2>
          </div>
          {orders.length === 0 ? (
            <p className="p-6 text-gray-500 font-medium">No orders yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  href={`/admin/orders/${order._id}`}
                  className="flex justify-between items-center px-6 py-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-black text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">
                      {order.provider} — {order.planName} · ${order.monthlyPrice}/mo
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
