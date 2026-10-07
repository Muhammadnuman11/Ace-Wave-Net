'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlanCard from '@/components/cards/PlanCard';
import { plans, planFilters, filterPlans } from '@/lib/siteData';

export default function PlansSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = filterPlans(activeFilter).slice(0, 4);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 text-center">
        <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">1-Stop Shop Comparison</div>
        <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm">
          Compare Top Internet Plans <br />
          Side-By-Side
        </h2>
        <p className="text-gray-600 font-medium mb-12 max-w-2xl mx-auto text-lg">
          Every plan, every provider, in one place. Filter by technology to find exactly what fits your home.
        </p>

        <div className="flex justify-center flex-wrap gap-3 mb-16">
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

        <Link
          href="/plans"
          className="inline-block mt-12 glass-card text-teal-800 font-extrabold rounded-full px-8 py-3 hover:bg-white/60 transition-all shadow-sm border border-white/60"
        >
          View all plans →
        </Link>
      </div>
    </section>
  );
}
