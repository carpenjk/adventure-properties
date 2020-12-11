import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

const StyledSliderNavButton = styled.button`
  display: none;
  width: 65px;
  height: 65px;

  border-radius: 30px;
  ${condition(({ direction }) => direction === 'left')`
    background-color: grey;
    color: white;
    left: calc(-65px / 1.5);
  `}
  ${condition(({ direction }) => direction === 'right')`
    background-color: grey;
    color: white;
    right: calc(-65px / 1.5);
  `}
  ${breakpoint(1)`
    display: flex;
    justify-content: center;
    align-items: center;
    ${condition('hide')`
      display: none;
    `}
  `}
`;

const SliderNavButton = (props) => {
  const { onClick, innerRef, direction, hide } = props;
  return (
    <StyledSliderNavButton
      tabIndex={-1}
      direction={direction}
      ref={innerRef}
      onClick={onClick}
    >
      {direction === 'left' && '<'}
      {direction === 'right' && '>'}
    </StyledSliderNavButton>
  );
};

export default SliderNavButton;
