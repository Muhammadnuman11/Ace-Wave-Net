import { Star } from 'lucide-react';
import { testimonials } from '@/lib/siteData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-20">
        <div className="text-center mb-16">
          <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Loved By 2.4M+ Customers</div>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm">
            What our customers say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card p-8 rounded-3xl border border-white/60 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-lg shadow-teal-900/5"
            >
              <div className="absolute top-0 right-0 text-9xl text-white/40 font-serif leading-none -mt-4 -mr-2 group-hover:text-teal-50/50 transition-colors">
                &quot;
              </div>
              <div className="flex text-[#FFD100] mb-6 relative z-10 drop-shadow-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD100] text-[#FFD100]" />
                ))}
              </div>
              <p className="text-gray-700 font-medium text-base mb-8 flex-grow italic relative z-10 leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="relative z-10 border-t border-white/50 pt-4 mt-auto">
                <div className="font-montserrat font-black text-gray-900 text-lg drop-shadow-sm">{t.name}</div>
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">{t.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
