import InternetTypeCard from '@/components/cards/InternetTypeCard';
import { internetTypes } from '@/lib/siteData';
import { BRAND } from '@/lib/brand';

export default function InternetTypesSection() {
  return (
    <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] animate-bg py-24 relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-float z-0" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-float z-0"
        style={{ animationDelay: '2s' }}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-20 flex flex-col lg:flex-row gap-16 relative z-10">
        <div className="lg:w-1/3">
          <div className="text-[11px] font-black text-[#FFD100] uppercase tracking-widest mb-4">Know Your Choices</div>
          <h2 className="font-montserrat text-4xl lg:text-5xl font-black mb-8 leading-tight drop-shadow-lg">
            Know The Companies Available In Your Area
          </h2>
          <div className="glass-card-dark p-6 rounded-3xl mb-8">
            <p className="text-gray-300 font-medium text-base leading-relaxed mb-4">
              The more companies, the more confusing it can get. Don&apos;t worry — {BRAND.name} helps you find the most
              suitable packages in your area in under a minute.
            </p>
            <p className="text-gray-300 font-medium text-base leading-relaxed">
              Discover satellite, traditional cable, and wired/fiber from top providers across the country.
            </p>
          </div>
          <p className="text-teal-200/80 text-sm font-bold italic glass-card-dark inline-block px-4 py-2 rounded-full">
            *Start with your ZIP code for tailored results.
          </p>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {internetTypes.map((type) => (
            <InternetTypeCard key={type.title} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}
