import styled from 'styled-components';
import { signIn } from 'next-auth/react';
import { ActionButton } from '@carpenjk/base/button';

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 50vh;

  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
`;
const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  div {
    font-family: ${({ theme }) => theme.fonts.openSans};
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    line-height: 500%;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.mainText};
  }
`;
const Login = () => (
  <StyledLogin>
    <StyledInnerWrapper>
      <div>You must login to view your reservations.</div>
      <ActionButton variant="login" onClick={signIn}>
        Login
      </ActionButton>
    </StyledInnerWrapper>
  </StyledLogin>
);

export default Login;
