import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Portal } from 'react-portal';

import useLockBodyScroll from '../hooks/UseLockBodyScroll';
import useTouch from '../hooks/UseTouch';
import LightBoxMain from './LightboxMain';

const Lightbox = (props) => {
  const {
    PictureTile,
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
  const bodyLock = useLockBodyScroll(true, isOpen);
  const [loadedImages, setLoadedImages] = useState(
    images ? images.slice(0, currIndex + preloadCount) : null
  );
  const prevIsOpen = useRef(false);
  const prevCurrIndex = useRef(currIndex);
  const [isOpening, setIsOpening] = useState(isOpen);

  //* **************effects************** */
  // preLoad Images
  useEffect(() => {
    setLoadedImages(images.slice(0, currIndex + preloadCount));
  }, [currIndex, images, preloadCount, isOpen]);

  useLayoutEffect(() => {
    const indexChanged = currIndex !== prevCurrIndex.current;
    const isOpenChanged = isOpen !== prevIsOpen.current;

    if (isOpenChanged && isOpen) {
      setIsOpening(true);
    } else if (indexChanged && !isOpenChanged) {
      setIsOpening(false);
    }
    prevCurrIndex.current = currIndex;
    prevIsOpen.current = isOpen;
  }, [currIndex, isOpen]);

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

  // Lock and unlock scrolling
  useEffect(() => {
    if (isOpen) {
      bodyLock.lock();
    } else {
      bodyLock.unlock();
    }
  }, [isOpen, bodyLock]);

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
        <LightBoxMain
          currIndex={currIndex}
          isOpen={isOpen}
          isOpening={isOpening}
          imgCount={imgCount}
          loadedImages={loadedImages}
          preloadCount={preloadCount}
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

  return (
    <LightBoxMain
      currIndex={currIndex}
      isOpen={isOpen}
      isOpening={isOpening}
      imgCount={imgCount}
      loadedImages={loadedImages}
      preloadCount={preloadCount}
      showNavArrows={showNavArrows}
      PictureTile={PictureTile}
      lightboxRef={lightboxRef}
      onClick={onOpen}
      onClose={onClose}
      onKeyDown={isOpen ? handleKeyDown : undefined}
      onMoveNext={onMoveNext}
      onMovePrev={onMovePrev}
      onTouchEnd={isOpen || openInPlace ? touch.onTouchEnd : undefined}
      onTouchStart={isOpen || openInPlace ? touch.onTouchStart : undefined}
      tabIndex="0"
    />
  );
};

Lightbox.defaultProps = {
  showNavArrows: true,
};

export default Lightbox;
