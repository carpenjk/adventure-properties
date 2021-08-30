import styled from 'styled-components';
import { useRef, useEffect } from 'react';
const StyledCloseButton = styled.button`
  display: ${({ isDisplayed }) => (isDisplayed ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  padding: 0;
  height: ${(props) => props.buttonSize.height};
  width: ${(props) => props.buttonSize.width};
  background: ${(props) => (props.background ? props.background : 'none')};
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.iconSize};
    font-weight: normal;
    color: ${(props) => props.iconColor};
  }
`;

const CloseButton = (props) => {
  const {
    onClick,
    onKeyDown,
    isDisplayed,
    buttonIcon,
    buttonSize,
    iconSize,
    iconColor,
    wrapperClass,
  } = props;

  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  });

  return (
    <StyledCloseButton
      tabIndex="0"
      onKeyDown={onKeyDown}
      className={wrapperClass}
      isDisplayed={isDisplayed}
      onClick={onClick}
      buttonIcon={buttonIcon}
      iconSize={iconSize}
      iconColor={iconColor}
      buttonSize={buttonSize}
      type="button"
      aria-label="Close"
      ref={buttonRef}
    >
      <span aria-hidden="true">&#10006;</span>
    </StyledCloseButton>
  );
};

export default CloseButton;
