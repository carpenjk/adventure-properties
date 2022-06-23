import { useContext } from 'react';
import ImageWrapper from '../ImageLoader/ImageWrapper';
import ImgButton from '../base/input/ImgButton';
import { ImageLoaderContext } from '../ImageLoader/ImageLoader';

const PictureTilesInner = ({ images, onPhotoClick }) => {
  const { onLoad } = useContext(ImageLoaderContext);

  return (
    <>
      {images.map((img, i) => (
        <ImageWrapper key={i} id={i}>
          <ImgButton
            type="button"
            onLoad={() => onLoad(i)}
            onClick={() => onPhotoClick(i)}
            loading="lazy"
            src={img.src}
            width={img.width}
            height={img.height}
            alt="property"
          />
        </ImageWrapper>
      ))}
    </>
  );
};

export default PictureTilesInner;
