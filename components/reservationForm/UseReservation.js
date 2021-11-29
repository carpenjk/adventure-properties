import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { useState, useContext } from 'react';

import { ReservationContext } from '../../contexts/ReservationContext';
import useAvailability from '../adapters/property/UseAvailability';

const useReservation = () => {
  const {
    arriveDateVal,
    departDateVal,
    numGuests,
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
  } = useContext(ReservationContext);
  const [session, loading] = useSession();
  console.log(
    '🚀 ~ file: UseReservation.js ~ line 24 ~ useReservation ~ session',
    session
  );
  const [isResReady, setIsResReady] = useState(false);

  const router = useRouter();

  async function handleReservation() {
    // persist reservation parameters in a cookie
    // setSessionData();
    if (!session) {
      signIn();
    }
  }

  function reservePreview() {
    setSessionData();

    router.push({
      pathname: '/properties/[id]/reserve',
      query: { id: router.query.id },
    });
  }

  const availability = useAvailability(router.query.id);

  const getDailyPrices = () => {
    // no user input to lookup
    if (!availability || !arriveDateVal || !departDateVal) {
      return undefined;
    }
    return availability.filter(
      (date) =>
        new Date(date.date) >= arriveDateVal &&
        new Date(date.date) <= departDateVal
    );
  };

  const calcTotalPrice = () => {
    const dailyPrices = getDailyPrices();

    if (!dailyPrices || dailyPrices.length === 0) {
      return undefined;
    }
    return dailyPrices.reduce((sum, currDate) => currDate.price + sum, 0);
  };

  const getAvgDailyPrices = () => {
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

  const reservation = {
    userName: session ? session.userName : undefined,
    arriveDate: arriveDateVal,
    departDate: departDateVal,
    price: {
      prices: getDailyPrices(),
      avg: getAvgDailyPrices(),
    },
    guests: numGuests,
    total: calcTotalPrice(),
    unit: getUnit(),
    unitAmount: calcUnitAmount(),
    currSymbol: '$',
    display: {
      description: `${getAvgDailyPrices()} x ${calcUnitAmount()}${getUnit()}`,
    },
  };

  return {
    reservation,
    arriveDateVal,
    departDateVal,
    numGuests,
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
    reserve: handleReservation,
    reservePreview,
    isResReady,
  };
};

export default useReservation;
