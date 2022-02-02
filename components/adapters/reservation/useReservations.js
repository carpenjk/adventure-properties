import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import useProperties from '../property/useProperties';
import { dateReviver } from '../../../utils/dates';

const fetchReservations = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => JSON.parse(t, dateReviver));

const useReservations = () => {
  const [session, loading] = useSession();
  const userID = session ? session.user.email : '';
  const [reservations, setReservations] = useState([]);
  const { properties, setPropIDs } = useProperties(false);

  const { data, error } = useSWR(
    userID ? `/api/users/${userID}/reservations` : null,
    fetchReservations
  );

  useEffect(() => {
    if (data) {
      const propList = data.map((r) => r.cmsID);
      setPropIDs(propList);
    }
  }, [data, setPropIDs]);

  useEffect(() => {
    if (properties) {
      setReservations(
        data.map((res) => ({
          ...res,
          property: properties.find((p) => p.cmsID === res.cmsID),
        }))
      );
    }
  }, [properties, data]);

  return reservations;
};

export default useReservations;
