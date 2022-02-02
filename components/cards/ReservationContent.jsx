import styled from 'styled-components';
import useReservations from '../adapters/reservation/useReservations';
import PageHeader from './PageHeader';
import ReservationList from '../property/ReservationList';
import Section from '../base/semantic/Section';

const StyledWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]}px;
`;

const ReservationContent = () => {
  const reservations = useReservations();
  return (
    <>
      <Section semKey="reservations" position="relative">
        <StyledWrapper>
          <PageHeader title="My Adventures" />
        </StyledWrapper>
        <ReservationList reservations={reservations} />
      </Section>
    </>
  );
};

export default ReservationContent;
