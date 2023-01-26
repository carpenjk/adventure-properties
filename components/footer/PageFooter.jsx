import styled from 'styled-components';
import ToggleFooterContent from './ToggleFooterContent';
import ProfileDrawerButton from './ProfileDrawerButton';
import ProfileNavLayout from './ProfileNavLayout';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
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
