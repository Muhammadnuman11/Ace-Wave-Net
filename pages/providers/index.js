import Head from 'next/head';
import SiteLayout from '@/components/layout/SiteLayout';
import ProviderCard from '@/components/cards/ProviderCard';
import ZipSearch from '@/components/ZipSearch';
import { providers } from '@/lib/siteData';
import { brandTitle, BRAND } from '@/lib/brand';

export default function ProvidersPage() {
  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('Providers')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">All Providers</div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {BRAND.providerCount}+ Top Internet Providers
          </h1>
          <p className="text-gray-600 font-medium text-lg mb-8 max-w-2xl">{BRAND.heroSubtitle}</p>
          <div className="mb-12 max-w-lg">
            <ZipSearch />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((p) => (
              <ProviderCard key={p.slug} provider={p} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
