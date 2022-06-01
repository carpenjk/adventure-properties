import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import {
  breakpoint,
  getColor,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getHeight,
  getLetterSpacing,
  getBoxShadow,
  getBorderRadius,
  getMinWidth,
} from 'themeweaver';
import { getProp } from 'dataweaver';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputLabel from './InputLabel';
import InputWrapper from './InputWrapper';
import InsetPlaceholder from './InsetPlaceholder';
import DatePickerStyles from './DatePickerStyles';

const StyledDateHandler = styled.div`
  display: block;
  position: relative;
  width: 100%;

  .react-datepicker-popper {
    position: relative;
    z-index: 99999;
    tabIndex="0";
  }
  .react-datepicker-wrapper {
    height:100%;
    width: 100%;
    box-sizing: border-box;
  }
  .react-datepicker__input-container {
    height: 100%;
    width:100%;
  }
  .react-datepicker__input-container > input {
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding-left: ${getProp('textOffset')};
    
    border-style: none;
    color: ${getColor({}, 'inherit')};
    background-color: transparent;
    background-image: url(${getProp('icon')});
    background-repeat: no-repeat;
    background-position: ${getProp('iconOffset')} 50%;
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'normal')};
    font-size: ${getFontSize({}, '1.6rem')};
    letter-spacing: ${getLetterSpacing({}, '0.025em')};
  }

  ${breakpoint(1)`
    width: 100%;

    .react-datepicker-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .react-datepicker__input-container {
      height: 100%;
    }
    .react-datepicker__input-container > input {
      height: 100%;
      width: 100%;
      color: ${getColor({}, 'inherit')};
      background-color: transparent;
      background-image: url(${getProp('icon')});
      background-repeat: no-repeat;
      background-position: ${getProp('iconOffset')} 50%;
      
      font-family: ${getFontFamily({}, 'inherit')};
      font-weight: ${getFontWeight({}, 'normal')};
      font-size: ${getFontSize({}, '1.6rem')};
      letter-spacing: ${getLetterSpacing({}, '0.025em')};
      &:focus{
        outline: none;
      }
  `}
`;

const StyledInnerWrapper = styled.div`
  position: relative;
  height: ${getHeight({}, 'auto')};
  min-width: ${getMinWidth({}, '0')};
  background-color: ${(getBackgroundColor({}), 'white')};
  box-shadow: ${getBoxShadow({}, '0px 0px 8px rgba(192, 192, 192, 0.52)')};
  border-radius: ${getBorderRadius({}, '5px')};

  &:focus-within {
    outline: 3px solid ${({ theme }) => `${theme.colors.link[0]}`};
  }

  ${breakpoint(1)`
    height: ${getHeight({}, 'auto')};
    min-width: ${getMinWidth({}, '0')};
    background-color: ${(getBackgroundColor({}), 'white')};

    box-shadow: ${getBoxShadow({}, '0px 0px 8px rgba(192, 192, 192, 0.52)')};
    border-radius: ${getBorderRadius({}, '5px')};
  
    `}
`;

const DEFAULT_TW = {
  semKey: 'date',
};

StyledDateHandler.defaultProps = {
  textOffset: '26px',
  icon: '',
  iconOffset: '5px',
  width: '125px',
};

class DateHandler extends Component {
  constructor(props) {
    super(props);
    this.styleRef = createRef();
    this.prevWrapperClass = '';
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    const { selected, inputRef } = this.props;
    console.log('datehandler mounted');
    if (inputRef) {
      inputRef.current.setPreSelection('');
    }
    if (selected) {
      this.setState({ isActive: true });
    }
  }

  componentDidUpdate() {
    const { forceClose, inputRef } = this.props;
    if (forceClose && inputRef && inputRef.current)
      inputRef.current.setOpen(false);
  }

  handleClick(e) {
    const { inputRef } = this.props;
    if (inputRef && e.target === inputRef.current) {
      inputRef.current.setFocus(true);
    }
  }

  handleFocus(e) {
    const { onFocus } = this.props;
    // commented out due to poor accessibility functionality on react-datepicker
    // e.target.readOnly = true;
    this.setState({ isActive: true });
    if (onFocus) {
      onFocus(e);
    }
  }

  handleBlur(e) {
    const { selected, onBlur } = this.props;
    if (!selected) {
      this.setState({ isActive: false });
    }
    if (onBlur) {
      onBlur(e);
    }
  }

  handleKeyDown = (e) => {
    const { inputRef } = this.props;
    if (inputRef && inputRef.current) {
      if (e.key === 'Tab') {
        inputRef.current.setOpen(false);
      }
    }
  };

  // custom "popper" calendar popup container for react-datepicker
  // PopperContainer = ({ children }) => {
  //   console.log('popper parent');
  //   const { popperParent } = this.props;
  //   if (popperParent && popperParent.current) {
  //     return createPortal(children, popperParent.current);
  //   }
  //   return null;
  // };

  render() {
    const {
      id,
      placeholder,
      icon,
      iconOffset,
      label,
      textOffset,
      width,
      showLabel,
      showInsetPlaceholder,
      inputRef,
      tw,
      ...remProps
    } = this.props;

    const { isActive } = this.state;
    const mergedTW = { ...DEFAULT_TW, ...tw };
    return (
      <DatePickerStyles>
        <InputWrapper tw={mergedTW} width={width}>
          <StyledDateHandler
            tw={mergedTW}
            icon={icon}
            iconOffset={iconOffset}
            textOffset={textOffset}
            width={width}
            ref={this.styleRef}
            onFocus={(e) => this.handleFocus(e)}
          >
            {showLabel && <InputLabel htmlFor={id}>{label}</InputLabel>}
            <StyledInnerWrapper tw={mergedTW}>
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

              <DatePicker
                {...remProps}
                id={id}
                onBlur={(e) => this.handleBlur(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
                placeholderText={!showInsetPlaceholder ? placeholder.value : ''}
                popperPlacement="bottom"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '0px, 0px',
                  },
                  flip: {
                    enabled: false,
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport',
                  },
                }}
                strictParsing
                shouldCloseOnSelect
                ref={inputRef}
              />
            </StyledInnerWrapper>
          </StyledDateHandler>
        </InputWrapper>
      </DatePickerStyles>
    );
  }
}

export default DateHandler;
