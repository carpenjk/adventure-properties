import * as yup from 'yup';
import cmsClient from '../../../../Contentful';
import saveReservation from '../../../../utils/adapters/reserve';
import fetchAvailability from '../../../../utils/availability';
import { isValidDeparture, isAvail } from '../../../../utils/dataValidation';
import { dateReviver } from '../../../../utils/dates';

export default async function handler(req, res) {
  const { id } = req.query;
  const reservation = JSON.parse(req.body, dateReviver);

  //* retrieve availability data ****************************************
  let availability = {};
  try {
    availability = await fetchAvailability(id);
  } catch (e) {
    return res.status(500).json({ error: 'Property availability not found' });
  }

  //* helper functions **************************************************
  function checkPrice(p) {
    const priceSum = availability
      .filter(
        (dt) =>
          dt.date >= reservation.start_date && dt.date < reservation.end_date
      )
      .reduce((sum, day) => day.price + sum, 0);
    return p === priceSum;
  }

  //* Retrieve Property data from cms ********************************
  let property = {};
  try {
    property = await cmsClient.getEntry(id);
  } catch (error) {
    return res.status(500).json({ error: 'Property not found' });
  }

  //* Validation schema **********************************************
  const { guests } = property.fields;
  const resSchema = yup.object().shape({
    user: yup.string().required(),
    cmsID: yup.string().required().length(22),
    guests: yup
      .number()
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(guests, `Number of guests must be below ${guests}`),
    start_date: yup
      .date()
      .required('Arrival date must be selected')
      .test('is-available', 'property not available', (value) =>
        isAvail(value, availability)
      ),
    end_date: yup
      .date()
      .required('Departure date must be selected')
      .test('is-valid-departure', 'Departure date is invalid', (value) =>
        isValidDeparture(value, reservation.start_date, availability)
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
    await saveReservation(reservation);
  } catch (error) {
    //
    res.status(500).json({ error: 'Reservation failed' });
  }

  // We made it through the validation, let's reserve!

  res.status(200).json({ reservation, message: 'Reservation confirmed!' });
}
