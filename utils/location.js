export const countryCodeDisplay = {
  us: 'USA',
};

export function getLocationDisplay(loc) {
  if (!loc || !loc.address) {
    return '';
  }
  const { city, state, name, country_code: countryCode } = loc.address;
  const _city = city || name;
  return `${_city}, ${state}, ${countryCodeDisplay[countryCode]}`;
}
