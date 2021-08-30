import styled from 'styled-components';
import { NavMenu_config } from '../../compConfig';
import { NavToggle_config } from '../../compConfig';

//components
import NavToggle from '../NavToggle';
import NavMenu from '../NavMenu';

const StyledScrollContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

const MobileMenuLayout = (props) => {
  const { mobileBreakpoint, isOpen } = props;
  return (
    <StyledScrollContainer>
      <NavToggle
        wrapperClass="navToggle"
        items={NavToggle_config.items}
        mobileBreakpoint={mobileBreakpoint}
        displayVertical={isOpen}
      />
      <NavMenu
        wrapperClass="navMenu"
        position={NavMenu_config.position}
        items={NavMenu_config.items}
        mobileBreakpoint={mobileBreakpoint}
        displayVertical={isOpen}
      />
    </StyledScrollContainer>
  );
};

export default MobileMenuLayout;
