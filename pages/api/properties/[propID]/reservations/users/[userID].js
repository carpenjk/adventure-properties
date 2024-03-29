import { getSession } from 'next-auth/react';
import * as yup from 'yup';
import { dateReviver } from '@carpenjk/date-utils';
import { fetchProperty } from '../../../../../../controllers/property/property';
import {
  checkSession,
  isValidDeparture,
  isAvail,
} from '../../../../../../data/validation/reservation';
import saveReservation from '../../../../../../controllers/reservation/reservation';

export default async function handler(req, res) {
  const { propID, userID } = req.query;
  const reservation = JSON.parse(req.body, dateReviver);
  const session = await getSession({ req });

  if (!checkSession(session, userID)) {
    return res
      .status(400)
      .json({ error: 'Reservation user does not match logged in user' });
  }

  //* Retrieve Property data from cms ********************************
  let property = {};
  try {
    // property = await cmsClient.getEntry(propID);
    property = await fetchProperty(propID, true);
  } catch (error) {
    return res.status(500).json({ error: 'Property not found' });
  }
  const { availability, guests } = property;

  //* helper functions **************************************************
  function checkPrice(p) {
    const priceSum = availability
      .filter(
        (dt) =>
          dt.date >= reservation.arriveDate && dt.date < reservation.departDate
      )
      .reduce((sum, day) => day.price + sum, 0);
    return p === priceSum;
  }

  //* Validation schema **********************************************
  const resSchema = yup.object().shape({
    cmsID: yup.string().required().max(22),
    guests: yup
      .number()
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(guests, `Number of guests must be below ${guests}`),
    arriveDate: yup
      .date()
      .required('Arrival date must be selected')
      .test('is-available', 'property not available', (value) =>
        isAvail(value, availability)
      ),
    departDate: yup
      .date()
      .required('Departure date must be selected')
      .test('is-valid-departure', 'Departure date is invalid', (value) =>
        isValidDeparture(value, reservation.arriveDate, availability)
      ),
    price: yup
      .number()
      .required()
      .positive()
      .test('is-price-match', "Price doesn't match database", (value) =>
        checkPrice(value)
      ),
  });

  //* Validate reservation and respond *************************************
  try {
    await resSchema.validate(reservation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    await saveReservation({ userID, ...reservation });
  } catch (error) {
    //
    res.status(500).json({ error: 'Reservation failed' });
  }

  // We made it through the validation, let's reserve!

  res.status(200).json({ reservation, message: 'Reservation confirmed!' });
}
