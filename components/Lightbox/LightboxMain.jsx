import styled from 'styled-components';
import { condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';

import LightboxArrow from './LightboxArrow';
import LightboxHeader from './LightboxHeader';
import LightboxCounter from './LightboxCounter';

const StyledLightboxMain = styled.div`
  width: 100%;
  height: 35vh;
  max-height: 450px;

  overflow: hidden;
  z-index: 10003;

  ${condition('isOpen')`
    height: 100%;
    max-height: none;
    background-color: black;
    
    -ms-content-zooming: none;
    -ms-user-select: none;
    -ms-touch-select: none;
    touch-action: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
`;

const StyledOuterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  cursor: pointer;

  ${condition('isOpen')`
    position: relative;
    top: 50px;
    margin: 0 auto;
    height: calc(100% - 100px);
    cursor: revert;
  `}

  > div {
    z-index: 1;
  }

  ${breakpoint(1)`
    position: relative;
    top: 112px !important;
    margin: 0 auto;
    height: calc(100% - 224px) !important;
    width: calc(100% - 192px) !important;

`}
`;

const StyledTrack = styled.div`
  display: inline-block;
  height: 100%;
  width: ${({ count }) => count * 100}%;
  position: relative;
  top: 0;
  left: 0;

  transform: translate(
    ${({ count, slideIndex }) => slideIndex * (1 / count) * -100}%
  );
  transition: transform 1s;

  ${condition('isOpening')`
    transition: none;
  `}

  > div {
    display: inline-block;
    position: relative;
    height: 100%;
    width: ${({ count }) => (1 / count) * 100}%;
  }
  > div > picture {
    width: 100%;
  }
  > div > picture > img {
    touch-action: pinch-zoom;
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${condition('isOpen')`
      object-fit: contain;
    `}
  }
  ${breakpoint(1)`
    > div > picture > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }   
  `}
`;

const StyledArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ left }) => left || 'unset'};
  right: ${({ right }) => right || 'unset'};
  width: 70px;
  height: 70px;
  z-index: 1000;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: transparent;
`;

const LightBoxMain = (props) => {
  const {
    currIndex,
    isOpen,
    isOpening,
    imgCount,
    loadedImages,
    showNavArrows,
    lightboxRef,
    PictureTile,
    onClick,
    onClose,
    onKeyDown,
    onMoveNext,
    onMovePrev,
    onTouchEnd,
    onTouchStart,
  } = props;

  if (!isOpen && PictureTile) {
    return <PictureTile />;
  }
  return (
    <StyledLightboxMain
      isOpen={isOpen}
      ref={lightboxRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex="0"
    >
      <StyledOuterContainer>
        {isOpen && (
          <LightboxHeader
            currIndex={currIndex}
            imgCount={imgCount}
            onClose={onClose}
          />
        )}
        {!isOpen && (
          <LightboxCounter currIndex={currIndex} imgCount={imgCount} />
        )}
        <StyledInnerContainer isOpen={isOpen}>
          <StyledTrack
            slideIndex={currIndex}
            count={imgCount}
            isOpen={isOpen}
            isOpening={isOpening}
          >
            {loadedImages &&
              loadedImages.map((img) => (
                <div key={img.src}>
                  <picture>
                    <source srcSet={img.srcSet} />
                    <img src={img.src} alt="description" />
                  </picture>
                </div>
              ))}
          </StyledTrack>
        </StyledInnerContainer>
        {isOpen && showNavArrows && (
          <>
            <StyledArrowWrapper left="calc(0.5% + 10px)">
              <LightboxArrow
                direction="left"
                onClick={onMovePrev}
                disabled={currIndex === 0}
              />
            </StyledArrowWrapper>
            <StyledArrowWrapper right="calc(0.5% + 10px)">
              <LightboxArrow
                direction="right"
                onClick={onMoveNext}
                disabled={currIndex === imgCount - 1}
              />
            </StyledArrowWrapper>
          </>
        )}
      </StyledOuterContainer>
    </StyledLightboxMain>
  );
};
export default LightBoxMain;
