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
  getBoxShadow,
  getBorderRadius,
} from 'themeweaver';
import { getProp } from 'dataweaver';
import InputWrapper from './InputWrapper';
import InsetPlaceholder from './InsetPlaceholder';

const StyledInput = styled.input`
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  border-style: none;
  border-radius: ${getBorderRadius({}, '5px')};

  height: ${getHeight({}, 'auto')};
  color: ${getColor({}, 'initial')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'normal')};
  font-size: ${getFontSize({}, '1.6rem')};
  letter-spacing: ${getLetterSpacing({}, '0.025em')};
  background-color: transparent;
  background-image: url(${getProp('icon')});
  background-repeat: no-repeat;
  background-position: ${getProp('iconOffset')} 50%;
  padding-left: ${getProp('textOffset')};

  &:focus {
    outline: 3px solid ${({ theme }) => `${theme.colors.link[0]}`};
  }

  ${breakpoint(1)`
    border-radius: ${getBorderRadius({}, '5px')};
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'normal')};
    font-size: ${getFontSize({}, '1.6rem')};
    letter-spacing: ${getLetterSpacing({}, '0.025em')};
    padding-left: ${getProp('textOffset')};
  `}
`;

const StyledBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${getBackgroundColor({}, 'white')};
  box-shadow: ${getBoxShadow({}, '0px 0px 8px rgba(192, 192, 192, 0.52)')};
  border-radius: ${getBorderRadius({}, '5px')};
  ${breakpoint(1)`
    background-color:${getBackgroundColor({}, 'white')};
    box-shadow: ${getBoxShadow({}, '0px 0px 8px rgba(192, 192, 192, 0.52)')};
    border-radius: ${getBorderRadius({}, '5px')};
  `}
`;

const DEFAULT_TW = {
  semKey: 'input',
};

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
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (this.inputRef) {
      this.inputRef.current.value = '';
    }
    if (value) {
      this.setState({ isActive: true });
    }
  }

  handleFocus(e) {
    const { onFocus } = this.props;
    this.setState({ isActive: true });
    if (onFocus) {
      onFocus();
    }
  }

  handleBlur = (e) => {
    const { nextFocusRef, onChange } = this.props;
    const { inputRef } = this;
    if (inputRef && !inputRef.current.value) {
      this.setState({ isActive: false });
    }

    if (onChange) {
      onChange(e);
    }

    if (nextFocusRef) nextFocusRef.focus();
  };

  focus() {
    const { inputRef } = this.props;
    if (inputRef.current) inputRef.current.focus();
  }

  render() {
    const { isActive } = this.state;
    const {
      textOffset,
      width,
      placeholder,
      showInsetPlaceholder,
      tw,
      ...remProps
    } = this.props;
    const mergedTW = { ...DEFAULT_TW, ...tw };

    return (
      <InputWrapper tw={mergedTW} width={width}>
        <StyledBackground tw={mergedTW}>
          {showInsetPlaceholder && (
            <InsetPlaceholder
              tw={mergedTW}
              isActive={isActive}
              offset={textOffset}
              translateX={placeholder.translateX}
              translateY={placeholder.translateY}
            >
              {placeholder.value}
            </InsetPlaceholder>
          )}
          <StyledInput
            tw={mergedTW}
            type="text"
            {...remProps}
            className="input"
            onBlur={(e) => this.handleBlur(e)}
            onFocus={(e) => this.handleFocus(e)}
            ref={this.inputRef}
            textOffset={textOffset}
          />
        </StyledBackground>
      </InputWrapper>
    );
  }
}

export default InputBase;
