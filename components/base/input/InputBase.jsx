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
    const {
      valueFunctions: { get },
      id,
    } = this.props;
    if (this.inputRef) {
      this.inputRef.current.value = '';
    }
    if (get(id)) {
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
    const { nextFocusRef } = this.props;
    const { inputRef } = this;
    if (inputRef && !inputRef.current.value) {
      this.setState({ isActive: false });
    }

    this.handleInputChange(e);
    if (nextFocusRef) nextFocusRef.focus();
  };

  handleInputChange = (e) => {
    const { valueFunctions } = this.props;
    if (this.onInputChange) {
      this.onInputChange(e);
    } else {
      const { id, value } = e.target;
      if (id) valueFunctions.set({ [id]: value });
      e.stopPropagation();
    }
  };

  focus() {
    const { inputRef } = this.props;
    if (inputRef.current) inputRef.current.focus();
  }

  render() {
    const { isActive } = this.state;
    const {
      id,
      valueFunctions,
      textOffset,
      icon,
      iconOffset,
      width,
      placeholder,
      onClick,
      showInsetPlaceholder,
      tw,
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
            value={valueFunctions.get(id)}
            className="input"
            id={id}
            onClick={onClick}
            onBlur={(e) => this.handleBlur(e)}
            onChange={(e) => this.handleInputChange(e)}
            onFocus={(e) => this.handleFocus(e)}
            ref={this.inputRef}
            textOffset={textOffset}
            icon={icon}
            iconOffset={iconOffset}
          />
        </StyledBackground>
      </InputWrapper>
    );
  }
}

export default InputBase;
