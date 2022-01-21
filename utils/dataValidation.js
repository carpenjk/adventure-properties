import * as yup from 'yup';
import { dates, findDate } from './dates';

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

function getTemplate(maxGuests) {
  return {
    userID: yup.string().required(),
    cmsID: yup.string().required().length(22),
    start_Date: yup.date().required('Arrival date must be selected'),
    end_Date: yup.date().required('Departure date must be selected'),
    guests: yup
      .number('Number of guests must be selected')
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(maxGuests, `Number of guests must be below ${maxGuests}`),
    price: yup.number().required().positive(),
  };
}

export async function validateReservation(resObj, maxGuests) {
  const resTemplate = {
    userID: yup.string().required(),
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
  };

  const resSchema = yup.object().shape(resTemplate);
  const validated = await resSchema.validate(resObj);
  return validated;
}
