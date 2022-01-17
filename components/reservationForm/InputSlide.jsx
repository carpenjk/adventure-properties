import styled from 'styled-components';
import { condition } from 'dataweaver';

const StyledInputSlide = styled.div`
  ${condition('hide')`
    display: none;
  `}
`;
const InputSlide = (props) => {
  const { children, index, slideState } = props;
  const { isEnabled, currSlide } = slideState;
  const isCurrent = index === currSlide;

  return (
    <StyledInputSlide hide={isEnabled && !isCurrent}>
      {children}
    </StyledInputSlide>
  );
};

export default InputSlide;
