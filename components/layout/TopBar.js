import { Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#0a4d31] to-[#00875A] text-white py-2 px-4 text-sm flex justify-between items-center lg:px-20 relative z-50">
      <div className="flex space-x-2 opacity-90">
        <span>Nationwide coverage</span>
        <span>•</span>
        <span>{BRAND.providerCount}+ top providers</span>
        <span>•</span>
        <span>100% free comparison</span>
      </div>
      <a href={BRAND.phoneTel} className="flex items-center space-x-2 font-semibold tracking-wide hover:opacity-90">
        <Phone className="w-3.5 h-3.5" />
        <span>Call {BRAND.phone}</span>
      </a>
    </div>
  );
}
