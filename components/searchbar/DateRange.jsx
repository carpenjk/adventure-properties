import { Component, createRef } from 'react';
import DateHandler from '../base/input/DateHandler';

class DateRange extends Component {
  constructor(props) {
    super(props);

    const { startProps, endProps, valueFunctions } = props;
    const { get } = valueFunctions;
    this.state = {
      startDate: {
        id: startProps.id,
        ref: createRef(),
      },
      endDate: {
        id: endProps.id,
        ref: createRef(),
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate } = this.state;
    const { valueFunctions } = this.props;
    const { get, set } = valueFunctions;
    const { get: prevGet } = prevProps.valueFunctions;
    // if start date changes, clear endDate to force valid range selection
    const prevDate = prevGet(prevState.startDate.id);
    const newDate = get(startDate.id);

    if (prevDate && newDate && prevDate.getTime() !== newDate.getTime()) {
      set({ [endDate.id]: null });
    }
  }

  //* event handlers *********************************************************
  handleStartSelect = () => {
    const {
      endDate: { ref: endDateRef },
    } = this.state;

    // move focus to end date component
    if (endDateRef && endDateRef.current) endDateRef.current.input.focus();
  };

  handleEndSelect = () => {
    const { nextFocusRef, focusNext } = this.props;
    if (focusNext && nextFocusRef) nextFocusRef.focus();
  };

  handleChange = (date, id) => {
    const { valueFunctions } = this.props;
    valueFunctions.set({ [id]: date });
  };

  handleStartChange = (date) => {
    const { onInputChange } = this.props;
    const { startDate } = this.state;
    const change = onInputChange || this.handleChange;
    change(date, startDate.id);
  };

  handleEndChange = (date) => {
    const { onInputChange } = this.props;
    const { endDate } = this.state;
    const change = onInputChange || this.handleChange;
    change(date, endDate.id);
  };

  //* external methods*******************************************************
  focus() {
    const { startDate } = this.state;
    if (startDate.ref.current) startDate.ref.current.input.focus();
  }

  render() {
    const {
      startProps,
      endProps,
      filterStartDate,
      filterEndDate,
      valueFunctions,
      onFocus,
      popperParent,
      forceClose,
      showLabel,
      variant,
    } = this.props;

    // get values for each controlled component

    const { startDate, endDate } = this.state;
    const { get } = valueFunctions;
    const startDateVal = get(startProps.id);
    const endDateVal = get(endProps.id);

    function getMinDate() {
      const dt = new Date();
      if (startDateVal) {
        dt.setUTCDate(startDateVal.getUTCDate() + 1);
        return dt;
      }
    }

    return (
      <>
        {/* Picker for start of range */}
        <DateHandler
          filterDate={filterStartDate}
          variant={variant}
          key="startDate"
          id={startProps.id}
          label="Arrive"
          showLabel={showLabel}
          placeholder={startProps.placeholder}
          icon={startProps.icon.url}
          iconOffset={startProps.icon.iconOffset}
          textOffset={startProps.textOffset}
          width={startProps.width}
          selected={startDateVal}
          startDate={startDateVal}
          endDate={endDateVal}
          selectsStart
          minDate={new Date()}
          onChange={this.handleStartChange}
          onSelect={this.handleStartSelect}
          onFocus={onFocus}
          inputRef={startDate.ref}
          allowSameDay
          popperParent={popperParent}
          forceClose={forceClose}
        />
        {/* Picker for end of range */}
        <DateHandler
          allowSameDay={false}
          filterDate={filterEndDate}
          variant={variant}
          key="endDate"
          id={endProps.id}
          label="Depart"
          showLabel={showLabel}
          placeholder={endProps.placeholder}
          icon={endProps.icon.url}
          iconOffset={endProps.icon.iconOffset}
          textOffset={endProps.textOffset}
          width={endProps.width}
          selected={endDateVal}
          startDate={startDateVal}
          endDate={endDateVal}
          minDate={getMinDate()}
          highlightDates={[startDateVal || undefined]}
          selectsEnd
          selectsRange
          openToDate={startDateVal}
          onSelect={this.handleEndSelect}
          onChange={this.handleEndChange}
          onFocus={onFocus}
          inputRef={endDate.ref}
          popperParent={popperParent}
          forceClose={forceClose}
        />
      </>
    );
  }
}

export default DateRange;
