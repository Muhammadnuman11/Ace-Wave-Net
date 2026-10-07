'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SiteLayout from '@/components/layout/SiteLayout';
import ZipSearch from '@/components/ZipSearch';
import PlanCard from '@/components/cards/PlanCard';
import ProviderCard from '@/components/cards/ProviderCard';
import { lookupZip, saveZipToSession } from '@/lib/zipLookup';
import { brandTitle } from '@/lib/brand';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    const zip = router.query.zip;
    if (!zip) {
      setError('Enter a ZIP code to see available providers and plans.');
      return;
    }
    const data = lookupZip(zip);
    if (!data.valid) {
      setError(data.error);
      setResult(null);
    } else {
      saveZipToSession(data.zip);
      setResult(data);
      setError('');
    }
  }, [router.isReady, router.query.zip]);

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('Search Results')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Availability Results</div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Plans &amp; Providers Near You
          </h1>

          <div className="mb-10" id="hero-zip-search">
            <ZipSearch
              defaultZip={router.query.zip || ''}
              redirectToResults={false}
              onSearch={(zip) => router.push(`/results?zip=${zip}`)}
            />
          </div>

          {error && (
            <div className="glass-card p-8 rounded-3xl border border-white/60 text-center mb-10">
              <p className="text-gray-600 font-bold">{error}</p>
            </div>
          )}

          {result && (
            <>
              <div className="glass-card p-6 rounded-3xl border border-white/60 mb-12">
                <p className="text-gray-600 font-medium">
                  Showing results for ZIP <span className="font-black text-gray-900">{result.zip}</span> —{' '}
                  <span className="font-black text-[#00875A]">{result.city}</span> ({result.stateName})
                </p>
              </div>

              <h2 className="font-montserrat text-2xl font-black text-gray-900 mb-6">Available Providers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {result.allProviders.map((p) => (
                  <ProviderCard key={p.slug} provider={p} />
                ))}
              </div>

              <h2 className="font-montserrat text-2xl font-black text-gray-900 mb-6">Recommended Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {result.plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-4 px-10 rounded-full text-center shadow-xl shadow-teal-500/30"
                >
                  Register to purchase
                </Link>
                <Link
                  href="/plans"
                  className="glass-card text-teal-800 font-extrabold py-4 px-10 rounded-full text-center border border-white/60"
                >
                  Compare All Plans
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
