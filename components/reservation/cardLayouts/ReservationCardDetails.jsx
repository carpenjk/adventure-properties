import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';
import { getDateRangeString } from '@carpenjk/date-utils';
import ParamDisplay from '../../reservationForm/ParamDisplay';

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  ${breakpoint(1)`
    flex-direction: column;
    align-items: flex-start;
    padding: ${({ theme }) => theme.space[3]}px;
  `}
`;

const ReservationCardDetails = ({ reservation }) => {
  const { arriveDate, departDate, guests, _id } = reservation;
  return (
    <StyledDetails>
      <ParamDisplay
        displayString={_id.slice(-8)}
        title="Res. Number"
        variant="card"
      />

      <ParamDisplay
        displayString={getDateRangeString(arriveDate, departDate)}
        title="Dates"
        variant="card"
      />
      <ParamDisplay
        displayString={`${guests} guest${guests > 1 ? 's' : ''}`}
        title="Guests"
        variant="card"
      />
    </StyledDetails>
  );
};

export default ReservationCardDetails;
