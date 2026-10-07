export const logos = [
  { name: 'CenturyLink', color: 'text-blue-800' },
  { name: 'Mediacom', color: 'text-blue-500' },
  { name: 'EarthLink', color: 'text-green-600' },
  { name: 'Xfinity', color: 'text-red-500' },
  { name: 'Spectrum', color: 'text-blue-600' },
  { name: 'Cox', color: 'text-blue-500' },
  { name: 'AT&T', color: 'text-blue-700' },
  { name: 'Optimum', color: 'text-teal-600' },
];

export const services = [
  { slug: 'internet', num: '01', title: 'Internet Service', desc: 'Wide range of speedy internet services and customized data plans for every household.' },
  { slug: 'cable-tv', num: '02', title: 'Cable TV Service', desc: 'Non-stop cable TV, internet TV, and online streaming services at your fingertips.' },
  { slug: 'home-phone', num: '03', title: 'Home Phone Service', desc: 'Reliable home phone services when mobile services go out. Crystal clear calling.' },
  { slug: 'mobile', num: '04', title: 'Mobile Data Service', desc: 'Unlimited mobile data plans for your on-the-go data needs across the country.' },
];

export const providers = [
  { slug: 'xfinity', name: 'Xfinity', rating: 4.7, slogan: "America's #1 home internet provider", types: ['CABLE', 'FIBER'], price: '19.99', states: 39, color: 'text-red-500' },
  { slug: 'spectrum', name: 'Spectrum', rating: 4.6, slogan: 'Unbeatable speeds. No contracts.', types: ['CABLE'], price: '29.99', states: 41, color: 'text-blue-600' },
  { slug: 'cox', name: 'Cox', rating: 4.5, slogan: 'Personalized internet for your home', types: ['CABLE', 'FIBER'], price: '29.99', states: 18, color: 'text-blue-500' },
  { slug: 'att', name: 'AT&T', rating: 4.8, slogan: 'The power of AT&T Fiber', types: ['FIBER', 'DSL'], price: '55', states: 22, color: 'text-blue-700' },
  { slug: 'optimum', name: 'Optimum', rating: 4.4, slogan: 'Fast, reliable, straightforward', types: ['CABLE', 'FIBER'], price: '40', states: 21, color: 'text-teal-600' },
  { slug: 'frontier', name: 'Frontier', rating: 4.5, slogan: 'Pure fiber, pure performance', types: ['FIBER', 'DSL'], price: '29.99', states: 25, color: 'text-red-400' },
  { slug: 'hughesnet', name: 'HughesNet', rating: 4.2, slogan: 'Satellite internet, anywhere', types: ['SATELLITE'], price: '49.99', states: 50, color: 'text-orange-500' },
  { slug: 'centurylink', name: 'CenturyLink', rating: 4.3, slogan: 'Price for life, no contracts', types: ['FIBER', 'DSL'], price: '50', states: 36, color: 'text-green-600' },
];

export const plans = [
  { id: 1, slug: 'xfinity-connect', provider: 'Xfinity', providerSlug: 'xfinity', type: 'Cable', name: 'Connect', speed: '150 Mbps', price: '19.99', features: ['No annual contract', 'xFi Gateway included', 'Unlimited data add-on'], popular: false, pColor: 'text-red-500' },
  { id: 2, slug: 'xfinity-fast', provider: 'Xfinity', providerSlug: 'xfinity', type: 'Cable', name: 'Fast', speed: '400 Mbps', price: '45', features: ['Ideal for 4-7 devices', '4K streaming ready', 'xFi Advanced Security'], popular: true, pColor: 'text-red-500' },
  { id: 3, slug: 'spectrum-internet', provider: 'Spectrum', providerSlug: 'spectrum', type: 'Cable', name: 'Internet', speed: '300 Mbps', price: '29.99', features: ['Free modem', 'No data caps', 'FREE antivirus software'], popular: false, pColor: 'text-blue-600' },
  { id: 4, slug: 'cox-go-fast', provider: 'Cox', providerSlug: 'cox', type: 'Cable', name: 'Go Fast', speed: '100 Mbps', price: '29.99', features: ['Panoramic WiFi gateway', 'Free trial of StraightUp', 'No credit check option'], popular: false, pColor: 'text-blue-500' },
  { id: 5, slug: 'att-fiber-300', provider: 'AT&T', providerSlug: 'att', type: 'Fiber', name: 'Fiber 300', speed: '300 Mbps', price: '55', features: ['Symmetrical speed', 'Smart Home Manager', 'No annual contract'], popular: false, pColor: 'text-gray-800' },
  { id: 6, slug: 'optimum-500', provider: 'Optimum', providerSlug: 'optimum', type: 'Fiber', name: 'Fiber 500', speed: '500 Mbps', price: '40', features: ['Whole-home WiFi', 'No data caps', 'Free installation'], popular: false, pColor: 'text-teal-600' },
  { id: 7, slug: 'frontier-fiber', provider: 'Frontier', providerSlug: 'frontier', type: 'Fiber', name: 'Fiber 500', speed: '500 Mbps', price: '29.99', features: ['Symmetrical speeds', 'No contracts', 'Router included'], popular: false, pColor: 'text-red-400' },
  { id: 8, slug: 'hughesnet-fusion', provider: 'HughesNet', providerSlug: 'hughesnet', type: 'Satellite', name: 'Fusion', speed: '50 Mbps', price: '49.99', features: ['Available nationwide', 'Built-in WiFi', 'Video data saver'], popular: false, pColor: 'text-orange-500' },
];

export const planFilters = ['All', 'Fiber', 'Cable', 'Satellite', 'DSL'];

