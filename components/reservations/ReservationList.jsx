import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';
import ReservationCard from '../reservation/cardLayouts/ReservationCard';

const StyledList = styled.ul`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin: 0;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[3]}px;
  ${breakpoint(1)`
    width: unset;
  `}
`;
const StyledItem = styled.li`
  padding-top: ${({ theme }) => theme.space[1]}px;
  padding-bottom: ${({ theme }) => theme.space[1]}px;

  ${breakpoint(1)`
    padding-top: ${({ theme }) => theme.space[2]}px;
    padding-bottom: ${({ theme }) => theme.space[2]}px;
  `}
`;

const ReservationList = ({ reservations }) => (
  <StyledList>
    {reservations &&
      reservations.map((res) => (
        <StyledItem key={res._id}>
          <ReservationCard
            reservation={res}
            scale={1.02}
            scaleOnHover={(false, true)}
            scaleOnFocus={[false, true]}
          />
        </StyledItem>
      ))}
  </StyledList>
);

export default ReservationList;
