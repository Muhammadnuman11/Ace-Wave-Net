'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { authHeaders } from '@/lib/authClient';
import { Package, Users, Clock, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats', { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.success && setStats(d.stats));
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Orders', value: stats?.totalOrders ?? '—', icon: Package, href: '/admin/orders' },
          { label: 'Pending / Processing', value: stats?.pendingOrders ?? '—', icon: Clock, href: '/admin/orders?status=pending' },
          { label: 'Registered Users', value: stats?.totalUsers ?? '—', icon: Users, href: '/admin/users' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon className="w-8 h-8 text-[#00875A] mb-4" />
              <p className="text-sm font-bold text-gray-500">{card.label}</p>
              <p className="font-montserrat text-4xl font-black text-gray-900 mt-1">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-montserrat font-black text-lg">Recent Orders</h2>
          <Link href="/admin/orders" className="text-teal-700 font-bold text-sm flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {!stats?.recentOrders?.length && (
            <p className="p-6 text-gray-500 font-medium">No orders yet.</p>
          )}
          {stats?.recentOrders?.map((order) => (
            <Link
              key={order._id}
              href={`/admin/orders/${order._id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 hover:bg-gray-50"
            >
              <div>
                <p className="font-black text-gray-900">{order.orderNumber}</p>
                <p className="text-sm text-gray-600">
                  {order.customerName} · {order.provider} {order.planName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={order.status} />
                <span className="font-black text-[#00875A]">${order.monthlyPrice}/mo</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
