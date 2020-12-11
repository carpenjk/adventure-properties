import styled from 'styled-components';
import { condition } from 'dataweaver';
import SliderNavButton from './SliderNavButton';

const StyledNavContainer = styled.div`
  z-index: 999999;
  position: relative;
  left: 0;
  top: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 10%;
  min-width: 85px;
  max-width: 100px;
`;

const SliderNavContainer = (props) => {
  const { tw, direction, hideButton, onClick, buttonRef } = props;

  return (
    <StyledNavContainer tw={tw}>
      <SliderNavButton
        direction={direction}
        innerRef={buttonRef}
        onClick={onClick}
        hide={hideButton}
      >
        {'<'}
      </SliderNavButton>
    </StyledNavContainer>
  );
};

export default SliderNavContainer;
