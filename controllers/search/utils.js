export function getSortByValue(values) {
  if (values) {
    const { sortBy } = values || {};
    if (sortBy) {
      return sortBy;
    }
    if (values && values.destination) {
      // return { sortBy: JSON.stringify({ destination: -1 }) };
      return { destination: 1 };
    }
  }

  // return { sortBy: JSON.stringify({ displayPrice: -1 }) };
  return { displayPrice: -1 };
}
