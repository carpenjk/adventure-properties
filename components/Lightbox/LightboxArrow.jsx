import styled from 'styled-components';
import { condition } from 'dataweaver';

const StyledArrowContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height 100%;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  color: inherit;
  ${condition('hide')`
    opacity: 0;
  `}

  &:hover {
    background: rgb(74, 74, 74);
    opacity: 100%;
    transition: opacity .5s ease-in;
  }

  ${condition('disabled')`
    color: rgb(74,74,74);
    border-color: rgb(74,74,74);
    &:hover {
      background: transparent;  
    }
  `}
`;
const LightboxArrow = ({ direction, onClick, disabled, hide, buttonRef }) => {
  function handleClick(e) {
    onClick(e);
    e.stopPropagation();
  }

  return (
    <StyledArrowContainer
      onClick={handleClick}
      disabled={disabled}
      ref={buttonRef}
      hide={hide}
    >
      {direction === 'left' && '<'}
      {direction === 'right' && '>'}
    </StyledArrowContainer>
  );
};

export default LightboxArrow;
