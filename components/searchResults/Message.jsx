import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  height: 100px;
  padding-top: 16px;
  padding-bottom: 16px;
  flex: none;
  width: 100%;

  > span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.025em;
    color: #e5707a;
  }
`;
const Message = ({ message }) => (
  <StyledContainer>
    <span>{message}</span>
  </StyledContainer>
);

export default Message;
