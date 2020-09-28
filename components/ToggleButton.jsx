// import { colors } from '../static/global/base';
import styled from 'styled-components';
import { condition } from 'dataweaver';
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getMaxWidth,
  getMinWidth,
  getMaxHeight,
  getMinHeight,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  breakpoint,
} from 'themeweaver';
// const selectIcon = '../public/menu-selected.svg';
const selectIcon = '../static/assets/ToggleButton/menu-selected.svg';

const StyledButton = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${getColor('button.nav', 'black')};
  font-family: ${getFontFamily('button.nav', 'inherit')};
  font-size: ${getFontSize('button.nav', 'inherit')};
  font-weight: ${getFontWeight('button.nav', 'inherit')};
  margin-top: ${getMarginTop('button.nav', '10px')};
  margin-right: ${getMarginRight('button.nav', '10px')};
  margin-bottom: ${getMarginBottom('button.nav', '10px')};
  margin-left: ${getMarginLeft('button.nav', '10px')};
  padding-top: ${getPaddingTop('button.nav', '20px')};
  padding-right: ${getPaddingRight('button.nav', '20px')};
  padding-bottom: ${getPaddingBottom('button.nav', '20px')};
  padding-left: ${getPaddingLeft('button.nav', '20px')};
  min-width: ${getMinWidth('button.nav', '50px')};
  max-width: ${getMaxWidth('button.nav', 'none')};
  min-height: ${getMinHeight('button.nav', '0')};
  max-height: ${getMaxHeight('button.nav', 'none')};
  background: none;
  text-decoration: none;
  border: none;

  &:hover {
    background: ${getColor('nav.hover')};
  }

  ${breakpoint(1)`
    color: ${getColor('button.nav', 'black')};
    font-family: ${getFontFamily('button.nav', 'inherit')};
    font-size: ${getFontSize('button.nav', 'inherit')};
    font-weight: ${getFontWeight('button.nav', 'inherit')};
    margin-top: ${getMarginTop('button.nav', '10px')};
    margin-right: ${getMarginRight('button.nav', '10px')};
    margin-bottom: ${getMarginBottom('button.nav', '10px')};
    margin-left: ${getMarginLeft('button.nav', '10px')};
    padding-top: ${getPaddingTop('button.nav', '20px')};
    padding-right: ${getPaddingRight('button.nav', '20px')};
    padding-bottom: ${getPaddingBottom('button.nav', '20px')};
    padding-left: ${getPaddingLeft('button.nav', '20px')};
    min-width: ${getMinWidth('button.nav', '50px')};
    max-width: ${getMaxWidth('button.nav', '100px')};
    min-height: ${getMinHeight('button.nav', '0')};
    max-height: ${getMaxHeight('button.nav', 'none')};
  `}
`;

const SelectIcon = styled.img`
  display: none;

  ${breakpoint(1)`
    display: none;
    ${condition('showIndicator')`
      display: block;
    `}
    &.selected {
      position: absolute;
      bottom: 5px;
    }
    &.notSelected {
      display: none;
    }
  `}
`;

const ToggleButton = (props) => {
  const { selected, onClick, showIndicator, text } = props;

  function handleClick(button) {
    button.blur();
    onClick(text);
  }

  return (
    <StyledButton tabIndex="0" onClick={(e) => handleClick(e.target)}>
      {text}
      <SelectIcon
        src={selectIcon}
        showIndicator={showIndicator}
        alt="selected"
        className={selected ? 'selected' : 'notSelected'}
      />
    </StyledButton>
  );
};

export default ToggleButton;
