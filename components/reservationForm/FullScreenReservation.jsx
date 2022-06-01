import styled, { ThemeContext } from 'styled-components';
import { useRef, useContext, useState, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import {
  filterGuestOptions,
  isAvail,
  isValidDeparture,
} from '../../data/validation/reservation';
import useFullScreenInputSlide from './UseFullScreenInputSlide';
import InputSlide from './InputSlide';
import CustomSelect from '../base/input/CustomSelect';
import FullScreenInputContainer from './FullScreenInputContainer';
import InvoiceHeader from './InvoiceHeader';
import InputGroup from './InputGroup';
import DateRange from '../searchbar/DateRange';
import ErrorContainer from './ErrorContainer';

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
    getNumGuests,
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
  }, [arriveDate, departDate, guests]);

  return (
    <FullScreenInputContainer
      isOpen={isOpen}
      onClose={onClose}
      onAction={!isLastSlide ? handleSave : handleReview}
      buttonText={getButtonText()}
    >
      <StyledWrapper ref={containerRef}>
        <InvoiceHeader unit={unit} price={price.avg} title={title} showTitle />
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
                popperParent={containerRef}
                showLabel
                valueFunctions={{ get: getDate, set: setDate }}
              />
            </StyledDateRangeWrapper>
          </InputGroup>
        </InputSlide>
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
