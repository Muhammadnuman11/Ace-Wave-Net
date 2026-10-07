import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import ZipSearch from '@/components/ZipSearch';
import PlanCard from '@/components/cards/PlanCard';
import { ArrowLeft, Phone } from 'lucide-react';
import { getServiceBySlug, services, plans } from '@/lib/siteData';
import { brandTitle, BRAND } from '@/lib/brand';

const servicePlans = {
  internet: plans,
  'cable-tv': plans.slice(0, 3),
  'home-phone': plans.slice(2, 5),
  mobile: plans.slice(3, 6),
};

export default function ServicePage({ service, relatedPlans }) {
  if (!service) {
    return (
      <SiteLayout>
        <Head><title>{brandTitle('Service Not Found')}</title></Head>
        <section className="py-20 px-4 text-center">
          <Link href="/" className="text-teal-700 font-bold">← Home</Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle(service.title)}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-teal-700 font-bold flex items-center mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Home
          </Link>
          <div className="glass-card p-10 rounded-3xl border border-white/60 mb-12">
            <div className="font-montserrat text-transparent bg-clip-text bg-gradient-to-br from-[#00875A] to-teal-300 text-6xl font-black mb-4">
              {service.num}
            </div>
            <h1 className="font-montserrat text-4xl font-black text-gray-900 mb-4">{service.title}</h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mb-8">{service.desc}</p>
            <a
              href={BRAND.phoneTel}
              className="inline-flex bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-3 px-8 rounded-full items-center"
            >
              <Phone className="w-4 h-4 mr-2" /> Talk to an agent
            </a>
          </div>
          <div className="mb-10 max-w-lg">
            <ZipSearch />
          </div>
          {relatedPlans.length > 0 && (
            <>
              <h2 className="font-montserrat text-2xl font-black text-gray-900 mb-6">Related plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: services.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const service = getServiceBySlug(params.slug);
  const relatedPlans = servicePlans[params.slug] || plans.slice(0, 4);
  return { props: { service: service || null, relatedPlans } };
}
