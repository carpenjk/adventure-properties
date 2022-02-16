import styled from 'styled-components';
import PageHeader from './PageHeader';
import ReservationList from '../property/ReservationList';

const StyledWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]}px;
`;

const ReservationContent = ({ reservations }) => (
  <>
    <StyledWrapper>
      <PageHeader title="My Adventures" />
    </StyledWrapper>
    <ReservationList reservations={reservations} />
  </>
);
export default ReservationContent;
