import { Component, createRef } from 'react';
import { Field } from 'formik';
import FormikDatePicker from './FormikDatePicker';

class FormikDateRange extends Component {
  constructor(props) {
    super(props);

    const { startProps, endProps } = props;
    this.state = {
      startDate: {
        id: startProps.id,
        ref: createRef(),
        value: '',
      },
      endDate: {
        id: endProps.id,
        ref: createRef(),
        value: '',
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate } = this.state;
    // const { valueFunctions } = this.props;
    // const { get, set } = valueFunctions || {};
    // const { get: prevGet } = prevProps.valueFunctions || {};

    // const prevDate = prevGet(prevState.startDate.id);
    // const newDate = get(startDate.id);

    const prevDate = prevState.startDate.value;
    const newDate = startDate.value;

    // if start date changes, clear endDate to force valid range selection
    if (prevDate && newDate && prevDate.getTime() !== newDate.getTime()) {
      // set({ [endDate.id]: null });
      this.setEndDateValue('');
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

  setStartDateValue(val) {
    this.setState((prev) => ({
      ...prev,
      startDate: {
        ...prev.startDate,
        value: val,
      },
    }));
  }

  setEndDateValue(val) {
    this.setState((prev) => ({
      ...prev,
      endDate: {
        ...prev.endDate,
        value: val,
      },
    }));
  }

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
      onFocus,
      popperParent,
      forceClose,
      showLabel,
      variant,
    } = this.props;

    // get values for each controlled component
    const { startDate, endDate } = this.state;

    return (
      <>
        <Field name={startProps.id}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;

            const handleStartChange = (val) => {
              setFieldValue(startProps.id, val);
              this.setStartDateValue(val);
            };
            return (
              // Picker for start of range
              <FormikDatePicker
                selected={value}
                onChange={handleStartChange}
                // onChange={(val) => setFieldValue(startProps.id, val)}
                filterDate={filterStartDate}
                variant={variant}
                key="startDate"
                id={startProps.id}
                label="Arrive"
                showLabel={showLabel}
                placeholderText={startProps.placeholder}
                icon={startProps.icon.url}
                iconOffset={startProps.icon.iconOffset}
                textOffset={startProps.textOffset}
                width={startProps.width}
                startDate={startDate.value}
                endDate={endDate.value}
                selectsStart
                minDate={new Date()}
                onSelect={this.handleStartSelect}
                onFocus={onFocus}
                inputRef={startDate.ref}
                allowSameDay
                popperParent={popperParent}
                forceClose={forceClose}
              />
            );
          }}
        </Field>
        {/* Picker for end of range */}
        <Field name={endProps.id}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;

            const handleEndChange = (val) => {
              setFieldValue(endProps.id, val);
              this.setEndDateValue(val);
            };
            // Picker for start of range
            return (
              <FormikDatePicker
                selected={value}
                onChange={handleEndChange}
                filterDate={filterEndDate}
                variant={variant}
                key="endDate"
                id={endProps.id}
                label="Depart"
                showLabel={showLabel}
                placeholderText={endProps.placeholder}
                icon={endProps.icon.url}
                iconOffset={endProps.icon.iconOffset}
                textOffset={endProps.textOffset}
                width={endProps.width}
                startDate={startDate.value}
                endDate={endDate.value}
                minDate={startDate.value}
                selectsEnd
                onSelect={this.handleEndSelect}
                onFocus={onFocus}
                inputRef={endDate.ref}
                popperParent={popperParent}
                forceClose={forceClose}
              />
            );
          }}
        </Field>
      </>
    );
  }
}

export default FormikDateRange;
