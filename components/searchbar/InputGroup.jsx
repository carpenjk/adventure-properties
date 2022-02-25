import styled from 'styled-components';
import {
  breakpoint,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
} from 'themeweaver';
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
      

      &.inputGroup > * {
        margin-top: ${getMarginTop('input.searchBar', '0')};
        margin-right: ${getMarginRight('input.searchBar', '1.4rem')};
        margin-bottom: ${getMarginBottom('input.searchBar', '2rem')};
        margin-left: ${getMarginLeft('input.searchBar', '0')};
        margin: 0;
      }   
  `}
`;

StyledInputGroup.defaultProps = {
  hide: false,
};

const InputGroup = (props) => {
  const { InputFields, hide, groupKey } = props;

  return (
    <StyledInputGroup key={groupKey} className="inputGroup" hide={hide}>
      <InputFields {...props} />
    </StyledInputGroup>
  );
};

export default InputGroup;
