import { Component, createRef } from 'react';
import DateHandler from './DateHandler';

//for dynamically rendering React elements from JSON
const Components = {
  DateHandler: DateHandler,
};

class DateRange extends Component {
  constructor(props) {
    super(props);

    const { input, valueFunctions } = props;
    const { get } = valueFunctions;
    this.state = {
      startDate: {
        id: input.startDate.id,
        ref: createRef(),
      },
      endDate: {
        id: input.endDate.id,
        ref: createRef(),
        minDate: new Date(get(input.endDate.id)),
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { get } = this.props.valueFunctions;
    const { get: prevGet } = prevProps.valueFunctions;
    const endDateRef = this.state.endDate.ref.current;
    const startDateRef = this.state.startDate.ref.current;

    //third party component was causing circular logic
    if (prevGet(prevState.startDate.id) !== get(this.state.startDate.id)) {
      // move focus to end date component
      if (endDateRef) startDateRef.setOpen(false);
      endDateRef.input.focus();
    }
  }

  //* event handlers *********************************************************
  handleStartSelect = () => {
    // move focus to end date component
    // if (this.endDateRef.current) this.endDateRef.current.input.focus();
  };

  handleEndSelect = () => {
    const { nextFocusRef } = this.props;
    if (nextFocusRef) nextFocusRef.focus();
  };

  handleStartChange = (date) => {
    this.props.onInputChange(date, this.state.startDate.id);
  };
  handleEndChange = (date) => {
    this.props.onInputChange(date, this.state.endDate.id);
  };

  //* external methods*******************************************************
  focus() {
    if (this.state.startDate.ref.current)
      this.state.startDate.ref.current.input.focus();
  }

  render() {
    const {
      valueFunctions,
      input,
      hide,
      wrapperClass,
      mobileBreakpoint,
      onFocus,
    } = this.props;
    const StartElement = Components[input.startDate.type];
    const EndElement = Components[input.endDate.type];

    //get values for each controlled component

    const { get } = valueFunctions;
    const startDate = get(input.startDate.id);
    const endDate = get(input.endDate.id);

    // this.setState().setDate(endMinDate.getDate() + 1);

    return (
      <React.Fragment>
        {/* Picker for start of range */}
        <StartElement
          input={input.startDate}
          wrapperClass={wrapperClass}
          hide={hide}
          mobileBreakpoint={mobileBreakpoint}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsStart
          minDate={new Date()}
          onChange={this.handleStartChange}
          onSelect={this.handleStartSelect}
          onFocus={onFocus}
          inputRef={this.state.startDate.ref}
          allowSameDay={true}
        />
        {/* Picker for end of range */}
        <EndElement
          input={input.endDate}
          wrapperClass={wrapperClass}
          hide={hide}
          mobileBreakpoint={mobileBreakpoint}
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectsEnd
          onSelect={this.handleEndSelect}
          onChange={this.handleEndChange}
          onFocus={onFocus}
          inputRef={this.state.endDate.ref}
        />
      </React.Fragment>
    );
  }
}

export default DateRange;
