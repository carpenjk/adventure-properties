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

  &:hover {
    background: rgb(74, 74, 74);
  }

  ${condition('disabled')`
    color: rgb(74,74,74);
    border-color: rgb(74,74,74);
    &:hover {
      background: transparent;  
    }
  `}
`;
const LightboxArrow = ({ direction, onClick, disabled }) => {
  function handleClick(e) {
    onClick(e);
    e.stopPropagation();
  }
  return (
    <StyledArrowContainer onClick={handleClick} disabled={disabled}>
      {direction === 'left' && '<'}
      {direction === 'right' && '>'}
    </StyledArrowContainer>
  );
};

export default LightboxArrow;
