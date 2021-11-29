import { session } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import {
  startDateProps,
  endDateProps,
  guestOptions,
} from '../data/reservation';

const ReservationContext = React.createContext();

const ReservationProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(['reservation']);
  const [resStartDate, setResStartDate] = useState('');
  const [resEndDate, setResEndDate] = useState('');
  const [numGuests, setNumGuests] = useState('');

  const numGuestID = numGuests ? Object.keys(numGuests)[0] : undefined;

  const { reservation: rsvCookie } = cookie;
  // const getNumGuests = (id) => (numGuests ? numGuests[id] : undefined);
  const getNumGuests = () => numGuests;

  const getNumGuestOption = (val) =>
    guestOptions.find((option) => option.value == val);
  const getNumGuestOptionIndex = (val) =>
    guestOptions.findIndex((option) => option.value == val);

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

  const setSessionData = () => {
    setCookie(
      'reservation',
      JSON.stringify({
        numGuests,
        resStartDate,
        resEndDate,
      }),
      {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      }
    );
  };

  const fetchClientSideData = (url) => fetch(url).then((r) => r.json());
  const hydrateWithSession = (sessionData) => {
    console.log(
      '🚀 ~ file: ReservationContext.jsx ~ line 133 ~ hydrateWithSession ~ sessionData',
      sessionData
    );

    setNumGuests(sessionData.numGuests);
    setResStartDate(sessionData.resStartDate);
    setResEndDate(sessionData.resEndDate);
  };

  useEffect(() => {
    console.log('rsvCookie', rsvCookie);

    if (rsvCookie) {
      const reservationCopy = {
        numGuests: rsvCookie.numGuests,
        resStartDate: new Date(rsvCookie.resStartDate),
        resEndDate: new Date(rsvCookie.resEndDate),
      };

      hydrateWithSession(reservationCopy);
    }
  }, [rsvCookie]);

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
        startDateProps,
        endDateProps,
        guestOptions,
        setSessionData,
        hydrateWithSession,
        selectedGuestOption,
        selectedGuestOptionIndex: getNumGuestOptionIndex(
          getNumGuests(numGuestID)
        ),
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export { ReservationProvider, ReservationContext };
