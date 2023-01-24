import { getIndexedPropValue } from '@carpenjk/prop-x';
import { StyledBadge } from './styled/StyledBadge';

const ImageBadge = ({ image, ...props }) => {
  const { width: imgWidth, height: imgHeight, alt, ...remImgProps } = image;
  return (
    <StyledBadge {...props} imgWidth={imgWidth} imgHeight={imgHeight}>
      <img
        {...remImgProps}
        alt={alt}
        width={getIndexedPropValue(imgWidth, 99)}
        height={getIndexedPropValue(imgHeight, 99)}
      />
    </StyledBadge>
  );
};
export default ImageBadge;
