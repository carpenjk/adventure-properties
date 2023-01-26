import styled from 'styled-components';
import { getProp } from '@carpenjk/prop-x/css';

const StyledFooterDrawer = styled.div`
  display: block;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  width: 100vw;
  max-height: ${getProp('maxHeight')};
  overflow-y: scroll;
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

const FooterDrawer = ({ Menu, isOpen, bottomOffset, maxHeight }) => (
  <StyledFooterDrawer
    className={isOpen ? 'isOpen' : ''}
    bottomOffset={bottomOffset}
    maxHeight={maxHeight}
  >
    <Menu />
  </StyledFooterDrawer>
);

export default FooterDrawer;
