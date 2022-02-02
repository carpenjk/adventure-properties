import styled from 'styled-components';
import PropertyTitle from '../property/PropertyTitle';
import PropertyCaption from './PropertyCaption';

const StyledContainer = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-around;
  align-content: stretch;
  width: 100%;
  max-width: 341px;

  background: #ffffff;
  box-sizing: border-box;

  padding: 8px;

  .headingWrapper {
    flex: none;
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
  }
  figure {
    margin: 0;
  }
  .image {
    grid-column: 1/5;
    grid-row: 2 / span 1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .footer {
    grid-column: 1/5;
    grid-row: 3 / span 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const buildPicUrl = (property) => {
  if (property && property.mainPhoto) {
    return `http:${property.mainPhoto.fields.file.url}?w=325`;
  }
  return undefined;
};
const PhotoLayout = ({ property, price, unit, currSymbol }) => {
  const {
    heading,
    beds,
    baths,
    guests,
    city,
    state,
    propertyType,
    title,
    nearbyActivities,
  } = property;

  const cityState = `${city}, ${state}`;

  return (
    <StyledContainer>
      <div className="headingWrapper">
        <PropertyTitle variant="card" title={title} />
      </div>
      <figure>
        <div className="image">
          <img src={buildPicUrl(property)} alt={heading} />
        </div>
        <figcaption>
          <PropertyCaption
            beds={beds}
            baths={baths}
            maxGuests={guests}
            price={price}
            unit={unit}
            currSymbol={currSymbol}
            location={cityState}
            propertyType={propertyType}
            tags={nearbyActivities}
          />
        </figcaption>
      </figure>
    </StyledContainer>
  );
};

export default PhotoLayout;
