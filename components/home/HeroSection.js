import { MapPin, Check, Phone } from 'lucide-react';
import ZipSearch from '@/components/ZipSearch';
import { BRAND } from '@/lib/brand';

export default function HeroSection() {
  return (
    <section className="py-20 px-4 lg:px-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="lg:w-1/2 z-10">
          <h1 className="font-montserrat text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Find The Best <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00875A] to-teal-400">
              Internet Providers
            </span>{' '}
            <br />
            In Your Area
          </h1>
          <p className="text-gray-600 font-medium text-lg mb-8 leading-relaxed max-w-lg">{BRAND.heroSubtitle}</p>

          <div id="hero-zip-search">
            <ZipSearch className="mb-8" />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-bold mb-10">
            <div className="flex items-center glass-card px-3 py-1.5 rounded-full">
              <Check className="w-4 h-4 text-[#00875A] mr-2" /> No contracts
            </div>
            <div className="flex items-center glass-card px-3 py-1.5 rounded-full">
              <Check className="w-4 h-4 text-[#00875A] mr-2" /> Same-day install
            </div>
            <div className="flex items-center glass-card px-3 py-1.5 rounded-full">
              <Check className="w-4 h-4 text-[#00875A] mr-2" /> Price-match
            </div>
          </div>

          <a
            href={BRAND.phoneTel}
            className="flex items-center glass-card rounded-full py-2 px-4 w-max shadow-sm border border-white/60 hover:shadow-md transition-shadow"
          >
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-2.5 rounded-full mr-3 shadow-inner">
              <Phone className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Prefer to talk?</div>
              <div className="font-black text-gray-900 text-lg">{BRAND.phone}</div>
            </div>
          </a>
        </div>

        <div className="lg:w-1/2 relative flex justify-center items-center mt-16 lg:mt-0 h-[500px]">
          <div className="relative w-80 h-80 bg-gradient-to-tr from-[#00875A] via-teal-400 to-[#38bdf8] liquid-blob shadow-[0_20px_60px_-15px_rgba(0,135,90,0.5)] flex flex-col items-center justify-center text-white border-4 border-white/20 backdrop-blur-md z-10">
            <MapPin className="w-12 h-12 mb-2 text-white drop-shadow-md animate-bounce" />
            <span className="font-montserrat font-black text-xl tracking-wide drop-shadow-md">USA Coverage</span>
          </div>

          <div className="absolute top-10 left-0 lg:-left-10 glass-card p-5 rounded-3xl shadow-xl animate-float z-20 min-w-[130px] border border-white/60">
            <div className="font-montserrat font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              13+
            </div>
            <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mt-1">Providers</div>
          </div>

          <div className="absolute top-1/4 -right-4 lg:-right-12 glass-card p-5 rounded-3xl shadow-xl animate-float-delayed z-20 min-w-[130px] border border-white/60">
            <div className="font-montserrat font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00875A] to-teal-500">
              42.5k
            </div>
            <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mt-1">Zip Codes</div>
          </div>

          <div className="absolute bottom-1/4 -left-4 lg:-left-8 glass-card p-5 rounded-3xl shadow-xl animate-float z-20 min-w-[130px] border border-white/60">
            <div className="font-montserrat font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              2.4M
            </div>
            <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mt-1">Happy Users</div>
          </div>

          <div className="absolute -bottom-6 right-10 glass-card p-5 rounded-3xl shadow-xl animate-float-delayed z-20 min-w-[130px] border border-white/60">
            <div className="font-montserrat font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              50
            </div>
            <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mt-1">States</div>
          </div>
        </div>
      </div>
    </section>
  );
}
