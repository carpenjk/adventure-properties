import { useRef } from 'react';
import styled from 'styled-components';
import { useIsoOnClickOutside } from '@carpenjk/hooks';
import PopupModal from '@carpenjk/popup-modal';

const StyledFooterDrawer = styled.div`
  display: block;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  transform: translateY(100%);
  transition: transform 0.5s ease-in;
  z-index: 1000000;

  &.isOpen {
    transform: translateY(0%);
    transition: transform 0.5s ease-in;
  }
`;

const FooterDrawer = ({ menu, control, isOpen }) => {
  const Menu = menu;
  const drawerRef = useRef();

  useIsoOnClickOutside(drawerRef, control.close, []);
  return (
    <>
      {isOpen && (
        <PopupModal isOpen={isOpen} scrollNode={drawerRef} lockScroll />
      )}
      <StyledFooterDrawer ref={drawerRef} className={isOpen ? 'isOpen' : ''}>
        <Menu />
      </StyledFooterDrawer>
    </>
  );
};

export default FooterDrawer;
