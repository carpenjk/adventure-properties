import React, { useState, useCallback, useMemo } from 'react';

import useReservationSession from '../components/adapters/reservation/UseReservationSession';

import { startDateProps, endDateProps, guestOptions } from '../data/input';

// context object
const ReservationContext = React.createContext();

const ReservationProvider = ({ children }) => {
  const { cookie, setSessionData, clearSessionData } = useReservationSession();
  const [resStartDate, setResStartDate] = useState();
  const [resEndDate, setResEndDate] = useState();
  const [numGuests, setNumGuests] = useState('');
  const [isInEditMode, setIsInEditMode] = useState(false);

  const { reservation: rsvCookie } = cookie;

  const getNumGuestOption = (val) =>
    guestOptions.find((option) => option.value === val);
  const getNumGuestOptionIndex = (val) =>
    guestOptions.findIndex((option) => option.value === val);

  const selectedGuestOption = getNumGuestOption(numGuests);

  // obj returned from input component
  const setDate = (obj) => {
    const id = Object.keys(obj)[0];
    const val = obj[id];
    if (id === startDateProps.id) {
      setResStartDate(val);
    } else if (id === endDateProps.id) {
      setResEndDate(val);
    }
  };
  const getDate = useCallback(
    (id) => {
      if (id === startDateProps.id) {
        return resStartDate;
      }
      if (id === endDateProps.id) {
        return resEndDate;
      }
    },
    [resStartDate, resEndDate]
  );

  // CustomSelect component returns object with id as key
  const _setNumGuest = (obj) => {
    const id = Object.keys(obj)[0];
    setNumGuests(obj[id]);
  };

  const arriveDateVal = getDate(startDateProps.id);
  const departDateVal = getDate(endDateProps.id);

  const hydrate = useCallback((data) => {
    setNumGuests(data.numGuests);
    setResStartDate(data.resStartDate);
    setResEndDate(data.resEndDate);
  }, []);

  const value = useMemo(
    () => ({
      arriveDateVal,
      departDateVal,
      numGuests,
      getDate,
      setDate,
      setNumGuests: _setNumGuest,
      isInEditMode,
      setIsInEditMode,
      startDateProps,
      endDateProps,
      guestOptions,
      setSessionData,
      hydrate,
      clearSessionData,
      selectedGuestOption,
      selectedGuestOptionIndex: getNumGuestOptionIndex(numGuests),
      sessionData: rsvCookie,
    }),
    [
      arriveDateVal,
      clearSessionData,
      departDateVal,
      getDate,
      hydrate,
      isInEditMode,
      numGuests,
      rsvCookie,
      selectedGuestOption,
      setSessionData,
    ]
  );
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export { ReservationProvider, ReservationContext };
