import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledSkeleton = styled.div`
  top: 0;
  min-height: ${({ minHeight }) => minHeight};
`;

const Skeleton = ({ children, trimOffset = '64px' }) => {
  const ref = useRef();
  const [minHeight, setMinHeight] = useState('100vh');
  useEffect(() => {
    const topOffset = ref.current.getBoundingClientRect().y;
    setMinHeight(`calc(100vh - ${topOffset}px - ${trimOffset})`);
  }, [ref, trimOffset]);
  return (
    <StyledSkeleton minHeight={minHeight} ref={ref}>
      {children}
    </StyledSkeleton>
  );
};

export default Skeleton;
