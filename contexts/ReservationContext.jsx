import React, { useState, useCallback } from 'react';
import useReservationSession from '../components/reservationForm/UseReservationSession';

import { startDateProps, endDateProps, guestOptions } from '../data/input';

// context object
const ReservationContext = React.createContext();

const ReservationProvider = ({ children }) => {
  const { cookie, setSessionData, clearSessionData } = useReservationSession();
  const [resStartDate, setResStartDate] = useState();
  const [resEndDate, setResEndDate] = useState();
  const [numGuests, setNumGuests] = useState('');
  const [isInEditMode, setIsInEditMode] = useState(false);

  const numGuestID = numGuests ? Object.keys(numGuests)[0] : undefined;
  const { reservation: rsvCookie } = cookie;

  const getNumGuests = () => numGuests;

  const getNumGuestOption = (val) =>
    guestOptions.find((option) => option.value === val);
  const getNumGuestOptionIndex = (val) =>
    guestOptions.findIndex((option) => option.value === val);

  const selectedGuestOption = getNumGuestOption(getNumGuests(numGuestID));

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
  const getDate = (id) => {
    if (id === startDateProps.id) {
      return resStartDate;
    }
    if (id === endDateProps.id) {
      return resEndDate;
    }
  };

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

  const clearSession = () => {
    setNumGuests('');
    setResStartDate(null);
    setResEndDate(null);
    clearSessionData();
  };

  return (
    <ReservationContext.Provider
      value={{
        arriveDateVal,
        departDateVal,
        numGuests,
        getDate,
        setDate,
        getNumGuests,
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
        selectedGuestOptionIndex: getNumGuestOptionIndex(
          getNumGuests(numGuestID)
        ),
        sessionData: rsvCookie,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export { ReservationProvider, ReservationContext };
