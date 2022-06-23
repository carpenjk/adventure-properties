import { useRef, useContext } from 'react';

import styled from 'styled-components';
import { ImageLoaderContext } from './ImageLoader';

const StyledLoadBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ffff;
  width: 100%;
  height: 100%;
  opacity: 100%;

  &.isLoaded {
    background: none;
    z-index: 0;
    transition: background ease-in 0.45s;
  }
`;

const ImageWrapper = ({ children, id }) => {
  const { images } = useContext(ImageLoaderContext);
  const elemRef = useRef();
  const isLoaded = images[id];
  const handleTransitionEnd = () => {
    elemRef.current.style.display = 'none';
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {children}
      <StyledLoadBackground
        ref={elemRef}
        onTransitionEnd={handleTransitionEnd}
        className={isLoaded ? 'isLoaded' : ''}
      />
    </div>
  );
};

export default ImageWrapper;
