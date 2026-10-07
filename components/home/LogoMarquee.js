import { logos } from '@/lib/siteData';

export default function LogoMarquee() {
  const items = [...logos, ...logos];

  return (
    <section className="py-12 border-b border-white/30 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-8 px-4 lg:px-20">
          Trusted by Customers Of
        </h3>
        <div
          className="w-full inline-flex flex-nowrap overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0, black 15%, black 85%, transparent 100%)',
          }}
        >
          <div className="animate-marquee items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {items.map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className={`font-montserrat text-xl font-black ${logo.color} drop-shadow-sm whitespace-nowrap px-8 lg:px-12`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
