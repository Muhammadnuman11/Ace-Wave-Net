import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import ZipSearch from '@/components/ZipSearch';
import PurchaseButton from '@/components/PurchaseButton';
import { Check, Wifi, ArrowLeft, Phone } from 'lucide-react';
import { getPlanById, plans } from '@/lib/siteData';
import { brandTitle, BRAND } from '@/lib/brand';

export default function PlanDetailPage({ plan }) {
  if (!plan) {
    return (
      <SiteLayout>
        <Head><title>{brandTitle('Plan Not Found')}</title></Head>
        <section className="py-20 px-4 text-center">
          <h1 className="font-montserrat text-3xl font-black mb-4">Plan not found</h1>
          <Link href="/plans" className="text-teal-700 font-bold">← Back to plans</Link>
        </section>
      </SiteLayout>
    );
  }

  const [speedNum, speedUnit] = plan.speed.split(' ');

  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle(`${plan.provider} ${plan.name}`)}</title>
      </Head>
      <section className="py-16 px-4 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <Link href="/plans" className="text-teal-700 font-bold flex items-center mb-8 hover:text-[#00875A]">
            <ArrowLeft className="w-4 h-4 mr-2" /> All plans
          </Link>

          <div className="glass-card rounded-[2rem] p-8 border border-white/60 relative overflow-hidden">
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD100] to-yellow-400 text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase">
                POPULAR
              </div>
            )}
            <div className="flex justify-between items-center mb-6 mt-2">
              <span className={`font-montserrat font-black text-2xl ${plan.pColor}`}>{plan.provider}</span>
              <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100/50 px-3 py-1 rounded-full flex items-center uppercase border border-teal-200/50">
                <Wifi className="w-3 h-3 mr-1.5" />
                {plan.type}
              </span>
            </div>
            <h1 className="font-montserrat text-3xl font-black text-gray-900 mb-2">{plan.name}</h1>
            <div className="font-montserrat text-5xl font-black text-gray-900 mb-6">
              {speedNum} <span className="text-2xl text-gray-500 font-quicksand">{speedUnit}</span>
            </div>
            <div className="glass-card rounded-2xl p-6 bg-white/30 border border-white/40 mb-8 inline-block">
              <div className="font-montserrat text-5xl font-black">
                ${plan.price}<span className="text-xl text-gray-500 font-quicksand">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start text-gray-700 font-semibold">
                  <div className="bg-teal-100/80 p-1 rounded-full mr-3 border border-teal-200/50">
                    <Check className="w-4 h-4 text-teal-600" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PurchaseButton
                planId={plan.id}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center"
                label="Purchase This Plan"
              />
              <a
                href={BRAND.phoneTel}
                className="glass-card text-teal-800 font-extrabold py-4 px-8 rounded-2xl flex items-center justify-center border border-teal-200"
              >
                <Phone className="w-4 h-4 mr-2" /> Call {BRAND.phone}
              </a>
              <Link
                href={`/providers/${plan.providerSlug}`}
                className="glass-card text-gray-800 font-extrabold py-4 px-8 rounded-2xl text-center border border-white/60"
              >
                More from {plan.provider}
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-bold text-gray-700 mb-3">Check if this plan is available at your address:</p>
            <ZipSearch />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: plans.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const plan = getPlanById(params.id);
  return { props: { plan: plan || null } };
}
