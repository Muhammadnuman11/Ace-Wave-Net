import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function ChatButton() {
  return (
    <Link
      href={BRAND.phoneTel}
      className="fixed bottom-20 right-6 bg-gradient-to-br from-[#00875A] to-teal-600 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(0,135,90,0.5)] hover:shadow-[0_15px_40px_rgba(0,135,90,0.6)] transition-all transform hover:scale-110 z-50 flex items-center border border-white/20 backdrop-blur-md"
    >
      <MessageCircle className="w-6 h-6 mr-2" />
      <span className="font-montserrat font-bold hidden sm:inline">Chat with us</span>
    </Link>
  );
}
