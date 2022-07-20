import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { dateReviver, getDateRangeString } from '../../utils/dates';
import {
  validateReservation,
  isValidDeparture,
  isAvail,
} from '../../data/validation/reservation';

import { ReservationContext } from '../../contexts/ReservationContext';
import useAvailability from '../adapters/property/UseAvailability';
import {
  calcTotalPrice,
  calcUnitAmount,
  getAvgDailyPrice,
  getDailyPrices,
  getDescription,
  getTodayPrice,
  getUnit,
} from '../../utils/reservation/reservation';

const CURR_SYMBOL = '$';

const useReservation = () => {
  const {
    arriveDateVal,
    departDateVal,
    numGuests,
    getDate,
    setDate,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    clearSessionData,
    sessionData,
    hydrate,
    selectedGuestOptionIndex,
    isInEditMode,
    setIsInEditMode,
  } = useContext(ReservationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState();

  const { propID } = router.query;
  const availability = useAvailability(propID);

  // * Reservation Validation functions *******************
  const isSelected = useCallback(
    (field) => {
      switch (field) {
        case 'arriveDate':
          return arriveDateVal && true;
        case 'departDate':
          return departDateVal && true;
        case 'guests':
          return numGuests > 0;
        default:
      }
    },
    [arriveDateVal, departDateVal, numGuests]
  );

  const isBlank = useCallback(
    () =>
      !isSelected('arriveDate') &&
      !isSelected('departDate') &&
      !isSelected('guests'),
    [isSelected]
  );

  const validateArrival = useCallback(() => {
    if (!isSelected('arriveDate')) {
      setError('Please select an arrival date.');
      return false;
    }
    if (!isAvail(arriveDateVal, availability)) {
      setError('Arival date is unavailable.');
      return false;
    }
    return true;
  }, [isSelected, arriveDateVal, availability]);

  const validateDeparture = useCallback(() => {
    if (!isSelected('departDate')) {
      setError('Please select a departure date.');
      return false;
    }
    if (!isValidDeparture(departDateVal, arriveDateVal, availability)) {
      setError('Departure date is invalid');
      return false;
    }
    return true;
  }, [isSelected, arriveDateVal, departDateVal, availability]);

  const validateGuests = useCallback(() => {
    if (!isSelected('guests')) {
      setError('Please select number of guests');
      return false;
    }
    return true;
  }, [isSelected]);

  const validateFields = useCallback(
    (fields) => {
      let isInputValid = false;
      const validators = {
        arriveDate: validateArrival,
        departDate: validateDeparture,
        guests: validateGuests,
      };

      for (let i = 0; i < fields.length; i += 1) {
        isInputValid = validators[fields[i]]();
        if (!isInputValid) break;
      }
      return isInputValid;
    },
    [validateArrival, validateDeparture, validateGuests]
  );

  const validateAll = useCallback(() => {
    if (!validateArrival()) {
      return false;
    }
    if (!validateDeparture()) {
      return false;
    }
    if (!validateGuests()) {
      return false;
    }
    return true;
  }, [validateArrival, validateDeparture, validateGuests]);

  const validate = useCallback(
    (opt) => {
      const { validateOnChange: revalidateOnChange = false, fields } =
        opt || {};

      let isValidInput = true;
      if (fields) {
        isValidInput = validateFields(fields);
      } else {
        isValidInput = validateAll();
      }
      setIsValid(isValidInput);
      setValidateOnChange(revalidateOnChange || false);
      return isValidInput;
    },
    [validateAll, validateFields]
  );

  //* utility functions
  const hydrateWithSession = useCallback(() => {
    let reservationCopy = {
      numGuests: '',
      resStartDate: null,
      resEndDate: null,
    };
    if (sessionData) {
      const parsedCookie = JSON.parse(JSON.stringify(sessionData), dateReviver);
      const { resStartDate, resEndDate, numGuests: guests } = parsedCookie;
      const { maxGuests } = availability || {};
      reservationCopy = {
        numGuests: guests <= maxGuests ? guests : '',
        resStartDate: isAvail(resStartDate, availability) ? resStartDate : '',
        resEndDate: isValidDeparture(resEndDate, resStartDate, availability)
          ? resEndDate
          : '',
      };
    }
    hydrate(reservationCopy);
  }, [sessionData, availability, hydrate]);

  //* validation effects ************************************ */
  // validate on change to inputs
  useEffect(() => {
    if (validateOnChange) {
      validate({ validateOnChange: true });
    } else {
      validate({ validateOnChange: false });
    }
  }, [arriveDateVal, departDateVal, numGuests, validate, validateOnChange]);

  // clear error when valid
  useEffect(() => {
    if (!isValid) {
      return;
    }
    setError('');
  }, [isValid]);

  useEffect(() => {
    hydrateWithSession();
  }, [hydrateWithSession]);

  const reservation = useMemo(
    () => ({
      arriveDate: arriveDateVal,
      departDate: departDateVal,
      dateRangeString: getDateRangeString(arriveDateVal, departDateVal),
      error,
      price: {
        prices: getDailyPrices(availability, arriveDateVal, departDateVal),
        avg: getAvgDailyPrice(availability, arriveDateVal, departDateVal),
        total: calcTotalPrice(availability, arriveDateVal, departDateVal),
        today: getTodayPrice(availability),
      },
      guests: numGuests,
      unit: 'night',
      unitLabel: getUnit(availability, arriveDateVal, departDateVal),
      unitAmount: calcUnitAmount(availability, arriveDateVal, departDateVal),
      currSymbol: CURR_SYMBOL,
      isBlank: isBlank(),
      isSelected,
      isValid,
      response,
      object: {
        userID: session ? session.user.email : undefined,
        cmsID: propID,
        arriveDate: arriveDateVal,
        departDate: departDateVal,
        guests: numGuests,
        avgPrice: getAvgDailyPrice(availability, arriveDateVal, departDateVal),
        price: calcTotalPrice(availability, arriveDateVal, departDateVal),
        unit: 'night',
        unitAmount: calcUnitAmount(availability, arriveDateVal, departDateVal),
        currSymbol: CURR_SYMBOL,
      },
      display: {
        description: getDescription(availability, arriveDateVal, departDateVal),
      },
    }),
    [
      arriveDateVal,
      availability,
      departDateVal,
      error,
      isBlank,
      isSelected,
      isValid,
      numGuests,
      propID,
      response,
      session,
    ]
  );

  //* handlers****************************************** */
  async function reserveReview() {
    if (!session) {
      setSessionData({
        numGuests,
        resStartDate: arriveDateVal,
        resEndDate: departDateVal,
      });
      signIn();
      return;
    }
    const isValidInput = validate({ validateOnChange: true });
    if (!isValidInput) {
      // setIsResAttempted(true);
      return;
    }
    setSessionData({
      numGuests,
      resStartDate: arriveDateVal,
      resEndDate: departDateVal,
    });
    router.push({
      pathname: '/properties/[propID]/reserve',
      query: { propID },
    });
  }

  async function handleReservation(maxGuests) {
    async function sendRes() {
      fetch(
        `/api/properties/${router.query.propID}/reservations/users/${session.user.email}`,
        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(reservation.object),
        }
      )
        .then((res) => res.text())
        .then((text) => JSON.parse(text, dateReviver))
        .then((data) => {
          setResponse({
            ...data,
          });
          if (data.message) {
            clearSessionData();
          }
        })
        .catch((e) => setResponse({ ...e }));
    }

    // persist reservation parameters in a cookie
    if (!session) {
      setSessionData({
        numGuests,
        resStartDate: arriveDateVal,
        resEndDate: departDateVal,
      });
      signIn();
    }
    try {
      await validateReservation(reservation.object, maxGuests);
    } catch (e) {
      setError(e.message);
      return;
    }
    await sendRes();
  }

  const reservationControl = {
    getDate,
    setDate,
    getNumGuests: numGuests,
    setNumGuests,
    isInEditMode,
    setIsInEditMode,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
    reserve: handleReservation,
    reserveReview,
    validate,
  };

  return {
    availability,
    reservation,
    reservationControl,
  };
};

export default useReservation;
