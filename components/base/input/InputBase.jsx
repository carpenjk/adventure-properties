import { Component, createRef } from 'react';
import styled from 'styled-components';
import {
  breakpoint,
  getColor,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getHeight,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getBoxShadow,
  getBorderRadius,
} from 'themeweaver';
import { getProp } from 'dataweaver';

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  border-style: none;
  box-shadow: ${getBoxShadow(
    'input.searchBar',
    '0px 0px 8px rgba(192, 192, 192, 0.52)'
  )};
  border-radius: ${getBorderRadius('input.searchBar', '5px')};
  height: ${getHeight('input.searchBar', 'auto')};
  color: ${getColor('input.searchBar', 'inherit')};
  background-color: ${getBackgroundColor('input.searchBar', 'initial')};
  font-family: ${getFontFamily('input.searchBar', 'inherit')};
  font-weight: ${getFontWeight('input.searchBar', 'normal')};
  font-size: ${getFontSize('input.searchBar', '1.6rem')};
  letter-spacing: ${getLetterSpacing('input.searchBar', '0.025em')};

  background-image: url(${getProp('icon')});
  background-repeat: no-repeat;
  background-position: ${getProp('iconOffset')} 50%;

  padding-top: ${getPaddingTop('input.searchBar', '0')};
  padding-right: ${getPaddingRight('input.searchBar', '0')};
  padding-bottom: ${getPaddingBottom('input.searchBar', '0')};
  padding-left: ${getProp('textOffset')};
  margin-top: ${getMarginTop('input.searchBar', '0')};
  margin-right: ${getMarginRight('input.searchBar', '0')};
  margin-bottom: ${getMarginBottom('input.searchBar', '1rem')};
  margin-left: ${getMarginLeft('input.searchBar', '0')};

  ${breakpoint(1)`
  width: ${getProp('width', 1)};
  background-color: ${getBackgroundColor('input.searchBar', 'initial')};
  font-family: ${getFontFamily('input.searchBar', 'inherit')};
  font-weight: ${getFontWeight('input.searchBar', 'normal')};
  font-size: ${getFontSize('input.searchBar', '1.6rem')};
  letter-spacing: ${getLetterSpacing('input.searchBar', '0.025em')};

  margin-top: ${getMarginTop('input.searchBar', '0')};
  margin-right: ${getMarginRight('input.searchBar', '1.4rem')};
  margin-bottom: ${getMarginBottom('input.searchBar', '2rem')};
  margin-left: ${getMarginLeft('input.searchBar', '0')};

  padding-top: ${getPaddingTop('input.searchBar', '0')};
  padding-right: ${getPaddingRight('input.searchBar', '0')};
  padding-bottom: ${getPaddingBottom('input.searchBar', '0')};
  padding-left: ${getProp('textOffset')};

  box-shadow: ${getBoxShadow(
    'input.searchBar',
    '0px 0px 8px rgba(192, 192, 192, 0.52)'
  )};
  border-radius: ${getBorderRadius('input.searchBar', '5px')};
  

  `}
`;

StyledInput.defaultProps = {
  textOffset: '2.6rem',
  icon: '',
  iconOffset: '0.5rem',
  width: '12.5rem',
};

class InputBase extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }
  handleBlur = (e) => {
    const { nextFocusRef, onInputChange } = this.props;
    // onInputChange(e);
    this.handleInputChange(e);
    if (nextFocusRef) nextFocusRef.focus();
  };
  focus() {
    const { inputRef } = this.props;
    if (inputRef.current) inputRef.current.focus();
  }

  handleInputChange = (e) => {
    if (this.onInputChange) {
      this.onInputChange(e);
    } else {
      const { id, value } = e.target;
      if (id) this.props.valueFunctions.set({ [id]: value });
      e.stopPropagation();
    }
  };

  render() {
    const {
      id,
      value,
      textOffset,
      icon,
      iconOffset,
      width,
      placeholder,
      onClick,
      onFocus,
    } = this.props;

    return (
      <React.Fragment>
        <StyledInput
          type="text"
          value={value}
          className="input"
          id={id}
          placeholder={placeholder}
          onClick={onClick}
          onBlur={this.handleBlur}
          onFocus={onFocus}
          ref={this.inputRef}
          textOffset={textOffset}
          icon={icon}
          iconOffset={iconOffset}
          width={width}
        />
      </React.Fragment>
    );
  }
}

export default InputBase;
