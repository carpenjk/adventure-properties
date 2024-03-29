import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';

const fetchClientSideData = (url) => fetch(url).then((r) => r.json());

const useAvailability = (propID) => {
  const { data: avail } = useSWR(
    `/api/properties/${propID}/availability`,
    fetchClientSideData
  );
  const getDateArray = (ary) => {
    if (ary) {
      return ary.map((date) => date.date);
    }
  };

  const getAvailWithDates = useCallback(
    () => avail.availability.map((dt) => ({ ...dt, date: new Date(dt.date) })),
    [avail]
  );

  const createAvailability = useCallback(() => {
    if (avail) {
      const availWithDates = getAvailWithDates();
      return {
        dates: getDateArray(availWithDates),
        avail: availWithDates,
        start: availWithDates[0],
        end: availWithDates[avail.length - 1],
        maxGuests: avail.guests,
      };
    }
  }, [avail, getAvailWithDates]);

  const [availability, setAvailability] = useState(createAvailability);

  useEffect(() => {
    setAvailability(createAvailability);
  }, [createAvailability]);

  return availability;
};

export default useAvailability;
