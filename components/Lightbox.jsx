import styled from 'styled-components';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { getProp, condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';
import { Portal } from 'react-portal';

import useLockBodyScroll from './hooks/UseLockBodyScroll';
import useTouch from './hooks/UseTouch';
import LightboxArrow from './LightboxArrow';
import LightboxHeader from './LightboxHeader';
import LightBoxMain from './LightboxMain';

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
    onOpen,
    preloadCount,
    currIndex,
    imgCount,
    openInPlace,
    showNavArrows,
    tileImageUrls,
  } = props;

  const lightboxRef = useRef(null);
  const touch = useTouch({ onTouchLeft: onMoveNext, onTouchRight: onMovePrev });

  const bodyLock = useLockBodyScroll(true, isOpen);

  const [loadedImages, setLoadedImages] = useState(
    images ? images.slice(0, currIndex + preloadCount) : null
  );

  useEffect(() => {
    setLoadedImages(images.slice(0, currIndex + preloadCount));
  }, [currIndex, images, preloadCount]);

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

  useEffect(() => {
    if (isOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <Portal isOpen={isOpen}>
        <LightBoxMain
          loadedImages={loadedImages}
          isOpen={isOpen}
          currIndex={currIndex}
          imgCount={imgCount}
          showNavArrows={showNavArrows}
          preloadCount={preloadCount}
          prevSrc={prevSrc}
          prevSrcSet={prevSrcSet}
          currSrc={currSrc}
          currSrcSet={currSrcSet}
          nextSrc={nextSrc}
          nextSrcSet={nextSrcSet}
          lightboxRef={lightboxRef}
          onClick={onOpen}
          onMoveNext={onMoveNext}
          onMovePrev={onMovePrev}
          onClose={onClose}
          onKeyDown={isOpen ? handleKeyDown : undefined}
          onTouchStart={isOpen || openInPlace ? touch.onTouchStart : undefined}
          onTouchEnd={isOpen || openInPlace ? touch.onTouchEnd : undefined}
          tabIndex="0"
        />
      </Portal>
    );
  }

  return (
    <LightBoxMain
      loadedImages={loadedImages}
      isOpen={isOpen}
      PictureTile={PictureTile}
      currIndex={currIndex}
      imgCount={imgCount}
      showNavArrows={showNavArrows}
      preloadCount={preloadCount}
      prevSrc={prevSrc}
      prevSrcSet={prevSrcSet}
      currSrc={currSrc}
      currSrcSet={currSrcSet}
      nextSrc={nextSrc}
      nextSrcSet={nextSrcSet}
      lightboxRef={lightboxRef}
      onClick={onOpen}
      onMoveNext={onMoveNext}
      onMovePrev={onMovePrev}
      onClose={onClose}
      onKeyDown={isOpen ? handleKeyDown : undefined}
      onTouchStart={isOpen || openInPlace ? touch.onTouchStart : undefined}
      onTouchEnd={isOpen || openInPlace ? touch.onTouchEnd : undefined}
      tabIndex="0"
    />
  );
};

Lightbox.defaultProps = {
  showNavArrows: true,
};

export default Lightbox;
