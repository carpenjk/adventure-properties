import styled from 'styled-components';
import {
  breakpoint,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
} from 'themeweaver';
import { getProp, getConditionalProp } from '../../utils/themeweaver-utils';

const StyledInputGroup = styled.div`
  display: ${(props) => (getProp('isVisible')(props) ? 'flex' : 'none')};
  flex-direction: column;

  ${getConditionalProp('showMargins', ({ showMargins }) => {
    if (!showMargins) {
      return `
      &.inputGroup > * {
        margin: 0;
      }`;
    } else return '';
  })}

  &.inputGroup > *:last-child {
    ${getConditionalProp(
      'lastItemMargin',
      ({ lastItemMargin }) => {
        let css = '';
        if (lastItemMargin) {
          const { top, right, bottom, left } = lastItemMargin;
          if (top) css = css + '\n    margin-top: ' + top + ';';
          if (right) css = css + '\n    margin-right: ' + right + ';';
          if (bottom) css = css + '\n    margin-bottom: ' + bottom + ';';
          if (left) css = css + '\n    margin-left: ' + left + ';';
          return css;
        }
      },
      0
    )}
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

      ${getConditionalProp(
        'showMargins',
        ({ showMargins }) => {
          if (!showMargins) {
            return `
          &.inputGroup > * {
            margin: 0;
          }`;
          } else return '';
        },
        1
      )}


    &.inputGroup > *:last-child {
      ${getConditionalProp(
        'lastItemMargin',
        ({ lastItemMargin }) => {
          let css = '';
          if (lastItemMargin) {
            const { top, right, bottom, left } = lastItemMargin;
            if (top) css = css + '\n    margin-top: ' + top + ';';
            if (right) css = css + '\n    margin-right: ' + right + ';';
            if (bottom) css = css + '\n    margin-bottom: ' + bottom + ';';
            if (left) css = css + '\n    margin-left: ' + left + ';';
            return css;
          }
        },
        1
      )}
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
    lastItemMargin,
    isSearchBarFocused,
    groupKey,
  } = props;

  return (
    <StyledInputGroup
      key={groupKey}
      className="inputGroup"
      isVisible={isVisible}
      showMargins={[true, true]}
      lastItemMargin={lastItemMargin}
    >
      <InputFields {...props} />
    </StyledInputGroup>
  );
};

export default InputGroup;
