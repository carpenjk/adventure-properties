import { useCallback, useMemo, useState, useRef } from 'react';

const useLightbox = ({ images, photoIndex, isOpen, srcSetParams }) => {
  const imgObjs = useMemo(
    () =>
      images.map((img) => ({
        srcSet: `${srcSetParams.reduce((srcSet, param) => {
          if (srcSet) {
            return `${srcSet},
                ${img.src}${param.suffix} ${param.size}`;
          }
          return `${img.src}${param.suffix} ${param.size}`;
        }, '')}
            `,
        src: img.src,
        sizes: img.sizes,
        width: img.width,
        height: img.height,
      })),
    [images, srcSetParams]
  );

  const [lightbox, setLightbox] = useState({
    images: imgObjs,
    photoIndex,
    isOpen,
  });

  function setImages(imgs) {
    setLightbox((prev) => ({ ...prev, images: imgs }));
  }

  //* ******** event handlers **************
  function handleMoveNext() {
    // calculate new index
    function updateIndexNext(prevIndex, imgs) {
      if (prevIndex < imgs.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    }
    // udate index state
    setLightbox((prev) => ({
      ...prev,
      photoIndex: updateIndexNext(prev.photoIndex, prev.images),
    }));
  }

  function handleMovePrev() {
    // calculate new index
    function updateIndexPrev(prevIndex) {
      if (prevIndex !== 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    }
    // set index state
    setLightbox((prev) => ({
      ...prev,
      photoIndex: updateIndexPrev(prev.photoIndex),
    }));
  }

  function handlePhotoClick(i) {
    setLightbox((prev) => ({ ...prev, photoIndex: i, isOpen: true }));
  }

  function handleLightboxClose(e) {
    setLightbox((prev) => ({ ...prev, photoIndex: 0, isOpen: false }));
    e.stopPropagation();
  }

  function handleLightboxOpen() {
    setLightbox((prev) => ({ ...prev, isOpen: true }));
  }

  const _handleLightboxClose = useCallback(handleLightboxClose, []);
  const _handleLightboxOpen = useCallback(handleLightboxOpen, []);
  const _handleMoveNext = useCallback(handleMoveNext, []);
  const _handleMovePrev = useCallback(handleMovePrev, []);
  const _handlePhotoClick = useCallback(handlePhotoClick, []);
  const _setImages = useCallback(setImages, []);

  const lightboxControl = useRef({
    handleLightboxClose: _handleLightboxClose,
    handleLightboxOpen: _handleLightboxOpen,
    handleMoveNext: _handleMoveNext,
    handleMovePrev: _handleMovePrev,
    handlePhotoClick: _handlePhotoClick,
    setImages: _setImages,
  });
  return {
    lightbox,
    lightboxControl: lightboxControl.current,
  };
};

export default useLightbox;
