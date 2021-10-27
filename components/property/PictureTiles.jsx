import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import OverlayNavButton from '../base/OverlayNavButton';

const StyledPictures = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;

  > img {
    flex: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  ${breakpoint(1)`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(${({ colCount }) => colCount}, 1fr);
    justify-items: stretch;
    align-items: stretch;
    width: 100%;
    height: 500px;
    max-width: 1300px;


  > *:first-child {
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
  }
  > *:not(:first-child){
    
  }
  `}
`;
const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
const PictureTiles = ({ children, onOverlayClick }) => {
  const imgCount = children.length ? children.length : 0;
  const smallSquares = imgCount - 1;
  // Hard coded to 2 rows with first image taking up the first 2 rows and cols
  // remaining images fill the grid across rows
  const colCount = imgCount !== 1 ? smallSquares / 2 + 2 : 2;

  return (
    <StyledPictures colCount={colCount}>
      {children}
      <StyledButtonWrapper>
        <OverlayNavButton onClick={onOverlayClick}>
          More Photos
        </OverlayNavButton>
      </StyledButtonWrapper>
    </StyledPictures>
  );
};

export default PictureTiles;
