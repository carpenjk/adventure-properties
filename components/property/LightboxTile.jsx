import styled from 'styled-components';
import PictureTiles from './PictureTiles';

const LightboxTile = ({ images, onPhotoClick, onOverlayClick }) => (
  <PictureTiles onOverlayClick={handleOverlayClick}>
    {tileImageUrls.map((img, i) => (
      <img
        loading="lazy"
        key={i}
        src={img}
        alt="property"
        onClick={() => handlePhotoClick(i).bind(this)}
      />
    ))}
  </PictureTiles>
);

export default LightboxTile;
