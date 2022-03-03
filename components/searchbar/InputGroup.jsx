import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${condition('hide')`
      display: none;
  `}

  ${breakpoint(1)`
      display: flex;
      justify-content: center;
      flex-direction: row;
    ${condition('hide')`
      display: none;
    `}
      
  `}
`;

StyledInputGroup.defaultProps = {
  hide: false,
};

const InputGroup = (props) => {
  const { hide, children } = props;

  return (
    <StyledInputGroup className="inputGroup" hide={hide}>
      {children}
    </StyledInputGroup>
  );
};

export default InputGroup;
