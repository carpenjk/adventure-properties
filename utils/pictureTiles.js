import { getIndexedPropValue } from 'dataweaver';
import { createImageSrcProps } from './images/images';

const DEFAULT_OPTIONS = {
  imgProps: {
    large: {
      width: 880,
      height: 587,
      fit: 'fill',
    },
    small: {
      width: 500,
      height: 333,
      fit: 'fill',
    },
  },
  numDisplayedMap: [1, 1, 3, 3, 5],
  srcParams: [
    { w: 880, h: 587, q: 80, fit: 'fill' },
    [
      { w: 880, h: 587, q: 80, fit: 'fill' },
      { w: 500, h: 333, q: 80, fit: 'fill' },
    ],
  ],
  srcSetParams: [
    [
      { w: 380, h: 254, q: 80, fit: 'fill', width: '380w', size: '100vw' },
      // { w: 420, h: 280, q: 80, fit: 'fill', width: '420w', size: '100vw' },
      { w: 460, h: 307, q: 80, fit: 'fill', width: '460w', size: '100vw' },
      { w: 560, h: 364, q: 80, fit: 'fill', width: '560w', size: '100vw' },
      // { w: 600, h: 400, q: 80, fit: 'fill', width: '600w', size: '100vw' },
      { w: 640, h: 427, q: 80, fit: 'fill', width: '640w', size: '100vw' },
      { w: 880, h: 587, q: 80, fit: 'fill', width: '880w', size: '100vw' },
    ],
    undefined,
  ],
  firstImageSpans: [
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
};

const getPictureTileImages = (
  urls,
  srcParams,
  firstImageSpans,
  srcSetParams
) => {
  const {
    imgProps: { small, large },
  } = DEFAULT_OPTIONS;
  return urls.map((img, i) => {
    if (i === 0) {
      return {
        ...img,
        ...createImageSrcProps({
          urls: img.url,
          srcParams: getIndexedPropValue(srcParams, i),
          srcSetParams,
        }),
        width: large.width,
        height: large.height,
        rowSpan: firstImageSpans.row,
        colSpan: firstImageSpans.col,
      };
    }
    return {
      ...img,
      ...createImageSrcProps({
        urls: img.url,
        srcParams: getIndexedPropValue(srcParams, i),
      }),
      width: small.width,
      height: small.height,
      rowSpan: 1,
      colSpan: 1,
    };
  });
};

// full list of urls
const createPictureTileImageProps = (images) => {
  // create responsive array for urls
  const {
    numDisplayedMap,
    srcParams,
    srcSetParams,
    firstImageSpans,
  } = DEFAULT_OPTIONS;
  const pCountLookup =
    images.length > numDisplayedMap.length
      ? numDisplayedMap.length - 1
      : images.length - 1;
  const pCount = numDisplayedMap[pCountLookup];
  const smallSquares = pCount - 1;
  // Hard coded to 2 rows with first image taking up the first 2 rows and cols
  // remaining images fill the grid across rows
  const colCount = pCount !== 1 ? smallSquares / 2 + 2 : 2;
  const pictureTileProps = [
    getPictureTileImages(
      images.slice(0, 1),
      srcParams[0],
      firstImageSpans[0],
      srcSetParams[0]
    ),
    getPictureTileImages(
      images.slice(0, pCount),
      srcParams[1],
      firstImageSpans[1]
    ),
  ];

  return { images: pictureTileProps, columns: [1, colCount] };
};

export default createPictureTileImageProps;
