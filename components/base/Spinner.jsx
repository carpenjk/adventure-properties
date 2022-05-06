import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';
import useLockBodyScroll from '../hooks/UseLockBodyScroll';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;
const StyledSpinner = styled.div`
  height: 350px;
  width: 350px;
  max-width: 100%;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    padding: 16px;
    font-family: ${({ theme }) => theme.fonts.raleway};
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.action[1]};
  }
`;

const Spinner = ({ message }) => {
  useLockBodyScroll(false, true);

  return (
    <StyledContainer>
      <StyledSpinner>
        <Triangle
          height="150"
          width="150"
          color="#7789C8"
          ariaLabel="loading"
        />
        <div>{message}</div>
      </StyledSpinner>
    </StyledContainer>
  );
};

export default Spinner;
