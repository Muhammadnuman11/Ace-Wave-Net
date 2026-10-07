import { plans, providers, stateNames, getProvidersForState } from './siteData';

const ZIP_TO_STATE = {
  '787': 'TX', '750': 'TX', '770': 'TX', '733': 'TX', '752': 'TX',
  '441': 'OH', '432': 'OH', '452': 'OH', '441': 'OH',
  '212': 'NY', '100': 'NY', '112': 'NY',
  '208': 'MD', '212': 'MD', '207': 'MD',
  '331': 'FL', '328': 'FL', '336': 'FL',
  '900': 'CA', '941': 'CA', '902': 'CA', '921': 'CA',
  '850': 'AZ', '852': 'AZ',
  '303': 'CO', '802': 'CO',
  '981': 'WA', '606': 'IL', '191': 'PA', '303': 'GA',
};

const ZIP_TO_CITY = {
  '78701': 'Austin, TX',
  '10001': 'New York, NY',
  '33101': 'Miami, FL',
  '90210': 'Beverly Hills, CA',
  '44114': 'Cleveland, OH',
  '20814': 'Bethesda, MD',
  '77001': 'Houston, TX',
};

const STATE_FROM_ZIP_RANGE = [
  [0, 199, 'NY'], [200, 269, 'MD'], [270, 289, 'NC'], [300, 319, 'GA'],
  [320, 349, 'FL'], [350, 369, 'AL'], [370, 385, 'TN'], [386, 397, 'MS'],
  [400, 427, 'KY'], [430, 459, 'OH'], [460, 479, 'IN'], [480, 499, 'MI'],
  [500, 529, 'IA'], [530, 549, 'WI'], [550, 567, 'MN'], [570, 577, 'SD'],
  [580, 588, 'ND'], [590, 599, 'MT'], [600, 629, 'IL'], [630, 659, 'MO'],
  [660, 679, 'KS'], [680, 693, 'NE'], [700, 714, 'LA'], [716, 729, 'AR'],
  [730, 749, 'OK'], [750, 799, 'TX'], [800, 816, 'CO'], [820, 831, 'WY'],
  [832, 838, 'ID'], [840, 847, 'UT'], [850, 865, 'AZ'], [870, 884, 'NM'],
  [889, 898, 'NV'], [900, 961, 'CA'], [970, 979, 'OR'], [980, 994, 'WA'],
];

function stateFromZipPrefix(prefix) {
  if (ZIP_TO_STATE[prefix]) return ZIP_TO_STATE[prefix];
  const first3 = parseInt(prefix, 10);
  for (const [min, max, state] of STATE_FROM_ZIP_RANGE) {
    if (first3 >= min && first3 <= max) return state;
  }
  return 'TX';
}

export function lookupZip(rawZip) {
  const zip = String(rawZip || '').replace(/\D/g, '').slice(0, 5);

  if (zip.length !== 5) {
    return { valid: false, error: 'Please enter a valid 5-digit ZIP code.' };
  }

  const prefix = zip.slice(0, 3);
  const state = stateFromZipPrefix(prefix);
  const stateName = stateNames[state] || state;
  const city = ZIP_TO_CITY[zip] || `${stateName} area`;
  const areaProviders = getProvidersForState(state);

  const matchedPlans = plans.filter((plan) =>
    areaProviders.some((ap) => ap.slug === plan.providerSlug || ap.name === plan.provider)
  );

  const availableProviders = providers.filter((p) =>
    areaProviders.some((ap) => ap.slug === p.slug)
  );

  return {
    valid: true,
    zip,
    state,
    stateName,
    city,
    providers: areaProviders,
    plans: matchedPlans.length ? matchedPlans : plans.slice(0, 4),
    allProviders: availableProviders.length ? availableProviders : providers.slice(0, 5),
  };
}

export function saveZipToSession(zip) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('acewavenet_zip', zip);
  }
}

export function getSavedZip() {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('acewavenet_zip') || '';
}
