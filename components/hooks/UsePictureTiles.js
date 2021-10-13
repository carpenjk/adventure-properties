import { useCallback } from 'react';
import PictureTiles from '../property/PictureTiles';

const usePictureTiles = ({ images, onOverlayClick, onPhotoClick }) => {
  const Tiles = useCallback(() => {
    const displayCount = {
      1: 1,
      2: 1,
      3: 3,
      4: 3,
      5: 5,
    };
    function getUrls() {
      const pCountLookup =
        images.length > displayCount.length
          ? displayCount.length
          : images.length;
      const pCount = displayCount[pCountLookup];
      const displayImgs = images.slice(0, pCount);
      const mainModifiers = '?fit=fill&w=800&h=533';
      const modifiers = '?fit=fill&w=500&h=333';

      function buildModifiedUrls(photo, i) {
        if (i === 1) {
          return `${photo}${mainModifiers}`;
        }
        return `${photo}${modifiers}`;
      }
      return displayImgs.map((photo, i) => buildModifiedUrls(photo, i));
    }
    const tileImageUrls = getUrls();
    return (
      <PictureTiles onOverlayClick={onOverlayClick}>
        {tileImageUrls.map((img, i) => (
          <img
            loading="lazy"
            key={i}
            src={img}
            alt="property"
            onClick={() => onPhotoClick(i)}
          />
        ))}
      </PictureTiles>
    );
  }, [images]);
  return Tiles;
};

export default usePictureTiles;
