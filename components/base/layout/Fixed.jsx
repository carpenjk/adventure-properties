import { getProp, condition } from 'dataweaver';
import { useRef } from 'react';
import styled from 'styled-components';
import useAdjustForScrollBar from '../../hooks/UseAdjustForScrollBar';
import useIsoLayoutEffect from '../../hooks/UseIsoLayoutEffect';

const StyledFixed = styled.div`
  position: fixed;
  height: ${getProp('height')};
  width: ${getProp('width')};
  min-width: ${getProp('minWidth')};
  z-index: 10001;
  ${condition('top')`
    top: ${getProp('offset')};
  `}
  ${condition('right')`
    right: ${getProp('offset')};
  `}
  ${condition('bottom')`
    bottom: ${getProp('offset')};
  `}
  ${condition('left')`
    left: ${getProp('offset')};
  `}
`;

const StyledFiller = styled.div`
  background: transparent;
`;

StyledFixed.defaultProps = {
  height: 'auto',
  width: 'auto',
  offset: 0,
  // minWidth: '320px',
};

const Fixed = ({
  children,
  adjustForScrollbar,
  useFillerElement,
  ...passProps
}) => {
  const containerRef = useRef();
  const fillerRef = useRef();
  // const scrollBarWidth = useScrollBarWidth();
  useIsoLayoutEffect(() => {
    if (containerRef.current) {
      if (useFillerElement && fillerRef.current) {
        fillerRef.current.style.height = window.getComputedStyle(
          containerRef.current
        ).height;
      }
    }
  }, [containerRef.current, useFillerElement, fillerRef.current]);

  const _useAdjustForScrollBar = adjustForScrollbar
    ? useAdjustForScrollBar
    : () => undefined;
  _useAdjustForScrollBar(containerRef);

  return (
    <>
      <StyledFixed {...passProps} ref={containerRef}>
        {children}
      </StyledFixed>
      {useFillerElement && <StyledFiller ref={fillerRef} />}
    </>
  );
};

export default Fixed;
