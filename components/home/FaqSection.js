'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '@/lib/siteData';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-24 relative z-10 border-t border-white/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Frequently Asked</div>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm">
            Got Questions? We&apos;ve got answers.
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="glass-card rounded-[1.5rem] overflow-hidden border border-white/60 shadow-sm transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`w-full text-left px-8 py-6 flex justify-between items-center font-montserrat font-bold text-lg text-gray-900 hover:bg-white/50 transition-colors ${
                  openFaq === i ? 'bg-white/40 shadow-inner' : ''
                }`}
              >
                {faq.q}
                <div
                  className={`p-2 rounded-full transition-colors ${
                    openFaq === i ? 'bg-teal-100 text-teal-700' : 'bg-white/50 text-gray-400'
                  }`}
                >
                  {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              <div
                className={`faq-content overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-6 pt-2 text-gray-600 font-medium text-base leading-relaxed bg-white/20 border-t border-white/30">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
