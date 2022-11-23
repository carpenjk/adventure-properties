import styled from 'styled-components';
import { getMaxWidth } from '@carpenjk/themeweaver';
import Copyright from './Copyright';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: ${getMaxWidth('content')}px;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[3]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  padding-left: ${({ theme }) => theme.space[3]}px;
`;

const PageFooter = () => (
  <StyledFooter>
    <Copyright />
  </StyledFooter>
);
export default PageFooter;
