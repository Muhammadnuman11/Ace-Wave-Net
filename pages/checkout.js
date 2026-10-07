'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SiteLayout from '@/components/layout/SiteLayout';
import { Check, Wifi, Lock, ArrowLeft } from 'lucide-react';
import { getPlanById } from '@/lib/siteData';
import { lookupZip, getSavedZip, saveZipToSession } from '@/lib/zipLookup';
import { useAuth } from '@/hooks/useAuth';
import { authHeaders } from '@/lib/authClient';
import { brandTitle } from '@/lib/brand';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading, isLoggedIn, isAdmin } = useAuth();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    zip: '',
    installAddress: '',
    phone: '',
    city: '',
    state: '',
    agree: false,
  });

  useEffect(() => {
    if (!authLoading && isAdmin) {
      router.replace('/admin');
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    if (!router.isReady) return;
    const planId = router.query.planId;
    if (!planId) {
      setError('No plan selected. Please choose a plan first.');
      return;
    }
    const found = getPlanById(planId);
    if (!found) {
      setError('Plan not found.');
      return;
    }
    setPlan(found);
    const zip = String(router.query.zip || getSavedZip() || '');
    if (zip) {
      const z = lookupZip(zip);
      setForm((prev) => ({
        ...prev,
        zip: z.valid ? z.zip : zip.replace(/\D/g, '').slice(0, 5),
        city: z.valid ? z.city : prev.city,
        state: z.valid ? z.state : prev.state,
      }));
    }
  }, [router.isReady, router.query.planId, router.query.zip]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleZipBlur = () => {
    const z = lookupZip(form.zip);
    if (z.valid) {
      setForm((prev) => ({ ...prev, zip: z.zip, city: z.city, state: z.state }));
      saveZipToSession(z.zip);
    }
  };

  const returnUrl = encodeURIComponent(
    `/checkout?planId=${router.query.planId || ''}&zip=${form.zip || ''}`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please sign in or create an account to purchase.');
      return;
    }
    if (!form.agree) {
      setError('Please agree to the terms to continue.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          planId: plan.id,
          zip: form.zip,
          installAddress: form.installAddress,
          phone: form.phone,
          city: form.city,
          state: form.state,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Purchase failed. Please try again.');
        return;
      }
      router.push(`/orders/${data.order.id}?success=1`);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!router.isReady || authLoading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center font-bold text-gray-600">Loading checkout...</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('Checkout')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <Link href={plan ? `/plans/${plan.id}` : '/plans'} className="text-teal-700 font-bold flex items-center mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to plan
          </Link>

          <h1 className="font-montserrat text-4xl font-black text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600 font-medium mb-8">
            Registration is required to purchase a plan on {brandTitle().split(' - ')[0]}.
          </p>

          {!isLoggedIn && (
            <div className="glass-card p-6 rounded-3xl border border-amber-200/80 bg-amber-50/40 mb-8">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-3">Sign in or register to continue</p>
                  <p className="text-gray-600 text-sm mb-4">
                    You must have an account before purchasing an internet plan.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/login?returnUrl=${returnUrl}`}
                      className="bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-3 px-6 rounded-full"
                    >
                      Sign in
                    </Link>
                    <Link
                      href={`/register?returnUrl=${returnUrl}`}
                      className="glass-card text-teal-800 font-extrabold py-3 px-6 rounded-full border border-white/60"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && !plan && (
            <div className="glass-card p-6 rounded-2xl text-center">
              <p className="text-red-600 font-bold mb-4">{error}</p>
              <Link href="/plans" className="text-teal-700 font-bold">Browse plans →</Link>
            </div>
          )}

          {plan && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="glass-card rounded-[2rem] p-6 border border-white/60 sticky top-28">
                  <p className="text-[10px] font-black text-[#00875A] uppercase tracking-widest mb-3">Order summary</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`font-montserrat font-black text-xl ${plan.pColor}`}>{plan.provider}</span>
                    <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100/50 px-3 py-1 rounded-full flex items-center uppercase">
                      <Wifi className="w-3 h-3 mr-1" />
                      {plan.type}
                    </span>
                  </div>
                  <h2 className="font-montserrat text-2xl font-black text-gray-900 mb-1">{plan.name}</h2>
                  <p className="text-gray-500 font-bold mb-4">{plan.speed}</p>
                  <div className="font-montserrat text-4xl font-black text-gray-900 mb-6">
                    ${plan.price}
                    <span className="text-base text-gray-500 font-quicksand">/mo</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center text-sm text-gray-700 font-semibold">
                        <Check className="w-4 h-4 text-teal-600 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-8 border border-white/60 space-y-5">
                  {isLoggedIn && (
                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 text-sm">
                      <span className="font-bold text-gray-800">Purchasing as:</span>{' '}
                      <span className="text-[#00875A] font-black">{user.name}</span> ({user.email})
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        onBlur={handleZipBlur}
                        maxLength={5}
                        required
                        className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                        placeholder="12345"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        disabled={!isLoggedIn}
                        className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium disabled:opacity-60"
                        placeholder="555-123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Installation address *</label>
                    <input
                      name="installAddress"
                      value={form.installAddress}
                      onChange={handleChange}
                      required
                      disabled={!isLoggedIn}
                      className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none focus:ring-2 focus:ring-teal-500 font-medium disabled:opacity-60"
                      placeholder="123 Main St, Apt 4"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        disabled={!isLoggedIn}
                        className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none font-medium disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        maxLength={2}
                        disabled={!isLoggedIn}
                        className="w-full glass-card px-4 py-3 rounded-xl border border-white/60 outline-none font-medium disabled:opacity-60 uppercase"
                        placeholder="TX"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      disabled={!isLoggedIn}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      I agree to the service terms. Pricing may vary by location. A licensed agent may contact me to
                      schedule installation.
                    </span>
                  </label>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isLoggedIn || submitting}
                    className="w-full bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : `Confirm Purchase — $${plan.price}/mo`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
