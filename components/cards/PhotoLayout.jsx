import styled from 'styled-components';
import PropertyTitle from '../property/PropertyTitle';
import PropertyCaption from './PropertyCaption';

const StyledLargeLayout = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-around;
  align-content: stretch;
  width: 100%;

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
const LargeLayout = ({ url, property, price, unit, currSymbol }) => {
  const {
    heading,
    beds,
    baths,
    maxGuests,
    city,
    state,
    propertyType,
    nearbyActivities,
  } = property;

  const cityState = `${city}, ${state}`;

  return (
    <StyledLargeLayout>
      <div className="headingWrapper">
        <PropertyTitle variant="card" title={heading} />
      </div>
      <figure>
        <div className="image">
          <img src={url} alt={heading} />
        </div>
        <figcaption>
          <PropertyCaption
            beds={beds}
            baths={baths}
            maxGuests={maxGuests}
            price={price}
            unit={unit}
            currSymbol={currSymbol}
            location={cityState}
            propertyType={propertyType}
            tags={nearbyActivities}
          />
        </figcaption>
      </figure>
    </StyledLargeLayout>
  );
};

const PhotoLayout = ({ variant, property, currSymbol, price, unit }) => {
  const buildPicUrl = () => {
    if (property && property.mainPhoto) {
      return `http:${property.mainPhoto.fields.file.url}?w=325`;
    }
    return undefined;
  };
  switch (variant) {
    case 'large':
      return (
        <LargeLayout
          url={buildPicUrl()}
          property={property}
          price={price}
          unit={unit}
          currSymbol={currSymbol}
        />
      );
    default:
      return <div>Loading</div>;
  }
};

export default PhotoLayout;
