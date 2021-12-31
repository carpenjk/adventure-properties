import * as yup from 'yup';

function dates(availability) {
  return availability && availability.avail ? availability.avail : availability;
}

function findDate(date, availability) {
  if (!availability) {
    return false;
  }
  return dates(availability).find((dt) => dt.date.getTime() === date.getTime());
}

// logic to determine available dates for property
export function isAvail(date, availability) {
  // find date within initial availability
  const dateObj = findDate(date, availability);
  // true if initially available and not booked
  return dateObj ? !dateObj.booked : false;
}
// logic to determin valid departure date
// valid if after start dt and <= next booked date
export function isValidDeparture(date, arDate, availability) {
  if (!availability || !arDate) {
    return false;
  }

  const availableDates = dates(availability);
  const dateTime = date.getTime();
  const arDateTime = arDate.getTime();

  // index of booked date
  const i = !availability
    ? 0
    : availableDates.findIndex((dt) => dt.date.getTime() === arDateTime);

  // first booked date after res start date
  const nextBookedDateObj = availableDates.slice(i).find((dt) => dt.booked);
  const nextBookedDate = nextBookedDateObj ? nextBookedDateObj.date : false;

  // all dates available
  if (!nextBookedDate) {
    return dateTime > arDateTime;
  }
  // dates after res start up to next booked date are available for departure
  return dateTime > arDateTime && dateTime <= nextBookedDate.getTime();
}

export async function validateReservation(resObject, maxGuests) {
  console.log('validating');
  const resSchema = yup.object().shape({
    user: yup.string().required(),
    cmsID: yup.string().required().length(22),
    guests: yup
      .number()
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(maxGuests, `Number of guests must be below ${maxGuests}`),
    start_date: yup.date().required('Arrival date must be selected'),
    end_date: yup.date().required('Departure date must be selected'),
    price: yup.number().required().positive(),
  });

  const validated = await resSchema.validate(resObject);
  return validated;
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
