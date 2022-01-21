import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import property from '../../data/property';
import useReservations from '../adapters/reservation/useReservations';
import ReservationCard from '../cards/ReservationCard';

const StyledContent = styled.ul`
  min-height: 300px;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin: 0;

  ${breakpoint(2)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

  `}
`;

const TEST_URL = 'http://localhost:3000/properties/1rMtf4yHiwfQ0jENe8jT5q';
const ReservationList = () => {
  const reservations = useReservations();

  return (
    <StyledContent>
      {reservations &&
        reservations.map((res) => (
          // const { reservation, property } = res; //! use this and update below
          <ReservationCard
            key={res.cmsID + res.start_date} //! add res id to reservation
            url={TEST_URL}
            property={property}
            reservation={res}
            scale={1.11}
            scaleOnHover={[false, false, true]}
            scaleOnFocus={[false, false, true]}
            innerRef={undefined} //! is this needed?
          />
        ))}
    </StyledContent>
  );
};

export default ReservationList;
