import Link from 'next/link';

export default function Logo({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';

  return (
    <Link href="/" className={`flex flex-col items-center ${className}`}>
      <div className="font-montserrat font-extrabold text-2xl tracking-tighter flex items-baseline">
        <span className="text-[#00875A]">Ace</span>
        <span className={isDark ? 'text-white' : 'text-gray-900'}> Wave</span>
        <span className="text-teal-500">Net</span>
      </div>
      <div
        className={`hidden lg:block text-xs uppercase tracking-widest ml-3 mt-1 font-bold ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        1-Stop Internet Shop
      </div>
    </Link>
  );
}
