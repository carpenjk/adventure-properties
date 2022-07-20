import styled from 'styled-components';
import { condition, unwindProps, getProp } from 'dataweaver';
import { breakpoint } from 'themeweaver';

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
  opacity: ${getProp('opacity')};

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
  ${breakpoint(1)`
    opacity: ${getProp('opacity')};
  `}
`;
const LightboxArrow = ({ direction, onClick, disabled, hide, buttonRef }) => {
  function handleClick(e) {
    onClick(e);
    e.stopPropagation();
  }

  const opacity = unwindProps({ hide }).map((v) => (!v.hide ? '100%' : '0'));
  return (
    <StyledArrowContainer
      onClick={handleClick}
      disabled={disabled}
      ref={buttonRef}
      opacity={opacity}
    >
      {direction === 'left' && '<'}
      {direction === 'right' && '>'}
    </StyledArrowContainer>
  );
};

export default LightboxArrow;
