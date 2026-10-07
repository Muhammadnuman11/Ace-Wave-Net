import ServiceCard from '@/components/cards/ServiceCard';
import { services } from '@/lib/siteData';

export default function ServicesSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-20 text-center">
        <div className="text-[11px] font-black text-[#00875A] uppercase tracking-widest mb-3">Services For You</div>
        <h2 className="font-montserrat text-4xl lg:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm">
          Reliable Internet &amp; Cable Services
          <br />
          for Your Home
        </h2>
        <p className="text-gray-600 font-medium mb-16 max-w-2xl mx-auto text-lg">
          We offer the most reliable and affordable internet, mobile, TV, and home phone services across the USA.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
