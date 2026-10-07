import HeroSection from '@/components/home/HeroSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import ServicesSection from '@/components/home/ServicesSection';
import ProvidersSection from '@/components/home/ProvidersSection';
import PlansSection from '@/components/home/PlansSection';
import HowToSection from '@/components/home/HowToSection';
import InternetTypesSection from '@/components/home/InternetTypesSection';
import CoverageSection from '@/components/home/CoverageSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ServicesSection />
      <ProvidersSection />
      <PlansSection />
      <HowToSection />
      <InternetTypesSection />
      <CoverageSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
