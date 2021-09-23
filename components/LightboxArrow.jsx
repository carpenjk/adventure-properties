import styled from 'styled-components';
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

  &:hover {
    background: rgba(74, 74, 74, 0.4);
  }

  ${breakpoint(1)`
    &:hover {
      background: rgb(74, 74, 74);
    }
  `}

  

`;
const LightboxArrow = ({ direction, onClick }) => {
  function handleClick(e) {
    onClick(e);
    e.stopPropagation();
  }
  return (
    <StyledArrowContainer onClick={handleClick}>
      {direction === 'left' && '<'}
      {direction === 'right' && '>'}
    </StyledArrowContainer>
  );
};

export default LightboxArrow;
