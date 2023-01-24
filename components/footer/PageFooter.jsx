import styled from 'styled-components';
import { getMaxWidth } from '@carpenjk/themeweaver';
import ToggleFooterContent from './ToggleFooterContent';
import ProfileDrawerButton from './ProfileDrawerButton';
import ProfileNavLayout from './ProfileNavLayout';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 55px;
  max-width: ${getMaxWidth('content')}px;
`;

const PageFooter = () => (
  <StyledFooter>
    <ToggleFooterContent
      bottomOffset="-55px"
      ToggleButton={ProfileDrawerButton}
      DrawerComponent={ProfileNavLayout}
    />
  </StyledFooter>
);
export default PageFooter;
