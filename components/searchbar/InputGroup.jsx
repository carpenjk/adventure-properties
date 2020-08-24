import styled from 'styled-components';
import {
  breakpoint,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
} from 'themeweaver';
import { getProp } from '../../utils/themeweaver-utils';

const StyledInputGroup = styled.div`
  display: ${(props) => (getProp('isVisible')(props) ? 'flex' : 'none')};
  flex-direction: column;

  ${({ isSearchBarOpen }) => {
    if (!isSearchBarOpen) {
      return `
        &.inputGroup > * {
          margin: 0;
        }
      `;
    }
  }}

  &.inputGroup > *:last-child {
    ${(props) =>
      !getProp('lastBottomMargin')(props) ? 'margin-bottom: 0;' : ''}
    ${(props) => (!getProp('lastRightMargin')(props) ? 'margin-right: 0;' : '')}
  }
  ${breakpoint(1)`
      display: flex;
      justify-content: center;
      flex-direction: row;

      &.inputGroup > * {
        margin-top: ${getMarginTop('input.searchBar', '0')};
        margin-right: ${getMarginRight('input.searchBar', '1.4rem')};
        margin-bottom: ${getMarginBottom('input.searchBar', '2rem')};
        margin-left: ${getMarginLeft('input.searchBar', '0')};
      }
    
    &.inputGroup > *:last-child {
    ${(props) =>
      !getProp('lastBottomMargin', 1)(props) ? 'margin-bottom: 0;' : ''}
    ${(props) =>
      !getProp('lastRightMargin', 1)(props) ? 'margin-right: 0;' : ''}
    }
    `}
`;

StyledInputGroup.defaultProps = {
  isVisible: true,
  lastItemMarginBottom: undefined,
};

const InputGroup = (props) => {
  const {
    InputFields,
    isVisible,
    onInputFocus,
    valueFunctions,
    inputRefs,
    lastBottomMargin,
    lastRightMargin,
    isSearchBarOpen,
  } = props;

  return (
    <StyledInputGroup
      className="inputGroup"
      isVisible={isVisible}
      isSearchBarOpen={isSearchBarOpen}
      lastBottomMargin={lastBottomMargin}
      lastRightMargin={lastRightMargin}
    >
      <InputFields
        onInputFocus={onInputFocus}
        valueFunctions={valueFunctions}
        inputRefs={inputRefs}
      />
    </StyledInputGroup>
  );
};

export default InputGroup;
