import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  opacity: 75%;
  transition: background ease-in 1s;
  z-index: -1;
  &.isOpen {
    z-index: 1;
    display: flex;
    background: #b9bcbb;
  }
`;

const StyledSpinner = styled.div`
  > .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  > .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #cef;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #cef transparent transparent transparent;
  }
  > .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  > .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  > .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InlineSpinner = ({ isOpen }) => (
  <StyledContainer className={isOpen ? 'isOpen' : ''}>
    <StyledSpinner style={!isOpen ? { display: 'none' } : undefined}>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledSpinner>
  </StyledContainer>
);

export default InlineSpinner;
