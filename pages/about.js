import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import ZipSearch from '@/components/ZipSearch';
import { BRAND, brandTitle } from '@/lib/brand';

export default function AboutPage() {
  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle('About Us')}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">About</div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6">About {BRAND.name}</h1>
          <div className="glass-card p-8 rounded-3xl border border-white/60 space-y-6 text-gray-600 font-medium leading-relaxed">
            <p>
              {BRAND.name} is your trusted comparison hub for home internet, cable TV, home phone and mobile services
              across the USA. We help millions of households find the right plan at the right price — 100% free and
              unbiased.
            </p>
            <p>{BRAND.heroSubtitle}</p>
            <p>
              Our licensed agents are available 7 days a week at{' '}
              <a href={BRAND.phoneTel} className="font-black text-[#00875A]">
                {BRAND.phone}
              </a>{' '}
              or{' '}
              <a href={`mailto:${BRAND.email}`} className="font-black text-[#00875A]">
                {BRAND.email}
              </a>
              .
            </p>
          </div>
          <div className="mt-10">
            <ZipSearch />
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/providers" className="text-teal-700 font-bold hover:text-[#00875A]">
              Browse providers →
            </Link>
            <Link href="/plans" className="text-teal-700 font-bold hover:text-[#00875A]">
              Compare plans →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
