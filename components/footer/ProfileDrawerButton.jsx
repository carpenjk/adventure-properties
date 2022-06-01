import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: baseline;
  background: none;
  padding: 4px;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 24px;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.tertiary};

  &:hover {
    text-decoration: underline;
  }
`;
const ProfileDrawerButton = ({ onClick, children }) => (
  <StyledButton onClick={onClick} type="button">
    {children}
  </StyledButton>
);

export default ProfileDrawerButton;
