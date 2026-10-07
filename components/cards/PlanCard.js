import Link from 'next/link';
import { Wifi, Check, ArrowRight } from 'lucide-react';
import PurchaseButton from '@/components/PurchaseButton';

export default function PlanCard({ plan }) {
  const [speedNum, speedUnit] = plan.speed.split(' ');

  return (
    <div className="glass-card rounded-[2rem] p-7 flex flex-col relative overflow-hidden border border-white/60 group hover:-translate-y-1 transition-transform h-full">
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD100] to-yellow-400 text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl shadow-sm tracking-widest uppercase">
          POPULAR
        </div>
      )}
      <div className="flex justify-between items-center mb-5 mt-2">
        <span className={`font-montserrat font-black text-xl drop-shadow-sm ${plan.pColor}`}>
          {plan.provider}
        </span>
        <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100/50 px-3 py-1 rounded-full flex items-center shadow-inner tracking-widest uppercase border border-teal-200/50">
          <Wifi className="w-3 h-3 mr-1.5" />
          {plan.type}
        </span>
      </div>
      <div className="text-sm text-gray-500 font-extrabold mb-2 tracking-wide uppercase">{plan.name}</div>
      <div className="font-montserrat text-4xl font-black text-gray-900 mb-6 flex items-baseline drop-shadow-sm">
        {speedNum}
        <span className="text-xl font-bold text-gray-500 ml-1 font-quicksand">{speedUnit}</span>
      </div>
      <div className="mb-8 p-4 glass-card rounded-2xl bg-white/30 border border-white/40">
        <div className="font-montserrat text-4xl font-black text-gray-900 drop-shadow-sm">
          ${plan.price}
          <span className="text-base font-bold text-gray-500 font-quicksand">/mo</span>
        </div>
      </div>
      <ul className="mb-10 space-y-4 flex-grow">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start text-sm text-gray-700 font-semibold">
            <div className="bg-teal-100/80 p-1 rounded-full mr-3 shadow-sm border border-teal-200/50 mt-0.5">
              <Check className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            </div>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-3">
        <PurchaseButton planId={plan.id} />
        <Link
          href={`/plans/${plan.id}`}
          className="w-full glass-card text-teal-800 font-extrabold py-3 rounded-2xl border border-white/60 transition-all flex justify-center items-center hover:bg-white/80"
        >
          View details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
