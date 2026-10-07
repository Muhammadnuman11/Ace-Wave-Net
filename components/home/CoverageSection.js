'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { stateList, stateNames, getProvidersForState } from '@/lib/siteData';

export default function CoverageSection() {
  const [activeState, setActiveState] = useState('TX');
  const stateProviders = getProvidersForState(activeState);
  const title = stateNames[activeState] || activeState;

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="text-center mb-16">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Nationwide Coverage</div>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm">
            Cable &amp; Internet Service Providers In The US
          </h2>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">
            See which internet providers are available in your state. Click any state to explore coverage.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 glass-card p-8 rounded-[2rem] border border-white/60">
            <div className="flex flex-wrap gap-3 justify-center">
              {stateList.map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => setActiveState(sc)}
                  className={`w-14 h-14 rounded-2xl font-montserrat font-black text-sm flex items-center justify-center transition-all border shadow-sm ${
                    activeState === sc
                      ? 'bg-gradient-to-br from-[#00875A] to-teal-500 text-white border-transparent shadow-teal-500/40 transform scale-110 z-10 relative'
                      : 'glass-card text-gray-700 border-white/60 hover:bg-white/80 hover:-translate-y-1'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
            <div className="mt-10 flex items-center font-bold text-sm text-gray-600 justify-center glass-card w-max mx-auto px-6 py-3 rounded-full border border-white/60">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#00875A] to-teal-500 mr-3 shadow-inner" /> Selected
              <div className="w-4 h-4 rounded-full bg-white/50 border border-gray-300 ml-8 mr-3 shadow-inner" /> Available
            </div>
          </div>

          <div className="lg:w-1/3 glass-card p-8 rounded-[2rem] border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-200/40 to-transparent rounded-bl-full -z-10" />
            <div className="flex items-center text-[10px] font-black text-teal-800 uppercase tracking-widest mb-4 bg-teal-100/50 w-max px-3 py-1.5 rounded-full border border-teal-200/50">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Providers found in
            </div>
            <h3 className="font-montserrat text-4xl font-black text-gray-900 mb-2 drop-shadow-sm">{title}</h3>

            <p className="text-gray-500 font-bold mb-8 text-sm">{stateProviders.length} providers serving this area</p>
            <div className="space-y-4">
              {stateProviders.map((p) => (
                <Link
                  key={p.slug || p.name}
                  href={`/providers/${p.slug || 'xfinity'}`}
                  className="flex justify-between items-center glass-card border border-white/60 rounded-2xl p-4 hover:bg-white/70 transition-all group shadow-sm"
                >
                  <span className="font-montserrat font-bold text-lg text-gray-800 drop-shadow-sm">{p.name}</span>
                  <div className="text-right flex items-center">
                    <div>
                      <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider leading-none mb-1">
                        from
                      </div>
                      <div className="font-black text-base text-gray-900 drop-shadow-sm">
                        ${p.price}
                        <span className="text-xs font-bold text-gray-500">/mo</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center ml-4 group-hover:bg-teal-100 transition-colors shadow-inner">
                      <ArrowRight className="w-4 h-4 text-teal-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/coverage"
              className="block mt-6 text-center text-teal-700 font-bold text-sm hover:text-[#00875A]"
            >
              Full coverage map →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
