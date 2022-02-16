import styled from 'styled-components';

const StyledImgWrapper = styled.div`
  display: flex;
  width: 350px;
  max-width: 350px;
  height: 233px;

  @media (min-width: 500px) {
    width: 500px;
    max-width: 500px;
    height: 333px;
  }

  img {
    touch-action: pinch-zoom;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PHOTO_WIDTH_SMALL = 350;
const PHOTO_WIDTH_LARGE = 500;

const ReservationPicture = ({ url, alt }) => {
  const mediumModifiers = `?fit=fill&w=${PHOTO_WIDTH_LARGE}&h=333&q=80`;
  const smallModifiers = `?fit=fill&w=${PHOTO_WIDTH_SMALL}&h=233&q=80`;

  const img = {
    srcSet: `
      ${url}${smallModifiers} ${PHOTO_WIDTH_SMALL}w,
      ${url}${mediumModifiers} ${PHOTO_WIDTH_LARGE}w,
        `,
    src: `${url}${mediumModifiers}`,
  };

  return (
    <StyledImgWrapper key={img.src}>
      <picture>
        <source
          media={`(max-width: ${PHOTO_WIDTH_LARGE - 0.01}px)`}
          srcSet={`${url}${smallModifiers} ${PHOTO_WIDTH_SMALL}w`}
        />
        <source
          media={`(min-width: ${PHOTO_WIDTH_LARGE}px)`}
          srcSet={`${url}${mediumModifiers} ${PHOTO_WIDTH_LARGE}w`}
        />
        <img src={img.src} alt={alt} />
      </picture>
    </StyledImgWrapper>
  );
};

export default ReservationPicture;
