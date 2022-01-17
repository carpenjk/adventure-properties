import ErrorContainer from './ErrorContainer';

const REFRESH_ERROR =
  'Oops! It looks like this page was refreshed. Go to My Reservations to view upcoming reservations.';
const ReservationError = ({ error, userRefresh }) => (
  <ErrorContainer error={userRefresh ? REFRESH_ERROR : error} />
);

export default ReservationError;
