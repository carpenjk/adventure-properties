import styled from 'styled-components';
import CaptionItem from './CaptionItem';
import CardActivities from './CardActivities';

const StyledAttributes = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  p {
    margin: 0;
  }
`;

const Price = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  max-width: 50px;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-style: normal;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.mainText};
  letter-spacing: 0.2em;
  > * {
    letter-spacing: initial;
  }
`;

const StyledLocation = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: 'Walter Turncoat', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary[0]};
  text-transform: uppercase;
`;

const PropertyCaption = (props) => {
  const {
    beds,
    baths,
    currSymbol,
    maxGuests,
    price,
    location,
    propertyType,
    nearbyActivities,
    unit,
  } = props;
  return (
    <>
      <StyledAttributes>
        <Price>
          {`${currSymbol}${price.toLocaleString('en-US')}`}
          <CaptionItem caption={` /${unit}`} />
        </Price>
        <CaptionItem
          caption={`${maxGuests} Guest${maxGuests > 1 ? 's' : ''}`}
        />
        <CaptionItem caption={`${beds} Bed${beds > 1 ? 's' : ''}`} />
        <CaptionItem caption={`${baths} Bath${baths > 1 ? 's' : ''}`} />
        <CaptionItem caption={propertyType} />
      </StyledAttributes>
      <CardActivities activities={nearbyActivities} />
      <StyledLocation>{location}</StyledLocation>
    </>
  );
};

export default PropertyCaption;
