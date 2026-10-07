'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout, { AdminBreadcrumb } from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { authHeaders } from '@/lib/authClient';
import { ORDER_STATUSES } from '@/lib/orderStatus';
import { Search } from 'lucide-react';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const loadOrders = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (search.trim()) params.set('search', search.trim());

    fetch(`/api/admin/orders?${params}`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setOrders(d.orders);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (router.query.status) setStatus(String(router.query.status));
  }, [router.query.status]);

  useEffect(() => {
    loadOrders();
  }, [status]);

  return (
    <AdminLayout title="Manage Orders">
      <AdminBreadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Orders' }]} />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadOrders()}
              placeholder="Search order #, customer, provider..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 font-medium outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none"
          >
            <option value="all">All statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={loadOrders}
            className="bg-[#00875A] text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p className="p-8 text-gray-500 font-medium">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="p-8 text-gray-500 font-medium">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">ZIP</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-black text-gray-900">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {order.provider} — {order.planName}
                      <br />
                      <span className="text-gray-500">{order.speed}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">{order.zip}</td>
                    <td className="px-6 py-4 font-black text-[#00875A]">${order.monthlyPrice}/mo</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="text-teal-700 font-bold text-sm hover:underline"
                      >
                        Process →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
