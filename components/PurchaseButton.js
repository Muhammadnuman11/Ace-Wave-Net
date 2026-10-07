'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { getSavedZip } from '@/lib/zipLookup';

export default function PurchaseButton({ planId, className = '', label = 'Purchase Plan' }) {
  const zip = getSavedZip();
  const href = `/checkout?planId=${planId}${zip ? `&zip=${zip}` : ''}`;

  return (
    <Link
      href={href}
      className={
        className ||
        'w-full bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center transform hover:scale-[1.02]'
      }
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );
}
