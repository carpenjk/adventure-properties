import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 272px;

  padding-top: ${({ theme }) => theme.space[5]}px;
  padding-bottom: ${({ theme }) => theme.space[5]}px;

  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  line-height: 150%;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.primary[0]};

  ${breakpoint(1)`
    min-width: 610px;
    padding-top: ${({ theme }) => theme.space[6]}px;
    padding-bottom: ${({ theme }) => theme.space[6]}px;
  `}
`;
const Message = ({ message }) => <StyledMessage>{message}</StyledMessage>;

export default Message;
