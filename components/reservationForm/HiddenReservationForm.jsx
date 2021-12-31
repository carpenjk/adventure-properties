import { useState } from 'react';
import * as yup from 'yup';
import ActionButton from '../base/ActionButton';

const HiddenReservationForm = ({
  maxGuests,
  reservation,
  onSubmit,
  propID,
}) => {
  const { arriveDate, departDate, guests, userName, price } = reservation;
  // console.log(
  //   '🚀 ~ file: HiddenReservationForm.jsx ~ line 15 ~ HiddenReservationForm ~ reservation',
  //   reservation
  // );

  const [error, setError] = useState(false);
  const resObject = {
    hd_user: 'userName',
    hd_id: propID,
    hd_st_date: arriveDate,
    hd_end_date: departDate,
    hd_guests: guests,
    hd_price: price.total,
  };

  const resSchema = yup.object().shape({
    hd_user: yup.string().required(),
    hd_id: yup.string().required().length(22),
    hd_guests: yup
      .number()
      .required('Number of guests must be selected')
      .positive('Number of guests must be greater than 0')
      .integer('Number of guests must be a whole number')
      .max(maxGuests, `Number of guests must be below ${maxGuests}`),
    hd_st_date: yup.date().required('Arrival date must be selected'),
    hd_end_date: yup.date().required('Departure date must be selected'),
    hd_price: yup.number().required().positive(),
  });

  function handleSubmit() {
    resSchema
      .validate(resObject)
      .then((validated) => {
        console.log(
          '🚀 ~ file: HiddenReservationForm.jsx ~ line 33 ~ HiddenReservationForm ~ validated',
          validated
        );
        // onSubmit();
      })
      .catch((error) => {
        console.log('reservation error: ', error);
        setError(error);
      });

    fetch(`/api/properties/${propID}/reserve`, {
      method: 'POST',
      body: JSON.stringify(resObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('reservation response', data);
      })
      .catch((er) => {
        // console.log('reservation error:', er);
      });
  }

  return (
    // <form onSubmit={handleSubmit}>
    // <input name="hd_user" type="hidden" value={userName} />
    // <input name="hd_id" type="hidden" value={propID} />
    // <input name="hd_st_date" type="hidden" value={arriveDateVal} />
    // <input name="hd_end_date" type="hidden" value={deptartDateVal} />
    // <input name="hd_guests" type="hidden" value={guests} />
    // <input name="hd_price" type="hidden" value={price.total} />
    <>
      {!error && (
        <ActionButton type="submit" variant="reserve" onClick={handleSubmit}>
          Reserve
        </ActionButton>
      )}
      {error && (
        <ActionButton type="button" variant="reserve">
          Go Back
        </ActionButton>
      )}
    </>
    // </form>
  );
};

export default HiddenReservationForm;
