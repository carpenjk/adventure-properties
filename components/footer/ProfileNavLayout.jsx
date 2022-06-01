import styled from 'styled-components';
import { getMaxWidth } from 'themeweaver';

const StyledLayout = styled.nav`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  padding-left: ${({ theme }) => theme.space[2]}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary[0]}80;
  box-shadow: 0px 8px 28px ${({ theme }) => theme.colors.primary[0]}80;
`;
const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.poppins};
  color: ${({ theme }) => theme.colors.primary[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  width: 100%;
  max-width: ${getMaxWidth('content')}px;
`;
const StyledProfile = styled.div`
  display: flex;
  width: 150px;
  height 150px;
  background: grey;
`;
const ProfileNavLayout = () => (
  <StyledLayout>
    <StyledInnerContainer>
      <StyledProfile />
      <ul>
        <li>demo 1</li>
        <li>demo 2</li>
        <li>demo 3</li>
      </ul>
    </StyledInnerContainer>
  </StyledLayout>
);

export default ProfileNavLayout;
