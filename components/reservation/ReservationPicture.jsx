import styled from 'styled-components';

const StyledImgWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: auto;

  @media (min-width: 500px) {
    max-width: none;
  }

  img {
    max-width: 100%;
    height: auto;
    touch-action: pinch-zoom;
    object-fit: cover;
  }
`;

// const PHOTO_WIDTH_SMALL = 350;
// const PHOTO_HEIGHT_SMALL = 233;
const PHOTO_WIDTH_SMALL = 380;
const PHOTO_HEIGHT_SMALL = 253;

const PHOTO_HEIGHT_MEDIUM = 333;
const PHOTO_WIDTH_MEDIUM = 500;

const ReservationPicture = ({ url, alt }) => {
  const mediumModifiers = `?fit=fill&w=${PHOTO_WIDTH_MEDIUM}&h=${PHOTO_HEIGHT_MEDIUM}&q=80`;
  const smallModifiers = `?fit=fill&w=${PHOTO_WIDTH_SMALL}&h=${PHOTO_HEIGHT_SMALL}&q=80`;

  const mediumSrc = `${url}${mediumModifiers}`;
  return (
    <StyledImgWrapper key={mediumSrc}>
      <img
        src={mediumSrc}
        srcSet={`${url}${smallModifiers} ${PHOTO_WIDTH_SMALL}w, ${mediumSrc} ${PHOTO_WIDTH_MEDIUM}w`}
        sizes={`(min-width: 500px) ${PHOTO_WIDTH_MEDIUM}px, 100vw`}
        alt={alt}
      />
    </StyledImgWrapper>
  );
};

export default ReservationPicture;
