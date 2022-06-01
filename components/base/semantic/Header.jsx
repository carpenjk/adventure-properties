import styled from 'styled-components';
import { useRef } from 'react';
import { getProp } from 'dataweaver';
import { getBackgroundColor, getMaxHeight, getMinHeight } from 'themeweaver';
import useIsoLayoutEffect from '../../hooks/UseIsoLayoutEffect';

const StyledHeader = styled.header`
  position: ${getProp('position')};
  width: 100vw;
  min-height: ${getMinHeight({}, '0')};
  max-height: ${getMaxHeight({}, 'none')};
  background-color: ${getBackgroundColor({}, 'transparent')};
  z-index: 9999999;
`;
const StyledFiller = styled.div`
  background: transparent;
`;
StyledHeader.defaultProps = {
  position: 'relative',
};
const DEFAULT_TW = { semKey: 'header' };
const Header = (props) => {
  const { position, tw, children } = props;
  const mergedTW = { ...DEFAULT_TW, ...tw };
  const headerRef = useRef(null);
  const fillerRef = useRef(null);

  useIsoLayoutEffect(() => {
    if (headerRef.current) {
      if (fillerRef.current) {
        fillerRef.current.style.height = window.getComputedStyle(
          headerRef.current
        ).height;
      }
    }
  }, [headerRef.current, fillerRef.current]);

  return (
    <>
      <StyledHeader tw={mergedTW} position={position} ref={headerRef}>
        {children}
      </StyledHeader>
      {(position === 'fixed' || position === 'absolute') && (
        <StyledFiller ref={fillerRef} />
      )}
    </>
  );
};

export default Header;
