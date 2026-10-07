import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import PlanCard from '@/components/cards/PlanCard';
import ZipSearch from '@/components/ZipSearch';
import { Star, MapPin, ArrowLeft, Phone } from 'lucide-react';
import { getProviderBySlug, getPlansByProvider, providers } from '@/lib/siteData';
import { brandTitle, BRAND } from '@/lib/brand';

export default function ProviderDetailPage({ provider, providerPlans }) {
  if (!provider) {
    return (
      <SiteLayout>
        <Head><title>{brandTitle('Provider Not Found')}</title></Head>
        <section className="py-20 px-4 text-center">
          <h1 className="font-montserrat text-3xl font-black mb-4">Provider not found</h1>
          <Link href="/providers" className="text-teal-700 font-bold">← Back to providers</Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle(provider.name)}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Link href="/providers" className="text-teal-700 font-bold flex items-center mb-8 hover:text-[#00875A]">
            <ArrowLeft className="w-4 h-4 mr-2" /> All providers
          </Link>

          <div className="glass-card rounded-3xl p-8 border border-white/60 mb-12">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h1 className={`font-montserrat font-black text-4xl ${provider.color} mb-2`}>{provider.name}</h1>
                <p className="text-gray-600 font-medium text-lg mb-4">{provider.slogan}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.types.map((t) => (
                    <span key={t} className="bg-white/60 text-gray-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-[#FFD100] fill-[#FFD100] mr-1" />
                    {provider.rating} rating
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 text-teal-600 mr-1" />
                    {provider.states} states
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-black uppercase mb-1">Starting at</div>
                <div className="font-montserrat font-black text-4xl text-gray-900">
                  ${provider.price}<span className="text-lg text-gray-500">/mo</span>
                </div>
                <a
                  href={BRAND.phoneTel}
                  className="inline-flex mt-4 bg-gradient-to-r from-[#00875A] to-teal-500 text-white font-bold py-3 px-6 rounded-full items-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> Order by phone
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 max-w-lg">
            <p className="font-bold text-gray-700 mb-3">Check availability in your area:</p>
            <ZipSearch />
          </div>

          <h2 className="font-montserrat text-2xl font-black text-gray-900 mb-6">
            {provider.name} Plans
          </h2>
          {providerPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 font-medium">No plans listed. Call us for custom quotes.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: providers.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const provider = getProviderBySlug(params.slug);
  const providerPlans = getPlansByProvider(params.slug);
  return { props: { provider: provider || null, providerPlans } };
}
