'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout, { AdminBreadcrumb } from '@/components/admin/AdminLayout';
import { authHeaders } from '@/lib/authClient';
import { Search } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const params = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';
    fetch(`/api/admin/users${params}`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.success && setUsers(d.users))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminLayout title="Users">
      <AdminBreadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Users' }]} />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load()}
              placeholder="Search name, email, phone..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 font-medium outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="button"
            onClick={load}
            className="bg-[#00875A] text-white font-bold px-6 py-3 rounded-xl"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p className="p-8 text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="p-8 text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Orders</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-gray-600">{u.phone || '—'}</td>
                    <td className="px-6 py-4 font-black text-[#00875A]">{u.orderCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/users/${u.id}`} className="text-teal-700 font-bold text-sm hover:underline">
                        Details →
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
