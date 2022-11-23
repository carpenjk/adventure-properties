import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useContext, useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';
import { SpinnerContext } from './SpinnerContext';

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  > .react-spinner-loader-svg svg polygon {
    stroke-dasharray: 17;
    -webkit-animation: dash 3s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
    animation: dash 3s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
  }
`;

const Spinner = ({ delay }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { loadingMessage, setLoadingMessage } = useContext(SpinnerContext);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // clear loading message on unmount
  useEffect(() => () => setLoadingMessage(null), [setLoadingMessage]);

  return (
    showSpinner && (
      <StyledContainer>
        <StyledSpinner>
          <Triangle
            height="150"
            width="150"
            color="#7789C8"
            ariaLabel="loading"
          />
          <div>{loadingMessage}</div>
        </StyledSpinner>
      </StyledContainer>
    )
  );
};

export default Spinner;
