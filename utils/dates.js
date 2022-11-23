export function dates(availability) {
  return availability && availability.avail ? availability.avail : availability;
}

export function findDate(date, availability) {
  if (!availability || !date) {
    return false;
  }
  return dates(availability).find((dt) => dt.date.getTime() === date.getTime());
}
