import { useState } from 'react';

const useLightbox = ({ images, photoIndex, isOpen }) => {
  // const [images, setImages] = useState([]);
  // const [photoIndex, setPhotoIndex] = useState(0);
  // const [openLightbox, setOpenLightbox] = useState(false);

  const [lightbox, setLightbox] = useState({
    images,
    photoIndex,
    isOpen,
  });

  function setImages(imgs) {
    setLightbox((prev) => ({ ...prev, images: imgs }));
  }

  //* ******** event handlers **************
  function handleMoveNext() {
    // calculate new index
    function updateIndexNext(prevIndex) {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    }
    // udate index state
    setLightbox((prev) => ({
      ...prev,
      photoIndex: updateIndexNext(prev.photoIndex),
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
    // setPhotoIndex(i);
    // setOpenLightbox(true);
  }

  function handleLightboxClose(e) {
    setLightbox((prev) => ({ ...prev, photoIndex: 0, isOpen: false }));
    // setOpenLightbox(false);
    // setPhotoIndex(0);
    e.stopPropagation();
  }

  function handleLightboxOpen() {
    setLightbox((prev) => ({ ...prev, isOpen: true }));
    // setOpenLightbox(true);
  }
  return { ...lightbox, setImages };
};

export default useLightbox;
