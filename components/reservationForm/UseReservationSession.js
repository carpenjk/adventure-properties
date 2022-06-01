import { useCookies } from 'react-cookie';
// constants used in cookies
const PATH = '/';
const MAX_AGE = 3600;
const SAME_SITE = true;
const useReservationSession = () => {
  const [cookie, setCookie] = useCookies(['reservation']);

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
    if (!values) return;
    const { numGuests, resStartDate, resEndDate } = values;
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
  };
  return { cookie, setSessionData, clearSessionData };
};

export default useReservationSession;
