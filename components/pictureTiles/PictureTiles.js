import Tiles from './Tiles';
import PictureTilesInner from './PictureTilesInner';
import { ImageLoader } from '../ImageLoader/ImageLoader';

const DEFAULT_OPTIONS = {
  imgProps: {
    large: {
      width: 800,
      height: 533,
      fit: 'fill',
    },
    small: {
      width: 500,
      height: 333,
      fit: 'fill',
    },
  },
  numDisplayedMap: [1, 1, 3, 3, 5],
};

const PictureTiles = ({ images, onOverlayClick, onPhotoClick, options }) => {
  // mapping determines how many images to display based on provided number of images
  const _options = { ...DEFAULT_OPTIONS, ...options };
  const { numDisplayedMap, gridHeight } = _options;
  const pCountLookup =
    images.length > numDisplayedMap.length
      ? numDisplayedMap.length - 1
      : images.length - 1;
  const pCount = numDisplayedMap[pCountLookup];

  function getUrl(img, defaults, i) {
    const { small, large } = defaults;
    if (i === 0) {
      return `${img}?fit=${large.fit}&w=${large.width}&h=${large.height}`;
    }
    return `${img}?fit=${small.fit}&w=${small.width}&h=${small.height}`;
  }

  function getImgProps() {
    // get subset of images to display in tiles
    const displayImgs = images.slice(0, pCount);
    const { small, large } = _options.imgProps;
    const iProps = displayImgs.map((img, i) => ({
      src: getUrl(img, _options.imgProps, i),
      width: i === 0 ? large.width : small.width,
      height: i === 0 ? large.height : small.height,
    }));
    return iProps;
  }
  console.log('render');
  const imgProps = getImgProps();
  return (
    <ImageLoader numImages={pCount}>
      <Tiles
        imgCount={pCount}
        onOverlayClick={onOverlayClick}
        gridHeight={gridHeight}
      >
        <PictureTilesInner onPhotoClick={onPhotoClick} images={imgProps} />
      </Tiles>
    </ImageLoader>
  );
};

export default PictureTiles;
