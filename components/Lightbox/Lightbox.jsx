import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Portal } from 'react-portal';
import ScrollLock from '../scrollLock/ScrollLock';
import useTouch from '../hooks/UseTouch';
import LightBoxMain from './LightboxMain';

const Lightbox = (props) => {
  const {
    images,
    isOpen,
    onClose,
    onMovePrev,
    onMoveNext,
    onOpen,
    preloadCount,
    currIndex,
    imgCount,
    openInPlace,
    showNavArrows,
  } = props;

  const lightboxRef = useRef(null);
  const touch = useTouch({ onTouchLeft: onMoveNext, onTouchRight: onMovePrev });
  const [loadedImages, setLoadedImages] = useState(
    images ? images.slice(0, currIndex + preloadCount) : null
  );
  const [isOpening, setIsOpening] = useState(isOpen);

  //* **************effects************** */
  // preLoad Images
  useEffect(() => {
    setLoadedImages(images.slice(0, currIndex + preloadCount));
  }, [currIndex, images, preloadCount, isOpen]);

  // turns transition off on slide for better opening effect
  useLayoutEffect(() => {
    if (isOpen) {
      setIsOpening(true);
    }
  }, [isOpen]);

  // turns transition back on once open
  useEffect(() => {
    if (isOpening) {
      setIsOpening(false);
    }
  }, [isOpening]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        onMovePrev(e);
        break;
      case 'ArrowRight':
        onMoveNext(e);
        break;
      case 'Escape':
        onClose(e);
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

  // focus on open
  useEffect(() => {
    if (isOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <Portal isOpen={isOpen}>
        <ScrollLock scrollNode={lightboxRef} reserveScrollBarGap />
        <LightBoxMain
          currIndex={currIndex}
          isOpen={isOpen}
          isOpening={isOpening}
          imgCount={imgCount}
          loadedImages={loadedImages}
          showNavArrows={showNavArrows}
          lightboxRef={lightboxRef}
          onClick={onOpen}
          onClose={onClose}
          onMoveNext={onMoveNext}
          onMovePrev={onMovePrev}
          onKeyDown={isOpen ? handleKeyDown : undefined}
          onTouchEnd={isOpen || openInPlace ? touch.onTouchEnd : undefined}
          onTouchStart={isOpen || openInPlace ? touch.onTouchStart : undefined}
          tabIndex="0"
        />
      </Portal>
    );
  }
  return null;
};

Lightbox.defaultProps = {
  showNavArrows: true,
};

export default Lightbox;
