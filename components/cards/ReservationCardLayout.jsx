import styled from 'styled-components';
import React from 'react';
import { breakpoint } from 'themeweaver';
import PhotoLayout from './PhotoLayout';
import ReservationCardDetails from './ReservationCardDetails';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  flex: none;
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: 5px;

  ${breakpoint(1)`
    height: 80em;
    flex-direction: row;
    align-items: flex-start;
    height: auto;
    min-width: 600px;
  `}
`;

const ReservationCardLayout = (props) => {
  const { reservation, scale, innerRef, cardRef } = props;
  const { avgPrice, currSymbol, property, unit } = reservation;

  return (
    <StyledContainer ref={innerRef} scale={scale}>
      <ReservationCardDetails reservation={reservation} />
      <PhotoLayout
        property={property}
        currSymbol={currSymbol}
        price={avgPrice}
        unit={unit}
        innerRef={cardRef}
        variant="large"
      />
    </StyledContainer>
  );
};

export default ReservationCardLayout;
