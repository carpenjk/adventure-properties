import styled from 'styled-components';
import { useIsoOnClickOutside } from '@carpenjk/hooks';

import { getProp } from '@carpenjk/prop-x/css';

const StyledFooterDrawer = styled.div`
  display: block;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  transform: translateY(100%);
  transition: transform 0.5s ease-in;
  z-index: 1000001;

  &.isOpen {
    transform: translateY(${getProp('bottomOffset')});
    transition: transform 0.5s ease-in;
  }
`;

StyledFooterDrawer.defaultProps = {
  bottomOffset: '0px',
};

const FooterDrawer = ({ Menu, control, isOpen, bottomOffset, drawerRef }) => {
  useIsoOnClickOutside(drawerRef, control.close, []);
  return (
    <StyledFooterDrawer
      ref={drawerRef}
      className={isOpen ? 'isOpen' : ''}
      bottomOffset={bottomOffset}
    >
      <Menu />
    </StyledFooterDrawer>
  );
};

export default FooterDrawer;
