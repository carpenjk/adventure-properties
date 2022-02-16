import styled from 'styled-components';
import { useRef } from 'react';
import { getProp } from 'dataweaver';
import { getMaxHeight, getMinHeight } from 'themeweaver';
import useIsoLayoutEffect from '../../hooks/UseIsoLayoutEffect';

const StyledHeader = styled.header`
  position: ${getProp('position')};
  width: 100%;
  min-height: ${getMinHeight('header', '0')};
  max-height: ${getMaxHeight('header', 'none')};
  z-index: 9999999;
`;
const StyledFiller = styled.div`
  background: transparent;
`;
StyledHeader.defaultProps = {
  position: 'relative',
};
const Header = (props) => {
  const { position, children } = props;
  const headerRef = useRef(null);
  const fillerRef = useRef(null);

  useIsoLayoutEffect((props) => {
    if (fillerRef.current && headerRef.current) {
      fillerRef.current.style.height = window.getComputedStyle(
        headerRef.current
      ).height;
    }
  }, []);

  return (
    <>
      <StyledHeader position={position} ref={headerRef}>
        {children}
      </StyledHeader>
      {(position === 'fixed' || position === 'absolute') && (
        <StyledFiller ref={fillerRef} />
      )}
    </>
  );
};

export default Header;
