import styled from 'styled-components';

const StyledErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.OpenSans};
  font-style: normal;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  color: ${({ theme }) => theme.colors.action[1]};
`;

const ErrorContainer = ({ error }) => (
  <StyledErrorWrapper>{error}</StyledErrorWrapper>
);

export default ErrorContainer;
