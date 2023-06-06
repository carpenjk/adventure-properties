import { useRouter } from 'next/router';
import useReservationSession from '../reservation/UseReservationSession';
import { prepValues } from '../../data/validation/search';
import { getSortByValue } from './utils';

const useSearch = () => {
  const router = useRouter();
  const { setSessionData } = useReservationSession();

  return async function searchAndSetSession(values) {
    const { guests, arriveDate, departDate } = values;
    setSessionData({
      numGuests: guests,
      resStartDate: arriveDate,
      resEndDate: departDate,
    });
    router.push({
      pathname: '/properties/search',
      query: {
        ...prepValues({
          ...values,
          sortBy: getSortByValue(values),
        }),
      },
    });
  };
};

export default useSearch;
