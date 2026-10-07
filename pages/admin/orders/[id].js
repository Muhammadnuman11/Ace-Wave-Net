'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout, { AdminBreadcrumb } from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { authHeaders } from '@/lib/authClient';
import { ORDER_STATUSES } from '@/lib/orderStatus';
import { plans } from '@/lib/siteData';
import { Save, User } from 'lucide-react';

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.query.id) return;
    fetch(`/api/admin/orders/${router.query.id}`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setOrder(d.order);
          setForm({
            status: d.order.status,
            notes: d.order.notes || '',
            planId: d.order.planId,
            installAddress: d.order.installAddress,
            phone: d.order.phone,
            zip: d.order.zip,
            city: d.order.city || '',
            state: d.order.state || '',
          });
        } else setError(d.message);
      })
      .finally(() => setLoading(false));
  }, [router.query.id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const res = await fetch(`/api/admin/orders/${router.query.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        ...form,
        planId: Number(form.planId),
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.message || 'Update failed');
      return;
    }
    setOrder(data.order);
    setMessage('Order updated successfully.');
  };

  if (loading) {
    return (
      <AdminLayout title="Process Order">
        <p className="text-gray-500 font-medium">Loading...</p>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout title="Process Order">
        <p className="text-red-600 font-bold">{error || 'Order not found'}</p>
        <Link href="/admin/orders" className="text-teal-700 font-bold mt-4 inline-block">
          ← Back to orders
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Order ${order.orderNumber}`}>
      <AdminBreadcrumb
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Orders', href: '/admin/orders' },
          { label: order.orderNumber },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="font-montserrat font-black text-lg">Process order</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-bold"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Change plan</label>
                <select
                  value={form.planId}
                  onChange={(e) => setForm((f) => ({ ...f, planId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.provider} — {p.name} ({p.speed}) ${p.price}/mo
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Install address</label>
              <input
                value={form.installAddress}
                onChange={(e) => setForm((f) => ({ ...f, installAddress: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ZIP</label>
                <input
                  value={form.zip}
                  onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                <input
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Internal notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-medium resize-none"
                placeholder="Installation notes, follow-up calls..."
              />
            </div>

            {message && (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-semibold">{message}</div>
            )}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">{error}</div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-[#00875A] text-white font-bold py-3 px-8 rounded-xl flex items-center hover:bg-teal-700 disabled:opacity-60"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Current status</p>
            <StatusBadge status={order.status} />
            <p className="mt-4 font-montserrat font-black text-2xl text-gray-900">
              {order.provider} — {order.planName}
            </p>
            <p className="text-gray-600 font-medium">{order.speed}</p>
            <p className="font-black text-[#00875A] text-xl mt-2">${order.monthlyPrice}/mo</p>
            <p className="text-xs text-gray-400 mt-4">
              Created {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {order.user && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#00875A]" />
                <h3 className="font-montserrat font-black">Customer</h3>
              </div>
              <p className="font-bold text-gray-900">{order.user.name}</p>
              <p className="text-sm text-gray-600">{order.user.email}</p>
              {order.user.phone && <p className="text-sm text-gray-600 mt-1">{order.user.phone}</p>}
              <Link
                href={`/admin/users/${order.user._id}`}
                className="text-teal-700 font-bold text-sm mt-4 inline-block hover:underline"
              >
                View user profile →
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
