'use client';

import { useRouter } from 'next/router';
import { Check, ArrowRight, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function WhyChooseSection() {
  const router = useRouter();

  return (
    <section className="py-24 relative z-10 border-t border-white/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 relative flex justify-center w-full h-[500px] items-center">
          <div className="absolute w-96 h-96 bg-gradient-to-tr from-teal-300/40 to-blue-300/40 rounded-full mix-blend-multiply filter blur-[80px] animate-float z-0" />
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg relative z-10">
            <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center row-span-2 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,135,90,0.2)]">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-white rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-white">
                <ArrowRight className="w-8 h-8 text-[#00875A] -rotate-45" />
              </div>
              <div className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2">Live Speed</div>
              <div className="font-montserrat text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-teal-800 drop-shadow-sm">
                1.2 Gbps
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl border border-white/60 shadow-xl flex flex-col justify-center">
              <div className="font-montserrat font-black text-gray-900 mb-2 flex items-center text-lg">
                <div className="bg-green-100 p-1.5 rounded-full mr-3 shadow-inner">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                Secure
              </div>
              <div className="text-xs font-bold text-gray-500 leading-relaxed">Verified partner network</div>
            </div>
            <div className="glass-card p-6 rounded-3xl border border-white/60 shadow-xl flex flex-col justify-center">
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Customer Savings</div>
              <div className="font-montserrat text-3xl font-black text-gray-900 drop-shadow-sm">
                $38.50 <span className="text-xs font-bold text-gray-500 font-quicksand block mt-1">/mo avg.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative z-10">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Reliable, Safe, Fast.</div>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm leading-tight">
            High-Speed Broadband Internet in America
          </h2>
          <p className="text-gray-600 font-medium mb-10 leading-relaxed text-lg">
            {BRAND.name} helps you compare and connect to the best available service in your area, at the best prices, in
            one simple comparison. That&apos;s what makes us stand out.
          </p>
          <ul className="space-y-5 mb-12">
            {[
              'Authorized partner of 13+ top US providers',
              'Real-time price comparisons & honest reviews',
              "Zero-fee consultation - we're paid by providers",
              'Licensed agents available 7 days a week',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center text-gray-800 font-bold glass-card w-max px-5 py-3 rounded-2xl border border-white/40 shadow-sm"
              >
                <Check className="w-5 h-5 text-[#00875A] mr-3 flex-shrink-0 drop-shadow-sm" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href={BRAND.phoneTel}
              className="glass-card text-teal-800 font-extrabold py-4 px-8 rounded-full border border-teal-200 shadow-sm flex items-center justify-center hover:bg-white/80 transition-all"
            >
              <Phone className="w-4 h-4 mr-2" /> Call {BRAND.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                if (router.pathname === '/') {
                  document.getElementById('hero-zip-search')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push('/#hero-zip-search');
                }
              }}
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-gray-900/20 flex items-center justify-center hover:from-gray-800 hover:to-gray-600 transition-all transform hover:scale-105"
            >
              Search by ZIP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
