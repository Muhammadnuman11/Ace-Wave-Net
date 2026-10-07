import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group border border-white/60">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-200/50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
      <div className="font-montserrat text-transparent bg-clip-text bg-gradient-to-br from-[#00875A] to-teal-300 text-5xl font-black mb-6 drop-shadow-sm">
        {service.num}
      </div>
      <h3 className="font-montserrat text-2xl font-extrabold text-gray-900 mb-3 relative z-10">{service.title}</h3>
      <p className="text-gray-600 font-medium text-sm mb-8 relative z-10">{service.desc}</p>
      <Link
        href={`/services/${service.slug}`}
        className="text-teal-700 font-bold text-sm flex items-center group-hover:text-[#00875A] transition-colors relative z-10 w-max"
      >
        Learn more
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
