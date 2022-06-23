import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { dateReviver } from '../../../utils/dates';

const fetchReservations = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => JSON.parse(t, dateReviver));

const useReservations = () => {
  const { data: session, status } = useSession();
  const userID = session ? session.user.email : '';
  const [reservations, setReservations] = useState([]);

  const { data, error } = useSWR(
    userID ? `/api/users/${userID}/reservations` : null,
    fetchReservations
  );

  useEffect(() => {
    if (data) {
      setReservations(data.reservations);
    }
  }, [data]);

  return reservations;
};

export default useReservations;
