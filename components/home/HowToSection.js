'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function HowToSection() {
  const router = useRouter();

  return (
    <section className="py-24 relative z-10 border-t border-white/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 text-center">
        <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Hassle-Free Signup</div>
        <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm">
          Here&apos;s How to Do It
        </h2>
        <p className="text-gray-600 font-medium mb-20 max-w-2xl mx-auto text-lg">
          Enjoy the internet like never before. Search the best deals in your area with a simple 3-step signup process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent -z-10 rounded-full opacity-60" />

          {[
            { num: '01', title: 'Search by Zip Code', desc: 'Enter your zip code to find the top-notch service providers in your area.' },
            { num: '02', title: 'View & Compare Plans', desc: 'View & compare unlimited data, speeds and best-price plans side-by-side.' },
            { num: '03', title: 'Grab Your Best Deal', desc: "You're one call away from the service of your choice. Place your order now." },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center">
              <div className="w-24 h-24 liquid-blob glass-card bg-gradient-to-br from-white to-teal-50 text-teal-600 font-montserrat font-black text-3xl flex items-center justify-center border border-white/80 shadow-xl mb-8 relative z-10">
                {step.num}
              </div>
              <h3 className="font-montserrat text-2xl font-black text-gray-900 mb-4 drop-shadow-sm">{step.title}</h3>
              <p className="text-gray-600 font-medium text-base px-6 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            type="button"
            onClick={() => router.push('/results')}
            className="bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-teal-500/30 flex items-center transition-all transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <div className="text-gray-600 font-bold glass-card px-6 py-3 rounded-full border border-white/60">
            Or call <a href={BRAND.phoneTel} className="font-black text-gray-900 ml-1 hover:text-[#00875A]">{BRAND.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
