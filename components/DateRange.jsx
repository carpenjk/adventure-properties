import { Component, createRef } from 'react';
import DateHandler from './DateHandler';

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
        minDate: new Date(get(endProps.id)),
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

  handleChange = (date, id) => {
    this.props.valueFunctions.set({ [id]: date });
  };
  handleStartChange = (date) => {
    const { onInputChange } = this.props;
    const change = onInputChange ? onInputChange : this.handleChange;
    change(date, this.state.startDate.id);
  };
  handleEndChange = (date) => {
    const { onInputChange } = this.props;
    const change = onInputChange ? onInputChange : this.handleChange;
    change(date, this.state.endDate.id);
  };

  //* external methods*******************************************************
  focus() {
    if (this.state.startDate.ref.current)
      this.state.startDate.ref.current.input.focus();
  }

  render() {
    const { startProps, endProps, valueFunctions, onFocus } = this.props;

    //get values for each controlled component

    const { get } = valueFunctions;
    const startDate = get(startProps.id);
    const endDate = get(endProps.id);

    // this.setState().setDate(endMinDate.getDate() + 1);

    return (
      <React.Fragment>
        {/* Picker for start of range */}
        <DateHandler
          id={startProps.id}
          placeholder={startProps.placeholder}
          icon={startProps.icon.url}
          iconOffset={startProps.icon.iconOffset}
          textOffset={startProps.textOffset}
          width={startProps.width}
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
        <DateHandler
          id={endProps.id}
          placeholder={endProps.placeholder}
          icon={endProps.icon.url}
          iconOffset={endProps.icon.iconOffset}
          textOffset={endProps.textOffset}
          width={endProps.width}
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
