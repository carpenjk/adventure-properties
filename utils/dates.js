export function dates(availability) {
  return availability && availability.avail ? availability.avail : availability;
}

export function findDate(date, availability) {
  if (!availability) {
    return false;
  }
  return dates(availability).find((dt) => dt.date.getTime() === date.getTime());
}

export function compareDateOnly(dt1, dt2) {
  const dt1Date = dt1.getDate();
  const dt1Month = dt1.getMonth();
  const dt1Year = dt1.getFullYear();
  const dt2Date = dt2.getDate();
  const dt2Month = dt2.getMonth();
  const dt2Year = dt2.getFullYear();
  const isEqual =
    dt1Date === dt2Date && dt1Month === dt2Month && dt1Year === dt2Year;
  return isEqual;
}

export function dateReviver(key, value) {
  function isDate() {
    const regDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return regDate.test(value);
  }

  if (isDate()) {
    return new Date(value);
  }
  return value;
}

export function getDateRangeString(arriveDate, departDate) {
  const arriveMonth = arriveDate
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(arriveDate)
    : '';
  const arriveDay = arriveDate
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(arriveDate)
    : '';
  const arriveYear = arriveDate
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(arriveDate)
    : '';
  const departMonth = departDate
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(departDate)
    : '';
  const departDay = departDate
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(departDate)
    : '';
  const departYear = departDate
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(departDate)
    : '';

  const dateRangeString =
    arriveYear === departYear
      ? `${arriveMonth} ${arriveDay} - ${departMonth} ${departDay} ${departYear}`
      : `${arriveMonth} ${arriveDay} ${arriveYear} - ${departMonth} ${departDay} ${departYear}`;

  return dateRangeString;
}
