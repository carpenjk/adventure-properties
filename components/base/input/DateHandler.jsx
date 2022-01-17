import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
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
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getBoxShadow,
  getBorderRadius,
  getMinWidth,
} from 'themeweaver';
import { getProp } from 'dataweaver';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputLabel from './InputLabel';

const StyledDateHandler = styled.div`
display: block;
position: relative;
width: ${getProp('width')};
min-width: ${(props) => getMinWidth(`date.${props.variant}`, '0')(props)};
margin-top: ${(props) => getMarginTop(`date.${props.variant}`, '0')(props)};
margin-right: ${(props) => getMarginRight(`date.${props.variant}`, '0')(props)};
margin-bottom: ${(props) =>
  getMarginBottom(`date.${props.variant}`, '0')(props)};
margin-left: ${(props) => getMarginLeft(`date.${props.variant}`, '0')(props)};



.react-datepicker-popper {
  position: relative;
  z-index: 99999;
  tabIndex="0";
}
.react-datepicker-wrapper {
  width: 100%;
  box-sizing: border-box;
}
.react-datepicker__input-container {
  width:100%;
}
.react-datepicker__input-container > input {
  width: 100%;
  padding-left: ${getProp('textOffset')};
  background-image: url(${getProp('icon')});
  background-repeat: no-repeat;
  background-position: ${getProp('iconOffset')} 50%;
  box-shadow: ${(props) =>
    getBoxShadow(
      `date.${props.variant}`,
      '0px 0px 8px rgba(192, 192, 192, 0.52)'
    )(props)};
  border-radius: ${(props) =>
    getBorderRadius(`date.${props.variant}`, '5px')(props)};
  border-style: none;
  color: ${(props) => getColor(`date.${props.variant}`, 'inherit')(props)};
  background-color: ${(props) =>
    getBackgroundColor(`date.${props.variant}`, 'initial')(props)};
  font-family: ${(props) =>
    getFontFamily(`date.${props.variant}`, 'inherit')(props)};
  font-weight: ${(props) =>
    getFontWeight(`date.${props.variant}`, 'normal')(props)};
  font-size: ${(props) =>
    getFontSize(`date.${props.variant}`, '1.6rem')(props)};
  height: ${(props) => getHeight(`date.${props.variant}`, 'auto')(props)};
  letter-spacing: ${(props) =>
    getLetterSpacing(`date.${props.variant}`, '0.025em')(props)};
  
}

${breakpoint(1)`
  width: ${getProp('width')};
  min-width: ${(props) => getMinWidth(`date.${props.variant}`, '0')(props)};
  margin-top: ${(props) => getMarginTop(`date.${props.variant}`, '0')(props)};
  margin-right: ${(props) =>
    getMarginRight(`date.${props.variant}`, '0')(props)};
  margin-bottom: ${(props) =>
    getMarginBottom(`date.${props.variant}`, '0')(props)};
  margin-left: ${(props) => getMarginLeft(`date.${props.variant}`, '0')(props)};

  

  .react-datepicker__input-container > input {
    width: ${getProp('width')};

    color: ${(props) => getColor(`date.${props.variant}`, 'inherit')(props)};
    background-color: ${(props) =>
      getBackgroundColor(`date.${props.variant}`, 'initial')(props)};
    font-family: ${(props) =>
      getFontFamily(`date.${props.variant}`, 'inherit')(props)};
    font-weight: ${(props) =>
      getFontWeight(`date.${props.variant}`, 'normal')(props)};
    font-size: ${(props) =>
      getFontSize(`date.${props.variant}`, '1.6rem')(props)};
    letter-spacing: ${(props) =>
      getLetterSpacing(`date.${props.variant}`, '0.025em')(props)};
    box-shadow: ${(props) =>
      getBoxShadow(
        `date.${props.variant}`,
        '0px 0px 8px rgba(192, 192, 192, 0.52)'
      )(props)};
    border-radius: ${(props) =>
      getBorderRadius(`date.${props.variant}`, '5px')(props)};
  }
`}
`;

StyledDateHandler.defaultProps = {
  textOffset: '2.6rem',
  icon: '',
  iconOffset: '0.5rem',
  width: '12.5rem',
};

class DateHandler extends Component {
  constructor(props) {
    super(props);
    this.styleRef = createRef();
    this.prevWrapperClass = '';
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidUpdate() {
    const { forceClose, inputRef } = this.props;
    if (forceClose && inputRef && inputRef.current)
      inputRef.current.setOpen(false);
  }

  handleFocus(e) {
    const { onFocus } = this.props;
    e.target.readOnly = true;
    if (onFocus) {
      onFocus();
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
  PopperContainer = ({ children }) => {
    const { popperParent } = this.props;
    if (popperParent && popperParent.current) {
      return createPortal(children, popperParent.current);
    }
    return null;
  };

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
      inputRef,
      variant,
      ...remProps
    } = this.props;

    return (
      <StyledDateHandler
        variant={variant}
        icon={icon}
        iconOffset={iconOffset}
        textOffset={textOffset}
        width={width}
        ref={this.styleRef}
      >
        {showLabel && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <DatePicker
          {...remProps}
          id={id}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholderText={placeholder}
          popperContainer={this.PopperContainer}
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
          ref={inputRef}
        />
      </StyledDateHandler>
    );
  }
}

export default DateHandler;
