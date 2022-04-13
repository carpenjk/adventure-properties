import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getDateRangeString } from '../../utils/dates';
import ParamDisplay from '../reservationForm/ParamDisplay';

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: ${({ theme }) => theme.space[2]}px;
  padding-top: 0;
  padding-bottom: 0;
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
