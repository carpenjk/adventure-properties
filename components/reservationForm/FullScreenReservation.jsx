import 'react-datepicker/dist/react-datepicker.css';
import styled, { ThemeContext } from 'styled-components';
import { useRef, useContext, useState, useEffect } from 'react';
import { breakpoint } from '@carpenjk/prop-x/css';
import { CustomSelect, DateRange } from '@carpenjk/base/input';
import {
  filterGuestOptions,
  isAvail,
  isValidDeparture,
} from '../../data/validation/reservation';
import useFullScreenInputSlide from './UseFullScreenInputSlide';
import InputSlide from './InputSlide';
import FullScreenInputContainer from './FullScreenInputContainer';
import InvoiceHeader from './InvoiceHeader';
import InputGroup from './InputGroup';
import ErrorContainer from './ErrorContainer';
import CustomDatePickerStyles from '../datepicker/CustomDatePickerStyles';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const StyledDateRangeWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0;

  ${breakpoint(1)`
    flex: none;
    > div:first-child {
      margin-right: 8px;
    }
  `}
`;

const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
const GUEST_INPUT_ID = 'guests';
const SLIDE_FIELDS = [['arriveDate', 'departDate'], ['guests']];

const FullScreenReservation = (props) => {
  const theme = useContext(ThemeContext);
  const {
    isOpen,
    onClose,
    reservation,
    availability,
    control,
    title,
    onReview,
    maxGuests,
  } = props;

  const { error, price, unit, arriveDate, departDate, guests } = reservation;
  const [isSaveAttempted, setIsSaveAttempted] = useState(false);

  const {
    getDate,
    setDate,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
    reserveReview,
    validate,
  } = control;

  const { slideControl, slideState } = useFullScreenInputSlide({
    enabled: true,
  });

  const isLastSlide = slideState.currSlide === SLIDE_FIELDS.length - 1;

  const containerRef = useRef();
  const dateRangeRef = useRef();

  function handleDateFocus(e) {
    e.target.blur();
  }

  function handleSave() {
    const isValid = validate({
      fields: SLIDE_FIELDS[slideState.currSlide],
      validateOnChange: false,
    });
    if (!isValid) {
      setIsSaveAttempted(true);
      return;
    }
    slideControl.next();
    setSessionData();
  }

  function handleReview(e) {
    if (onReview) {
      onReview(e);
      return;
    }
    reserveReview();
  }

  function getButtonText() {
    if (slideControl && slideControl.currSlide < SLIDE_FIELDS.length - 1) {
      return 'Save';
    }
    return 'Save & Review';
  }

  // reset isSaveAttempted on new slide
  useEffect(() => {
    setIsSaveAttempted(false);
  }, [slideState.currSlide]);

  // revalidate fields on current slide when value changed
  useEffect(() => {
    validate({
      fields: SLIDE_FIELDS[slideState.currSlide],
      validateOnChange: false,
    });
  }, [arriveDate, departDate, guests, slideState.currSlide, validate]);

  return (
    <FullScreenInputContainer
      isOpen={isOpen}
      onClose={onClose}
      onAction={!isLastSlide ? handleSave : handleReview}
      buttonText={getButtonText()}
    >
      <StyledWrapper ref={containerRef}>
        <InvoiceHeader unit={unit} price={price.avg} title={title} showTitle />
        <CustomDatePickerStyles id="fullscreenDateInput">
          <InputSlide slideState={slideState} index={0}>
            <InputGroup heading="Dates">
              <StyledDateRangeWrapper>
                <DateRange
                  tw={{ variant: 'reservation' }}
                  endProps={endDateProps}
                  startProps={startDateProps}
                  displayVertical={false}
                  filterStartDate={(dt) => isAvail(dt, availability)}
                  filterEndDate={(dt) =>
                    isValidDeparture(dt, arriveDate, availability)
                  }
                  forceClose={false}
                  portalId="fullscreenDateInput"
                  showLabel
                  valueFunctions={{ get: getDate, set: setDate }}
                  ref={dateRangeRef}
                  onFocus={handleDateFocus}
                />
              </StyledDateRangeWrapper>
            </InputGroup>
          </InputSlide>
        </CustomDatePickerStyles>
        <InputSlide slideState={slideState} index={1}>
          <InputGroup heading="Guests">
            <CustomSelect
              id={GUEST_INPUT_ID}
              name={GUEST_INPUT_ID}
              instanceId="guestsSelect"
              key="guests"
              tw={{ variant: 'reservation' }}
              value={guestOptions[selectedGuestOptionIndex]}
              theme={theme}
              placeholder="Guests"
              focusNext={false}
              icon={GUEST_ICON}
              iconOffset="5px"
              iconWidth="16px"
              iconHeight="16px"
              textOffset="26px"
              showLabel
              width="100%"
              placeholderColor={theme.colors.lightText}
              options={filterGuestOptions(guestOptions, maxGuests)}
              onChange={(opt) =>
                setNumGuests({ [GUEST_INPUT_ID]: Number(opt.value) })
              }
            />
          </InputGroup>
        </InputSlide>
        <ErrorContainer
          isSaveAttempted={isSaveAttempted}
          error={isSaveAttempted && error}
        />
      </StyledWrapper>
    </FullScreenInputContainer>
  );
};

export default FullScreenReservation;
