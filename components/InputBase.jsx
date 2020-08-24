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
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
} from 'themeweaver';
import { getProp } from '../utils/themeweaver-utils';

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  color: ${getColor('input.searchBar', 'inherit')};
  background-color: ${getBackgroundColor('input.searchBar', 'initial')};
  font-family: ${getFontFamily('input.searchBar', 'inherit')};
  font-weight: ${getFontWeight('input.searchBar', 'normal')};
  font-size: ${getFontSize('input.searchBar', '1.6rem')};
  letter-spacing: ${getLetterSpacing('input.searchBar', '0.025em')};

  padding-left: ${getProp('textOffset')};
  background-image: url(${getProp('icon')});
  background-repeat: no-repeat;
  background-position: ${getProp('iconOffset')} 50%;

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
