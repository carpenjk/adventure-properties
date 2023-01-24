import * as yup from 'yup';
import { dates, findDate } from '../../utils/dates';

export function checkSession(session, user) {
  if (!session) {
    return false;
  }
  const isValid = user ? session.user.email === user : session && true;
  return isValid;
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
  if (!availability || !arDate || typeof date?.getMonth !== 'function') {
    return false;
  }

  const availableDates = dates(availability);
  const dateTime = date.getTime();
  const arDateTime = arDate.getTime();

  // index of booked date
  const arDateIndex = !availability
    ? 0
    : availableDates.findIndex((dt) => dt.date.getTime() === arDateTime);

  // first booked date after res start date
  const nextBookedDateObj = availableDates
    .slice(arDateIndex)
    .find((dt) => dt.booked);
  const nextBookedDate = nextBookedDateObj ? nextBookedDateObj.date : false;
  const lastAvailbleDate = availableDates[availableDates.length - 1].date;

  // all dates available
  if (!nextBookedDate) {
    return dateTime > arDateTime && dateTime < lastAvailbleDate.getTime();
  }
  // dates after res start up to next booked date are available for departure
  return dateTime > arDateTime && dateTime <= nextBookedDate.getTime();
}

export function filterGuestOptions(options, maxGuests) {
  return options.filter((guest) => guest.value <= maxGuests);
}

export async function validateReservation(resObj, maxGuests) {
  const resTemplate = {
    userID: yup.string().required(),
    cmsID: yup.string().required().max(22),
    guests: yup
      .number()
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(maxGuests, `Number of guests must be below ${maxGuests}`),
    arriveDate: yup.date().required('Arrival date must be selected'),
    departDate: yup.date().required('Departure date must be selected'),
    price: yup.number().required().positive(),
  };

  const resSchema = yup.object().shape(resTemplate);
  const validated = await resSchema.validate(resObj);
  return validated;
}
