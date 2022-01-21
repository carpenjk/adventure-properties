import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { dateReviver } from '../../../utils/dates';

const fetchReservations = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => JSON.parse(t, dateReviver));

const useReservations = () => {
  const [session, loading] = useSession();
  const userID = session ? session.user.email : '';
  const [reservations, setReservations] = useState([]);

  const { data, error } = useSWR(
    userID ? `/api/users/${userID}/reservations` : null,
    fetchReservations
  );

  useEffect(() => {
    setReservations(data);
  }, [data]);

  useEffect(() => {
    console.log('error retrieving reservations', error);
  }, [error]);

  return reservations;
};

export default useReservations;
