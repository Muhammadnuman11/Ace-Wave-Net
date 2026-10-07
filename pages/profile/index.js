'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SiteLayout from '@/components/layout/SiteLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAuth } from '@/hooks/useAuth';
import { authHeaders, setAuth } from '@/lib/authClient';
import { brandTitle } from '@/lib/brand';
import { User, Lock, Package, LogOut, ShoppingBag, Save } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'plans', label: 'My Plans', icon: Package },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, isLoggedIn, isAdmin, logout, refresh } = useAuth();
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [saving, setSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn) {
      router.replace(`/login?returnUrl=${encodeURIComponent('/profile')}`);
      return;
    }
    if (isAdmin) {
      router.replace('/admin');
    }
  }, [loading, isLoggedIn, isAdmin, router]);

  useEffect(() => {
    if (!isLoggedIn || isAdmin) return;
    fetch('/api/profile', { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setProfile({
            name: d.user.name || '',
            phone: d.user.phone || '',
            address: d.user.address || '',
            city: d.user.city || '',
            state: d.user.state || '',
            zip: d.user.zip || '',
            email: d.user.email || '',
          });
        }
      });
  }, [isLoggedIn, isAdmin]);

  useEffect(() => {
    if (tab !== 'plans' || !isLoggedIn) return;
    setOrdersLoading(true);
    fetch('/api/orders', { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => d.success && setOrders(d.orders))
      .finally(() => setOrdersLoading(false));
  }, [tab, isLoggedIn]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setProfileErr('');
    setProfileMsg('');

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setProfileErr(data.message || 'Update failed');
      return;
    }
    setAuth({ token: localStorage.getItem('token'), user: data.user });
    refresh();
    setProfileMsg('Profile saved successfully.');
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPwdErr('');
    setPwdMsg('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPwdErr('New passwords do not match');
      return;
    }

    setSaving(true);
    const res = await fetch('/api/profile/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setPwdErr(data.message || 'Password update failed');
      return;
    }
    setPwdMsg('Password updated successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (loading || isAdmin) {
    return (
      <SiteLayout>
        <div className="py-32 text-center font-bold text-gray-600">Loading...</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('My Profile')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
            <div>
              <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-2">
                My Account
              </div>
              <h1 className="font-montserrat text-4xl font-black text-gray-900">Profile</h1>
              <p className="text-gray-600 font-medium">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="glass-card text-gray-700 font-bold py-3 px-6 rounded-full border border-white/60 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all ${
                    tab === t.id
                      ? 'bg-gradient-to-r from-[#00875A] to-teal-500 text-white shadow-lg'
                      : 'glass-card text-gray-700 border border-white/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {tab === 'profile' && (
            <form
              onSubmit={handleProfileSave}
              className="glass-card rounded-[2rem] p-8 border border-white/60 space-y-5"
            >
              <h2 className="font-montserrat font-black text-xl text-gray-900">Personal details</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  value={profile.email || ''}
                  disabled
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 font-medium text-gray-500 opacity-80"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full name *</label>
                <input
                  name="name"
                  value={profile.name || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input
                  name="phone"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                <input
                  name="address"
                  value={profile.address || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input
                    value={profile.city || ''}
                    onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                    className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                  <input
                    value={profile.state || ''}
                    onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                    maxLength={2}
                    className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 font-medium uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ZIP</label>
                  <input
                    value={profile.zip || ''}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))
                    }
                    maxLength={5}
                    className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 font-medium"
                  />
                </div>
              </div>
              {profileMsg && (
                <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-semibold">{profileMsg}</div>
              )}
              {profileErr && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">{profileErr}</div>
              )}
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-3 px-8 rounded-full flex items-center disabled:opacity-60"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save profile'}
              </button>
            </form>
          )}

          {tab === 'password' && (
            <form
              onSubmit={handlePasswordSave}
              className="glass-card rounded-[2rem] p-8 border border-white/60 space-y-5"
            >
              <h2 className="font-montserrat font-black text-xl text-gray-900">Reset password</h2>
              <p className="text-gray-600 text-sm font-medium">Enter your current password, then choose a new one.</p>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Current password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))
                  }
                  required
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                  required
                  minLength={6}
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm new password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))
                  }
                  required
                  className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
              {pwdMsg && (
                <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-semibold">{pwdMsg}</div>
              )}
              {pwdErr && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">{pwdErr}</div>
              )}
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-60"
              >
                {saving ? 'Updating...' : 'Update password'}
              </button>
            </form>
          )}

          {tab === 'plans' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-montserrat font-black text-xl text-gray-900">My purchased plans</h2>
                <Link
                  href="/plans"
                  className="bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-2 px-5 rounded-full text-sm flex items-center"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Browse plans
                </Link>
              </div>

              {ordersLoading && <p className="text-gray-600 font-medium">Loading plans...</p>}

              {!ordersLoading && orders.length === 0 && (
                <div className="glass-card p-10 rounded-3xl border border-white/60 text-center">
                  <p className="text-gray-600 font-medium mb-4">No plans purchased yet.</p>
                  <Link href="/plans" className="text-teal-700 font-bold">
                    Find a plan →
                  </Link>
                </div>
              )}

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="glass-card p-6 rounded-2xl border border-white/60 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">{order.orderNumber}</p>
                      <p className="font-montserrat font-black text-lg text-gray-900">
                        {order.provider} — {order.planName}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        {order.speed} · {order.planType} · ZIP {order.zip}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{order.installAddress}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="font-montserrat font-black text-xl text-[#00875A]">
                        ${order.monthlyPrice}/mo
                      </p>
                      <StatusBadge status={order.status} />
                      <Link
                        href={`/orders/${order._id}`}
                        className="text-teal-700 font-bold text-sm hover:underline"
                      >
                        View order →
                      </Link>
                      {['pending', 'processing'].includes(order.status) && (
                        <Link
                          href={`/checkout?planId=${order.planId}&zip=${order.zip}`}
                          className="text-xs font-bold text-gray-500 hover:text-[#00875A]"
                        >
                          Change plan (new order)
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
