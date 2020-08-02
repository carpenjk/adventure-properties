import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/datepicker.css';
import React, { Component, createRef } from 'react';

import styled from 'styled-components';

const StyleWrapper = styled.div`
display: block;
position: relative;

&.show {
  display: block;
}
&.hide {
  display: none;
}

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
  padding-left: ${(props) => props.input.textOffset};
  background-image: url(${(props) => props.input.icon.url});
  background-repeat: no-repeat;
  background-position: ${(props) => props.input.icon.offset} 50%;
}
@media (${(props) => props.mobileBreakpoint}) {
  width: ${(props) => props.input.width};

  .react-datepicker__input-container > input {
    width: ${(props) => props.input.width};
  }
}
`;

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

  //* lifecycle and lifecylce helper **********************************
  addWrapperClass() {
    const input = this.styleRef.current;
    if (this.prevWrapperClass) input.classList.remove(this.prevWrapperClass);
    if (this.props.wrapperClass) {
      input.classList.add(this.props.wrapperClass);
      this.prevWrapperClass = this.props.wrapperClass;
    }
  }
  addHideShowClass() {
    const input = this.styleRef.current;
    if (this.props.hide) {
      input.classList.add('hide');
    } else {
      input.classList.remove('hide');
    }
  }
  componentDidMount() {
    this.addWrapperClass(this.props.wrapperClass);
    this.addHideShowClass();
  }
  componentDidUpdate() {
    this.addWrapperClass(this.props.wrapperClass);
    this.addHideShowClass();
  }

  render() {
    const {
      input,
      hide,
      wrapperClass,
      mobileBreakpoint,
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
      <StyleWrapper
        wrapperClass={wrapperClass}
        input={input}
        mobileBreakpoint={mobileBreakpoint}
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
          placeholderText={input.placeholder}
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
      </StyleWrapper>
    );
  }
}

export default DateHandler;
