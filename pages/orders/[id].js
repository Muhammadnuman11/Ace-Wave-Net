'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SiteLayout from '@/components/layout/SiteLayout';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { authHeaders } from '@/lib/authClient';
import { brandTitle, BRAND } from '@/lib/brand';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady || authLoading) return;
    if (!isLoggedIn) {
      router.replace(`/login?returnUrl=${encodeURIComponent(router.asPath)}`);
      return;
    }
    if (!router.query.id) return;

    fetch(`/api/orders/${router.query.id}`, { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrder(data.order);
        else setError(data.message || 'Order not found');
      })
      .catch(() => setError('Failed to load order'));
  }, [router.isReady, router.query.id, isLoggedIn, authLoading, router]);

  const isSuccess = router.query.success === '1';

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle(isSuccess ? 'Order Confirmed' : 'Order Details')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="glass-card p-8 rounded-3xl text-center">
              <p className="text-red-600 font-bold mb-4">{error}</p>
              <Link href="/account" className="text-teal-700 font-bold">My account →</Link>
            </div>
          )}

          {order && (
            <div className="glass-card rounded-[2rem] p-8 border border-white/60 text-center">
              {isSuccess && (
                <CheckCircle className="w-16 h-16 text-[#00875A] mx-auto mb-4" />
              )}
              <h1 className="font-montserrat text-3xl font-black text-gray-900 mb-2">
                {isSuccess ? 'Purchase Complete!' : 'Order Details'}
              </h1>
              <p className="text-gray-600 font-medium mb-8">
                {isSuccess
                  ? 'Your plan has been ordered. Our team will contact you shortly to schedule installation.'
                  : 'Review your order information below.'}
              </p>

              <div className="text-left space-y-4 glass-card p-6 rounded-2xl bg-white/30 border border-white/40 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Order #</span>
                  <span className="font-black text-gray-900">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Plan</span>
                  <span className="font-black text-gray-900">
                    {order.provider} — {order.planName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Speed</span>
                  <span className="font-bold">{order.speed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Monthly price</span>
                  <span className="font-montserrat font-black text-[#00875A]">${order.monthlyPrice}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">ZIP</span>
                  <span className="font-bold">{order.zip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Address</span>
                  <span className="font-bold text-right max-w-[60%]">{order.installAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold text-sm">Status</span>
                  <span className="font-black text-teal-700 uppercase text-sm">{order.status}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 font-medium mb-6">
                Questions? Call{' '}
                <a href={BRAND.phoneTel} className="font-black text-[#00875A]">
                  {BRAND.phone}
                </a>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/account"
                  className="bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center"
                >
                  <Package className="w-4 h-4 mr-2" /> My orders
                </Link>
                <Link
                  href="/plans"
                  className="glass-card text-teal-800 font-extrabold py-3 px-8 rounded-full border border-white/60 flex items-center justify-center"
                >
                  Browse more plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
