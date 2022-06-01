import { useRouter } from 'next/router';
import useReservationSession from '../../components/reservationForm/UseReservationSession';
import { prepValues } from '../../data/validation/search';
import { getSortBy } from './utils';

const useSearch = () => {
  const router = useRouter();
  const { setSessionData } = useReservationSession();

  return async function search(values) {
    const { guests, arriveDate, departDate } = values;
    setSessionData({
      numGuests: guests,
      resStartDate: arriveDate,
      resEndDate: departDate,
    });
    router.push({
      pathname: '/properties/search',
      query: {
        ...prepValues({ ...values, ...getSortBy(values) }),
      },
    });
  };
};

export default useSearch;
