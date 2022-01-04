import { session } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import {
  startDateProps,
  endDateProps,
  guestOptions,
} from '../data/reservation';

// constants used in cookies
const PATH = '/';
const MAX_AGE = 3600;
const SAME_SITE = true;

// context object
const ReservationContext = React.createContext();

const ReservationProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(['reservation']);
  const [resStartDate, setResStartDate] = useState('');
  const [resEndDate, setResEndDate] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const numGuestID = numGuests ? Object.keys(numGuests)[0] : undefined;

  const { reservation: rsvCookie } = cookie;
  // const getNumGuests = (id) => (numGuests ? numGuests[id] : undefined);
  const getNumGuests = () => numGuests;

  const getNumGuestOption = (val) =>
    guestOptions.find((option) => option.value == val);
  const getNumGuestOptionIndex = (val) =>
    guestOptions.findIndex((option) => option.value == val);

  const selectedGuestOption = getNumGuestOption(getNumGuests(numGuestID));
  const getGuestOption = (val) => getNumGuestOption(val);

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
  const arriveMonth = arriveDateVal
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(arriveDateVal)
    : '';
  const arriveDay = arriveDateVal
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(arriveDateVal)
    : '';
  const arriveYear = arriveDateVal
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(arriveDateVal)
    : '';
  const departMonth = departDateVal
    ? new Intl.DateTimeFormat('en', { month: 'short' }).format(departDateVal)
    : '';
  const departDay = departDateVal
    ? new Intl.DateTimeFormat('en', { day: '2-digit' }).format(departDateVal)
    : '';
  const departYear = departDateVal
    ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(departDateVal)
    : '';

  const dateRangeString =
    arriveYear === departYear
      ? `${arriveMonth} ${arriveDay} - ${departMonth} ${departDay} ${departYear}`
      : `${arriveMonth} ${arriveDay} ${arriveYear} - ${departMonth} ${departDay} ${departYear}`;
  const arriveDateString = arriveDateVal ? arriveDateVal.toDateString() : '';
  const departDateString = departDateVal ? departDateVal.toDateString() : '';

  const clearSessionData = () => {
    setCookie(
      'reservation',
      JSON.stringify({
        numGuests: '',
        resStartDate: '',
        resEndDate: '',
      }),
      {
        path: PATH,
        maxAge: MAX_AGE, // Expires after 1hr
        sameSite: SAME_SITE,
      }
    );
  };

  const setSessionData = (values) => {
    if (!values) {
      setCookie(
        'reservation',
        JSON.stringify({
          numGuests,
          resStartDate,
          resEndDate,
        }),
        {
          path: PATH,
          maxAge: MAX_AGE, // Expires after 1hr
          sameSite: SAME_SITE,
        }
      );
    } else {
      clearSessionData();
    }
  };

  const fetchClientSideData = (url) => fetch(url).then((r) => r.json());
  const hydrateWithSession = (sessionData) => {
    setNumGuests(sessionData.numGuests);
    setResStartDate(sessionData.resStartDate);
    setResEndDate(sessionData.resEndDate);
  };

  const clearSession = () => {
    setNumGuests('');
    setResStartDate('');
    setResEndDate('');
    clearSessionData();
  };

  useEffect(() => {
    if (rsvCookie && rsvCookie.resStartDate && rsvCookie.resEndDate) {
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
        arriveDateString,
        dateRangeString,
        departDateVal,
        departDateString,
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
        hydrateWithSession,
        clearSessionData,
        selectedGuestOption,
        selectedGuestOptionIndex: getNumGuestOptionIndex(
          getNumGuests(numGuestID)
        ),
        isCompleted,
        setIsCompleted,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export { ReservationProvider, ReservationContext };