export const internetTypes = [
  { icon: 'wifi', title: 'Fiber Internet', desc: 'The fastest, most reliable connection with symmetrical speeds. Best for gaming, 4K streaming.', tags: ['AT&T Fiber', 'Frontier Fiber', 'CenturyLink Fiber', 'Optimum Fiber'] },
  { icon: 'globe', title: 'Cable Internet', desc: 'Widely available, affordable and fast. Great balance between speed and cost for most households.', tags: ['Xfinity', 'Spectrum', 'Cox', 'Mediacom'] },
  { icon: 'wifi', title: 'Satellite Internet', desc: 'Available anywhere in the US, perfect for rural homes where wired options are limited.', tags: ['HughesNet', 'Viasat'] },
  { icon: 'tv', title: 'Cable & Streaming TV', desc: '200+ channels, regional sports, premium add-ons, and cloud DVR. Watch what you love, anywhere.', tags: ['DIRECTV', 'Xfinity TV', 'Spectrum TV', 'Optimum TV'] },
];

export const stateList = [
  'WA', 'OR', 'CA', 'NV', 'ID', 'UT', 'AZ', 'MT', 'WY', 'CO', 'NM', 'ND', 'SD', 'NE', 'KS', 'OK', 'TX', 'MN', 'IA', 'MO', 'AR', 'LA', 'WI', 'IL', 'MI', 'IN', 'OH', 'KY', 'TN', 'MS', 'AL', 'GA', 'FL', 'SC', 'NC', 'VA', 'WV', 'PA', 'NY', 'MD', 'DE', 'NJ', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME', 'HI', 'AK',
];

export const stateNames = {
  TX: 'Texas', OH: 'Ohio', MD: 'Maryland', CA: 'California', FL: 'Florida', NY: 'New York',
  WA: 'Washington', OR: 'Oregon', NV: 'Nevada', AZ: 'Arizona', CO: 'Colorado', GA: 'Georgia',
  IL: 'Illinois', PA: 'Pennsylvania', NJ: 'New Jersey', VA: 'Virginia', NC: 'North Carolina',
};

export const stateProviders = {
  TX: [
    { name: 'Spectrum', slug: 'spectrum', price: '29.99' },
    { name: 'Cox', slug: 'cox', price: '29.99' },
    { name: 'AT&T', slug: 'att', price: '55' },
    { name: 'Optimum', slug: 'optimum', price: '40' },
    { name: 'Frontier', slug: 'frontier', price: '29.99' },
  ],
  OH: [
    { name: 'Spectrum', slug: 'spectrum', price: '29.99' },
    { name: 'AT&T', slug: 'att', price: '55' },
    { name: 'EarthLink', slug: 'earthlink', price: '49.95' },
    { name: 'HughesNet', slug: 'hughesnet', price: '49.99' },
  ],
  MD: [
    { name: 'Xfinity', slug: 'xfinity', price: '19.99' },
    { name: 'Verizon Fios', slug: 'verizon', price: '49.99' },
    { name: 'Astound', slug: 'astound', price: '25' },
  ],
};

export const testimonials = [
  { text: 'Signed up for AT&T Fiber through Ace Wave Net in under 10 minutes. Install was next-day. Best decision ever!', name: 'Marcus Ellington', loc: 'Austin, TX' },
  { text: 'Compared five providers in my zip. Ended up saving $38/month with Optimum. The side-by-side comparison is unbeatable.', name: 'Priya Nair', loc: 'Jersey City, NJ' },
  { text: 'Rural area, limited options, but their team matched me with HughesNet Fusion and I finally stream without buffering.', name: 'Daniel Okafor', loc: 'Phoenix, AZ' },
  { text: 'Customer service walked me through everything. Spectrum install was smooth. 10/10 would recommend.', name: 'Sofia Alvarez', loc: 'Miami, FL' },
];

export const faqs = [
  { q: 'How do I find internet providers in my area?', a: 'Enter your zip code in our search tool to see a customized list of providers available at your exact address.' },
  { q: 'Is there any cost to use Ace Wave Net?', a: "Absolutely not. Our comparison service is 100% free for consumers. We're paid by our partner providers when you sign up." },
  { q: 'Can I bundle internet, TV, and phone?', a: 'Yes! Most major providers like Xfinity, Spectrum, Cox, and Optimum offer bundle discounts when you combine internet with TV or home phone services.' },
  { q: 'How fast will installation be?', a: 'Most cable and fiber providers offer same-day or next-day self-install options. Satellite internet may take 3-7 business days for professional installation.' },
  { q: 'What speeds do I actually need?', a: 'For 1-2 devices basic browsing, 100 Mbps is fine. For 4K streaming or gaming on multiple devices, look for 300+ Mbps.' },
];

export const navLinks = [
  { href: '/services/internet', label: 'Internet' },
  { href: '/services/cable-tv', label: 'Cable TV' },
  { href: '/services/home-phone', label: 'Home Phone' },
  { href: '/services/mobile', label: 'Mobile' },
  { href: '/providers', label: 'Providers' },
  { href: '/coverage', label: 'Coverage' },
];

export function getProviderBySlug(slug) {
  return providers.find((p) => p.slug === slug);
}

export function getPlanById(id) {
  return plans.find((p) => p.id === Number(id));
}

export function getPlansByProvider(slug) {
  return plans.filter((p) => p.providerSlug === slug);
}

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export function getProvidersForState(stateCode) {
  if (stateProviders[stateCode]) return stateProviders[stateCode];
  return providers.slice(0, 4).map((p) => ({ name: p.name, slug: p.slug, price: p.price }));
}

export function filterPlans(type) {
  if (!type || type === 'All') return plans;
  return plans.filter((p) => p.type === type);
}
