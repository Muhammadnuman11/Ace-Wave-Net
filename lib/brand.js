export const BRAND = {
  name: 'Ace Wave Net',
  tagline: 'Your 1-Stop Internet Shop',
  phone: '1-855-604-2250',
  phoneTel: 'tel:+18556042250',
  email: 'support@acewavenet.com',
  year: 2026,
  heroSubtitle:
    "We are working closely with the country's top providers to deliver transparent pricing, honest reviews and a hassle-free signup.",
  providerCount: 13,
};

export function brandTitle(page) {
  return page ? `${page} | ${BRAND.name}` : `${BRAND.name} - ${BRAND.tagline}`;
}
