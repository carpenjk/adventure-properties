import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import OverlayNavButton from '../base/OverlayNavButton';

const StyledPicturesWrapper = styled.div`
  width: 100%;
`;
const StyledPictures = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;

  > img {
    flex: none;
    object-fit: cover;
    width: 100%;
  }
  ${breakpoint(1)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'main main pic1 pic2'
      'main main pic3 pic4';
    justify-items: stretch;
    align-items: stretch;
    width: 100%;

  > *:first-child {
    grid-area: main;
  }
  `}
`;
const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
const PictureTiles = ({ children }) => (
  <StyledPictures>
    {children}
    <StyledButtonWrapper>
      <OverlayNavButton path="/">More Photos</OverlayNavButton>
    </StyledButtonWrapper>
  </StyledPictures>
);

export default PictureTiles;
