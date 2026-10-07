'use client';

import { useState } from 'react';
import Head from 'next/head';
import SiteLayout from '@/components/layout/SiteLayout';
import PlanCard from '@/components/cards/PlanCard';
import ZipSearch from '@/components/ZipSearch';
import { plans, planFilters, filterPlans } from '@/lib/siteData';
import { brandTitle } from '@/lib/brand';

export default function PlansPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = filterPlans(activeFilter);

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('Compare Plans')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">All Plans</div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Compare Top Internet Plans
          </h1>
          <p className="text-gray-600 font-medium text-lg mb-8 max-w-2xl mx-auto">
            Every plan, every provider, in one place. Filter by technology to find exactly what fits your home.
          </p>
          <div className="mb-12 max-w-lg mx-auto">
            <ZipSearch />
          </div>

          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {planFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-8 py-3 rounded-full font-extrabold text-sm transition-all border border-white/60 shadow-sm ${
                  activeFilter === f
                    ? 'bg-gradient-to-r from-[#00875A] to-teal-500 text-white shadow-teal-500/40 transform scale-105'
                    : 'glass-card text-gray-700 hover:bg-white/70'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {filtered.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
