import styled from 'styled-components';
import React from 'react';
import { breakpoint } from '@carpenjk/prop-x/css';
import PhotoLayout from '../../property/cardLayouts/PhotoLayout';
import ReservationCardDetails from './ReservationCardDetails';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: none;
  width: 100%;
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: 5px;

  ${breakpoint(1)`
    width: auto;
    height: 80em;
    flex-direction: row;
    align-items: flex-start;
    height: auto;
  `}
`;

const ReservationCardLayout = (props) => {
  const { reservation, scale, innerRef, cardRef } = props;
  const { avgPrice, currSymbol, property, unit } = reservation;

  return (
    <StyledContainer ref={innerRef} scale={scale}>
      <ReservationCardDetails reservation={reservation} />
      <PhotoLayout
        beds={property.beds}
        baths={property.baths}
        guests={property.guests}
        city={property.city}
        state={property.state}
        propertyType={property.propertyType}
        title={property.title}
        nearbyActivities={property.nearbyActivities}
        photo={property.mainPhoto}
        currSymbol={currSymbol}
        price={avgPrice}
        unit={unit}
      />
    </StyledContainer>
  );
};

export default ReservationCardLayout;
