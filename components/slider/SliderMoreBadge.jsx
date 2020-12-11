import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledMoreBadge = styled.button`
  flex: none;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: grey;
  color: blue;
`;

const SliderMoreBadge = (props) => {
  const { onClick, innerRef, text } = props;
  return (
    <StyledMoreBadge tabIndex={-1} ref={innerRef} onClick={onClick}>
      {text}
    </StyledMoreBadge>
  );
};

export default SliderMoreBadge;
