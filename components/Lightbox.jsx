import styled from 'styled-components';
import { getProp, condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';
import { Portal } from 'react-portal';
import { useEffect, useRef } from 'react';
import useLockBodyScroll from './hooks/UseLockBodyScroll';
import useTouch from './hooks/UseTouch';
import LightboxArrow from './LightboxArrow';
import LightboxHeader from './LightboxHeader';
import LightBoxMain from './LightboxMain';

const StyledLightbox = styled.div`
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
``    left: 0;
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

const Lightbox = (props) => {
  const {
    PictureTile,
    images,
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
    showNavArrows,
  } = props;

  const lightboxRef = useRef(null);
  const touch = useTouch({ onTouchLeft: onMoveNext, onTouchRight: onMovePrev });

  useLockBodyScroll(true, isOpen);

  function handleClick() {
    onMoveNext();
  }
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        onMovePrev();
        break;
      case 'ArrowRight':
        onMoveNext();
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [lightboxRef]);

  if (!isOpen && PictureTile) {
    return <PictureTile />;
  }
  if (isOpen) {
    return (
      <Portal isOpen={isOpen}>
        <LightBoxMain
          isOpen={isOpen}
          currIndex={currIndex}
          imgCount={imgCount}
          showNavArrows={showNavArrows}
          prevSrc={prevSrc}
          prevSrcSet={prevSrcSet}
          currSrc={currSrc}
          currSrcSet={currSrcSet}
          nextSrc={nextSrc}
          nextSrcSet={nextSrcSet}
          ref={lightboxRef}
          onClick={handleClick}
          onMoveNext={onMoveNext}
          onMovePrev={onMovePrev}
          onClose={onClose}
          onKeyDown={isOpen && handleKeyDown}
          onTouchStart={(isOpen || openInPlace) && touch.onTouchStart}
          onTouchEnd={(isOpen || openInPlace) && touch.onTouchEnd}
          tabIndex="0"
        />
      </Portal>
    );
  }
  if (openInPlace) {
    return (
      <LightBoxMain
        isOpen={isOpen}
        currIndex={currIndex}
        imgCount={imgCount}
        showNavArrows={showNavArrows}
        prevSrc={prevSrc}
        prevSrcSet={prevSrcSet}
        currSrc={currSrc}
        currSrcSet={currSrcSet}
        nextSrc={nextSrc}
        nextSrcSet={nextSrcSet}
        ref={lightboxRef}
        onClick={isOpen && handleClick}
        onMoveNext={onMoveNext}
        onMovePrev={onMovePrev}
        onClose={onClose}
        onKeyDown={isOpen && handleKeyDown}
        onTouchStart={(isOpen || openInPlace) && touch.onTouchStart}
        onTouchEnd={(isOpen || openInPlace) && touch.onTouchEnd}
        tabIndex="0"
      />
    );
  }
};

Lightbox.defaultProps = {
  showNavArrows: true,
  openInPlace: false,
};
export default Lightbox;
