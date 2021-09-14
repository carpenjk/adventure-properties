import styled from 'styled-components';
import { condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';

import LightboxArrow from './LightboxArrow';
import LightboxHeader from './LightboxHeader';

const StyledLightboxMain = styled.div`
  width: 100%;
  height: 400px;

  overflow: hidden;
  z-index: 1000;

  ${condition('isOpen')`
    height: 100%;
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
  > div > picture > img {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  > div {
    z-index: 1;
  }

  > div.prev-img {
    left: -100%;
  }

  > div.next-img {
    left: 100%;
  }

  ${breakpoint(1)`
    overflow: hidden;
    position: relative;
    top: 112px !important;
    margin: 0 auto;
    height: calc(100% - 224px) !important;
    width: calc(100% - 192px) !important;
    > div {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
    }

    > div > picture {
      width: 100%;
      height: 100%;
    }
    > div > picture > img {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    > div.prev-img {
      left: -100%;
    }

    > div.next-img {
      left: 100%;
      z-index: 1;
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
    lightboxRef,
    onClick,
    onKeyDown,
    onTouchStart,
    onTouchEnd,
    isOpen,
    prevSrc,
    prevSrcSet,
    currSrc,
    currSrcSet,
    nextSrc,
    nextSrcSet,
    onClose,
    onMovePrev,
    onMoveNext,
    currIndex,
    imgCount,
    openInPlace,
    PictureTile,
    showNavArrows,
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
        <StyledInnerContainer>
          <div className="prev-img">
            <picture>
              <source srcSet={prevSrcSet} />
              <img
                src={prevSrc}
                alt="description"
                className="curr-img"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="curr-img">
            <picture>
              <source srcSet={currSrcSet} />
              <img src={currSrc} alt="description" loading="lazy" />
            </picture>
          </div>
          <div className="next-img">
            <picture>
              <source srcSet={nextSrcSet} />
              <img src={nextSrc} alt="description" loading="lazy" />
            </picture>
          </div>
        </StyledInnerContainer>
        {showNavArrows && (
          <>
            <StyledArrowWrapper left="calc(0.5% + 10px)">
              <LightboxArrow direction="left" onClick={onMovePrev} />
            </StyledArrowWrapper>
            <StyledArrowWrapper right="calc(0.5% + 10px)">
              <LightboxArrow direction="right" onClick={onMoveNext} />
            </StyledArrowWrapper>
          </>
        )}
      </StyledOuterContainer>
    </StyledLightboxMain>
  );
};
export default LightBoxMain;
