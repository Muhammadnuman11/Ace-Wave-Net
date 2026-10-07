import { Wifi, Globe, Tv } from 'lucide-react';

const iconMap = { wifi: Wifi, globe: Globe, tv: Tv };

export default function InternetTypeCard({ type }) {
  const Icon = iconMap[type.icon] || Wifi;

  return (
    <div className="glass-card-dark rounded-3xl p-8 hover:-translate-y-1 transition-transform group relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-colors" />
      <div className="w-16 h-16 rounded-2xl liquid-blob bg-gradient-to-br from-yellow-400/20 to-orange-500/20 text-[#FFD100] flex items-center justify-center mb-6 shadow-inner border border-white/10">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-montserrat text-2xl font-black text-white mb-3 drop-shadow-sm">{type.title}</h3>
      <p className="text-gray-400 font-medium text-sm mb-8 leading-relaxed">{type.desc}</p>
      <div className="flex flex-wrap gap-2">
        {type.tags.map((tag) => (
          <span
            key={tag}
            className="bg-white/5 backdrop-blur-sm text-gray-300 font-bold text-[10px] px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
