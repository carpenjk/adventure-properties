import Link from 'next/link';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import ActionButton from './base/ActionButton';
import FooterNav from './FooterNav';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 20px;
  background-color: #7789c8;
`;

const StyledSignUp = styled.div`
  align-self: center;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
`;

const PageFooter = (props) => {
  const { navData } = props;

  return (
    <StyledFooter>
      <StyledSignUp>
        <ActionButton variant="signUp">Sign Up</ActionButton>
      </StyledSignUp>
      <FooterNav navData={navData} />
    </StyledFooter>
  );
};
export default PageFooter;
