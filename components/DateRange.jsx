import { Component, createRef } from 'react';
import DateHandler from './base/input/DateHandler';

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
    console.log('date component updated');
    const endDateRef = this.state.endDate.ref;
    const { get } = this.props.valueFunctions;
    const { get: prevGet } = prevProps.valueFunctions;
    // move focus to end date component
    console.log(
      'DateRange -> componentDidUpdate -> prevGet(prevState.startDate.id)',
      prevGet(prevState.startDate.id)
    );
    console.log(
      'DateRange -> componentDidUpdate -> get(this.state.startDate.id)',
      get(this.state.startDate.id)
    );
    if (prevGet(prevState.startDate.id) !== get(this.state.startDate.id)) {
      // if (endDateRef && endDateRef.current) endDateRef.current.input.focus();
    }
  }

  //* event handlers *********************************************************
  handleStartSelect = () => {
    const endDateRef = this.state.endDate.ref;
    // move focus to end date component
    if (endDateRef && endDateRef.current) endDateRef.current.input.focus();
  };

  handleEndSelect = () => {
    const { nextFocusRef, focusNext } = this.props;
    // this.state.endDate.ref.current.input.focus();
    // const { nextFocusRef } = this.props;
    // if (nextFocusRef) nextFocusRef.focus();
    const endDateRef = this.state.endDate.ref;
    // if (endDateRef && endDateRef.current) endDateRef.current.input.focus();
    console.log('date selected');
    if (focusNext && nextFocusRef) nextFocusRef.focus();
  };

  handleChange = (date, id) => {
    console.log('date changed');
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
    const {
      startProps,
      endProps,
      valueFunctions,
      onFocus,
      popperParent,
      forceClose,
      inputRef,
      nextFocusRef,
    } = this.props;

    //get values for each controlled component

    const { get } = valueFunctions;
    const startDate = get(startProps.id);
    const endDate = get(endProps.id);

    return (
      <React.Fragment>
        {/* Picker for start of range */}
        <DateHandler
          key="startDate"
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
          ref={inputRef}
          allowSameDay={true}
          popperParent={popperParent}
          forceClose={forceClose}
          nextFocusRef={this.state.endDate.ref}
        />
        {/* Picker for end of range */}
        <DateHandler
          key="endDate"
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
          popperParent={popperParent}
          forceClose={forceClose}
          nextFocusRef={nextFocusRef}
        />
      </React.Fragment>
    );
  }
}

export default DateRange;
