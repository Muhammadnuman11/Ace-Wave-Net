import Link from 'next/link';
import { Star, MapPin, ArrowRight } from 'lucide-react';

export default function ProviderCard({ provider }) {
  return (
    <div className="glass-card rounded-3xl p-7 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full border border-white/60 group">
      <div className="flex justify-between items-start mb-5">
        <div className={`font-montserrat font-black text-3xl ${provider.color} drop-shadow-sm`}>
          {provider.name}
        </div>
        <div className="flex items-center text-gray-700 font-bold bg-white/50 px-2 py-1 rounded-lg text-sm">
          <Star className="w-3.5 h-3.5 text-[#FFD100] fill-[#FFD100] mr-1 drop-shadow-sm" />
          {provider.rating}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium mb-6 min-h-[2.5rem]">{provider.slogan}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {provider.types.map((t) => (
          <span
            key={t}
            className="bg-white/60 text-gray-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto border-t border-gray-300/30 pt-5 flex justify-between items-end">
        <div>
          <div className="text-[10px] text-gray-500 font-black uppercase tracking-wider mb-1">Starting</div>
          <div className="font-montserrat font-black text-2xl text-gray-900">
            ${provider.price}
            <span className="text-sm font-bold text-gray-500">/mo</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600 text-sm font-bold bg-white/40 px-3 py-1.5 rounded-xl">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
          {provider.states} states
        </div>
      </div>
      <Link
        href={`/providers/${provider.slug}`}
        className="w-full mt-6 bg-gradient-to-r from-gray-50 to-white hover:from-teal-50 hover:to-white text-teal-800 font-extrabold py-3 rounded-2xl shadow-sm border border-white flex justify-center items-center transition-colors"
      >
        View plans
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}
