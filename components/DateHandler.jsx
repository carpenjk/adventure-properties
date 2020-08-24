import React, { Component, createRef } from 'react';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/datepicker.css';

const StyledDateHandler = styled.div`
display: block;
position: relative;

margin-top: ${getMarginTop('date.searchBar', '0')};
margin-right: ${getMarginRight('date.searchBar', '0')};
margin-bottom: ${getMarginBottom('date.searchBar', '1rem')};
margin-left: ${getMarginLeft('date.searchBar', '0')};

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

  color: ${getColor('date.searchBar', 'inherit')};
  background-color: ${getBackgroundColor('date.searchBar', 'initial')};
  font-family: ${getFontFamily('date.searchBar', 'inherit')};
  font-weight: ${getFontWeight('date.searchBar', 'normal')};
  font-size: ${getFontSize('date.searchBar', '1.6rem')};
  letter-spacing: ${getLetterSpacing('date.searchBar', '0.025em')};
}

${breakpoint(1)`
  width: ${getProp('width')};
  margin-top: ${getMarginTop('date.searchBar', '0')};
  margin-right: ${getMarginRight('date.searchBar', '1.4rem')};
  margin-bottom: ${getMarginBottom('date.searchBar', '2rem')};
  margin-left: ${getMarginLeft('date.searchBar', '0')};

  .react-datepicker__input-container > input {
    width: ${getProp('width')};

    color: ${getColor('date.searchBar', 'inherit')};
    background-color: ${getBackgroundColor('date.searchBar', 'initial')};
    font-family: ${getFontFamily('date.searchBar', 'inherit')};
    font-weight: ${getFontWeight('date.searchBar', 'normal')};
    font-size: ${getFontSize('date.searchBar', '1.6rem')};
    letter-spacing: ${getLetterSpacing('date.searchBar', '0.025em')};
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
  }

  getMargin = (mode) => {
    const { portal: portalMargin } = inputMargin || '';
    const { desktop: desktopMargin } = inputMargin || '';
    return mode === 'portal'
      ? portalMargin || 'margin-bottom: 10px'
      : desktopMargin || 'margin-right: 10px';
  };

  render() {
    const {
      placeholder,
      icon,
      iconOffset,
      textOffset,
      width,
      startDate,
      endDate,
      selected,
      selectsStart,
      selectsEnd,
      minDate,
      onChange,
      onSelect,
      onFocus,
      inputRef,
      allowSameDay,
      openToDate,
    } = this.props;
    return (
      <StyledDateHandler
        icon={icon}
        iconOffset={iconOffset}
        textOffset={textOffset}
        width={width}
        ref={this.styleRef}
      >
        <DatePicker
          selected={selected}
          startDate={startDate}
          endDate={endDate}
          selectsStart={selectsStart}
          selectsEnd={selectsEnd}
          minDate={minDate}
          openToDate={openToDate}
          allowSameDay={allowSameDay}
          onChange={onChange}
          onFocus={onFocus}
          onSelect={onSelect}
          placeholderText={placeholder}
          popperPlacement="bottom"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '-20px, 0',
            },
          }}
          strictParsing
          tabIndex="0"
          ref={inputRef}
        />
      </StyledDateHandler>
    );
  }
}

export default DateHandler;
