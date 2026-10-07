import Link from 'next/link';
import ProviderCard from '@/components/cards/ProviderCard';
import { providers } from '@/lib/siteData';
import { BRAND } from '@/lib/brand';

export default function ProvidersSection() {
  return (
    <section className="py-24 relative z-10 border-t border-white/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12">
          <div>
            <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Choose From The Best</div>
            <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm">
              America&apos;s Largest Internet &amp;
              <br />
              Cable TV Providers
            </h2>
            <p className="text-gray-600 font-medium mt-6 max-w-xl text-lg">{BRAND.heroSubtitle}</p>
          </div>
          <Link
            href="/providers"
            className="glass-card text-teal-800 font-extrabold rounded-full px-8 py-3 hover:bg-white/60 transition-all mt-8 lg:mt-0 shadow-sm border border-white/60 whitespace-nowrap inline-block"
          >
            View all {BRAND.providerCount} providers →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((p) => (
            <ProviderCard key={p.slug} provider={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
