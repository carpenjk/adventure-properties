import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';
import PropertyTitle from '../PropertyTitle';
import PropertyCaption from './PropertyCaption';

const StyledContainer = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-around;
  align-content: stretch;
  max-width: 325px;

  ${breakpoint(2)`
    width: 100%;
  `}

  background: #ffffff;
  box-sizing: border-box;

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

const IMG_WIDTH = 325;
const IMG_HEIGHT = 217;

const buildPicUrl = (photo) =>
  `https:${photo.fields.file.url}?fit=fill&w=325&h=217&q=80`;
const PhotoLayout = (props) => {
  console.log('🚀 ~ file: PhotoLayout.jsx:54 ~ PhotoLayout ~ props', props);
  const {
    beds,
    baths,
    guests,
    city,
    state,
    propertyType,
    photo,
    price,
    unit,
    currSymbol,
    title,
    nearbyActivities,
  } = props;

  const cityState = `${city}, ${state}`;
  const url = buildPicUrl(photo);

  return (
    <StyledContainer>
      <div className="headingWrapper">
        <PropertyTitle variant="card" title={title} />
      </div>
      <figure>
        <div className="image">
          <img src={url} alt={title} width={IMG_WIDTH} height={IMG_HEIGHT} />
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
            nearbyActivities={nearbyActivities}
          />
        </figcaption>
      </figure>
    </StyledContainer>
  );
};

export default PhotoLayout;
