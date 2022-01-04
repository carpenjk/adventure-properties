import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { useState, useContext, useEffect, useCallback } from 'react';

import { ReservationContext } from '../../contexts/ReservationContext';
import useAvailability from '../adapters/property/UseAvailability';
import { validateReservation } from '../../utils/dateValidation';

const useReservation = () => {
  const {
    arriveDateVal,
    arriveDateString,
    dateRangeString,
    departDateVal,
    departDateString,
    numGuests,
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    clearSessionData,
    selectedGuestOptionIndex,
    isCompleted,
    setIsCompleted,
    isInEditMode,
    setIsInEditMode,
  } = useContext(ReservationContext);
  const [session, loading] = useSession();

  const router = useRouter();
  const [isResReady, setIsResReady] = useState(false);
  const [error, setError] = useState('');
  const [isResAttempted, setIsResAttempted] = useState(false);
  const [response, setResponse] = useState();

  const { id } = router.query;
  const user = session && session.user ? session.user : '';

  function reservePreview() {
    if (!isResReady) {
      setIsResAttempted(true);
      return;
    }
    setSessionData();
    router.push({
      pathname: '/properties/[id]/reserve',
      query: { id },
    });
    setIsInEditMode(false);
  }

  const availability = useAvailability(router.query.id);

  const getDailyPrices = () => {
    // no user input to lookup
    if (!availability || !arriveDateVal || !departDateVal) {
      return undefined;
    }
    const dates = availability.avail.filter(
      (dt) => dt.date >= arriveDateVal && dt.date < departDateVal
    );
    return dates;
  };

  const calcTotalPrice = () => {
    const dailyPrices = getDailyPrices();

    if (!dailyPrices || dailyPrices.length === 0) {
      return undefined;
    }
    console.log(
      'calc total price: ',
      dailyPrices.reduce((sum, currDate) => currDate.price + sum, 0)
    );
    return dailyPrices.reduce((sum, currDate) => currDate.price + sum, 0);
  };

  const getAvgDailyPrice = () => {
    const dailyPrices = getDailyPrices();
    if (!dailyPrices || dailyPrices.length === 0) {
      return 0;
    }
    const total = calcTotalPrice() || 0;
    return total / dailyPrices.length;
  };

  const calcUnitAmount = () => {
    const dailyPrices = getDailyPrices();
    return !dailyPrices ? 0 : dailyPrices.length;
  };

  const getUnit = () => {
    if (calcUnitAmount() === 1) {
      return 'night';
    }
    return 'nights';
  };

  // const getDateRangeString = (start, end) => {
  //   const arriveYear = start.getFullYear();
  //   const departYear = end.getFullYear();
  //   const arriveMonth = start.getMonth();
  //   const departMonth = end.getMonth();
  //   const arriveDay = start.getDate();
  //   const departDay = end.getDate();
  //   return arriveYear === departYear
  //     ? `${arriveMonth} ${arriveDay} - ${departMonth} ${departDay} ${departYear}`
  //     : `${arriveMonth} ${arriveDay} ${arriveYear} - ${departMonth} ${departDay} ${departYear}`;
  // };

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

  const _isResReady = useCallback(
    () =>
      isSelected('arriveDate') &&
      isSelected('departDate') &&
      isSelected('guests'),
    [isSelected]
  );

  useEffect(() => {
    setIsResReady(_isResReady);
  }, [arriveDateVal, departDateVal, numGuests, _isResReady]);

  useEffect(() => {
    // clear error if all selected
    if (isResReady) {
      setError('');
      return;
    }

    // if not all selected and reserve attempted, set error
    if (isResAttempted) {
      if (!isSelected('arriveDate')) {
        setError('Please select an arrival date');
      } else if (!isSelected('departDate')) {
        setError('Please select a departure date');
      } else if (!isSelected('guests')) {
        setError('Please select number of guests');
      }
    }
  }, [isSelected, isResAttempted, isResReady]);

  const reservation = {
    user,
    arriveDate: arriveDateVal,
    departDate: departDateVal,
    dateRangeString,
    error,
    price: {
      prices: getDailyPrices(),
      avg: getAvgDailyPrice(),
      total: calcTotalPrice(),
    },
    guests: numGuests,
    unit: 'night',
    unitLabel: getUnit(),
    unitAmount: calcUnitAmount(),
    currSymbol: '$',
    isSelected,
    isResAttempted,
    isResReady,
    isCompleted,
    response,
    object: {
      user: 'test',
      cmsID: id,
      start_date: arriveDateVal,
      end_date: departDateVal,
      guests: numGuests,
      price: calcTotalPrice(),
    },
    display: {
      description: `${getAvgDailyPrice()} x ${calcUnitAmount()}${getUnit()}`,
    },
  };

  //* **handlers****************************************** */
  async function handleReservation(maxGuests) {
    async function sendRes() {
      fetch(`/api/properties/${router.query.id}/reserve`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(reservation.object),
      })
        .then((res) => res.json())
        .then((data) => {
          const { message, error } = data;
          setResponse({
            ...data,
          });
          if (data.message) {
            setIsCompleted(true);
            clearSessionData();
          }
        });
    }

    // persist reservation parameters in a cookie
    // setSessionData();
    if (!session) {
      console.log('You must sign in');
      // signIn();
    }

    try {
      const validated = await validateReservation(
        reservation.object,
        maxGuests
      );
      await sendRes();
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    console.log('response changed:', response);
    if (response) {
      if (response.message) {
        console.log('isCompleted');
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    }
  }, [response]);

  const reservationControl = {
    getDate,
    setDate,
    // getDateRangeString,
    getNumGuests,
    setNumGuests,
    isInEditMode,
    setIsInEditMode,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
    reserve: handleReservation,
    reservePreview,
  };

  return {
    availability,
    reservation,
    reservationControl,
    // arriveDateVal,
    // arriveDateString,
    // getDateRangeString,
    // departDateVal,
    // departDateString,
    // numGuests,
    // getDate,
    // setDate,
    // getNumGuests,
    // setNumGuests,
    // startDateProps,
    // endDateProps,
    // guestOptions,
    // setSessionData,
    // selectedGuestOptionIndex,
    // reserve: handleReservation,
    // reservePreview,
    // isResReady,
  };
};

export default useReservation;
