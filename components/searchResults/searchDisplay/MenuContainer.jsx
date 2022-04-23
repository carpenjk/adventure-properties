import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.space[3]}px;
  padding-bottom: ${({ theme }) => theme.space[3]}px;
`;
const MenuContaner = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default MenuContaner;
