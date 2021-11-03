import { signIn, useSession } from 'next-auth/client';
import { useContext } from 'react';
import { ReservationContext } from '../../contexts/ReservationContext';

const useReservation = () => {
  const {
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

  async function handleReservation() {
    // persist reservation parameters in a cookie
    setSessionData();
    if (!session) {
      signIn();
    }
  }

  function openReservationForm() {}

  return {
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
  };
};

export default useReservation;
