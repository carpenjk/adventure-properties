export function getSortBy(values) {
  if (values && values.destination) {
    // return { sortBy: JSON.stringify({ destination: -1 }) };
    return { sortBy: { destination: 1 } };
  }
  // return { sortBy: JSON.stringify({ displayPrice: -1 }) };
  return { sortBy: { displayPrice: -1 } };
}
