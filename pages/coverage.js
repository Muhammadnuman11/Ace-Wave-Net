import Head from 'next/head';
import SiteLayout from '@/components/layout/SiteLayout';
import CoverageSection from '@/components/home/CoverageSection';
import ZipSearch from '@/components/ZipSearch';
import { brandTitle } from '@/lib/brand';

export default function CoveragePage() {
  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('Coverage')}</title>
      </Head>
      <section className="py-12 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <p className="text-gray-600 font-medium mb-6">Enter your ZIP to see providers in your area first:</p>
          <div className="max-w-lg mx-auto">
            <ZipSearch />
          </div>
        </div>
      </section>
      <CoverageSection />
    </SiteLayout>
  );
}
