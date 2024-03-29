import styled from 'styled-components';
import { getDateRangeString } from '@carpenjk/date-utils';
import ReservationReview from './ReservationReview';

const StyledResponse = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: 2px solid ${({ theme }) => theme.colors.action[0]};
  border-radius: 5px;
  padding: ${({ theme }) => theme.space[3]}px;

  font-family: ${({ theme }) => theme.fonts.openSans};
  color: ${({ theme, isError }) =>
    !isError ? theme.colors.primary[0] : theme.colors.action[1]};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  font-weight: bold;
`;

const ReservationResponse = ({ response }) => {
  const {
    reservation: resObject = false,
    message = false,
    error = false,
  } = response;
  const { arriveDate, departDate, guests, unit, unitAmount, avgPrice, price } =
    resObject || {};

  const reservation = {
    arriveDate,
    departDate,
    dateRangeString: getDateRangeString(
      resObject.arriveDate,
      resObject.departDate
    ),
    guests,
    unit,
    unitAmount,
    price: {
      avg: avgPrice,
      total: price,
    },
  };
  return (
    <>
      {response.reservation && <ReservationReview reservation={reservation} />}
      <StyledResponse isError={error && error}>
        {message || error}
      </StyledResponse>
    </>
  );
};

export default ReservationResponse;
