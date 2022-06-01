import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.space[3]}px;
  padding-bottom: ${({ theme }) => theme.space[3]}px;
  flex: none;
  width: 100%;

  > span {
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    line-height: 150%;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.action[1]};
  }
`;
const Message = ({ message }) => (
  <StyledContainer>
    <span>{message}</span>
  </StyledContainer>
);

export default Message;
