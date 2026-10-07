import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { BRAND } from '@/lib/brand';
import { providers } from '@/lib/siteData';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-gray-300 py-20 px-4 lg:px-20 relative z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className="font-montserrat font-black text-3xl tracking-tighter flex items-baseline mb-6 drop-shadow-md">
            <span className="text-[#00875A]">Ace</span>
            <span className="text-white"> Wave</span>
            <span className="text-teal-500">Net</span>
          </div>
          <p className="text-sm font-medium text-gray-400 mb-8 max-w-sm leading-relaxed">
            Your trusted comparison hub for home internet, cable TV, home phone and mobile services across the USA.
            100% free, unbiased &amp; fast.
          </p>
          <div className="space-y-4 text-sm font-bold text-gray-400">
            <a
              href={BRAND.phoneTel}
              className="flex items-center hover:text-white glass-card-dark w-max px-4 py-2 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 mr-3 text-teal-400" />
              {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center hover:text-white glass-card-dark w-max px-4 py-2 rounded-xl transition-colors"
            >
              <span className="mr-3 text-teal-400 text-lg leading-none">✉</span>
              {BRAND.email}
            </a>
            <div className="flex items-center glass-card-dark w-max px-4 py-2 rounded-xl">
              <MapPin className="w-4 h-4 mr-3 text-teal-400" />
              Nationwide - serving all 50 states
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-montserrat text-white font-black mb-6 uppercase text-sm tracking-widest">Top Providers</h4>
          <ul className="space-y-4 text-sm font-medium">
            {providers.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link href={`/providers/${p.slug}`} className="hover:text-teal-400 transition-colors">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-montserrat text-white font-black mb-6 uppercase text-sm tracking-widest">Services</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/services/internet" className="hover:text-teal-400 transition-colors">Home Internet</Link></li>
            <li><Link href="/services/cable-tv" className="hover:text-teal-400 transition-colors">Cable TV</Link></li>
            <li><Link href="/services/home-phone" className="hover:text-teal-400 transition-colors">Home Phone</Link></li>
            <li><Link href="/services/mobile" className="hover:text-teal-400 transition-colors">Mobile Services</Link></li>
            <li><Link href="/plans" className="hover:text-teal-400 transition-colors">Bundles &amp; Deals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-montserrat text-white font-black mb-6 uppercase text-sm tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/profile" className="hover:text-teal-400 transition-colors">My Profile</Link></li>
            <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
            <li><Link href="/plans" className="hover:text-teal-400 transition-colors">Compare Plans</Link></li>
            <li><Link href="/providers" className="hover:text-teal-400 transition-colors">All Providers</Link></li>
            <li><Link href="/coverage" className="hover:text-teal-400 transition-colors">Coverage Map</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs font-bold text-gray-500 text-center flex flex-col md:flex-row justify-between items-center">
        <p>© {BRAND.year} {BRAND.name}. All rights reserved.</p>
        <p className="mt-4 md:mt-0 glass-card-dark px-4 py-2 rounded-lg">
          Disclaimer: Pricing and speeds vary by location and are subject to change.
        </p>
      </div>
    </footer>
  );
}
