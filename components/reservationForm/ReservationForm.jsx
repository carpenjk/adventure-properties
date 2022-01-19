import styled, { ThemeContext } from 'styled-components';
import { useState, useRef, useContext } from 'react';
import { breakpoint } from 'themeweaver';
import { isAvail, isValidDeparture } from '../../utils/dataValidation';
import DateRange from '../searchbar/DateRange';
import CustomSelect from '../base/input/CustomSelect';
import ErrorContainer from './ErrorContainer';
import Spacer from '../base/Spacer';
import InputGroup from './InputGroup';
import InvoiceContent from './InvoiceContent';
import ActionButton from '../base/ActionButton';
import InvoiceHeader from './InvoiceHeader';

const StyledReserveWrapper = styled.div`
  position: relative;
  width: 350px;
  padding: ${({ theme }) => theme.space[3]}px;
  border: 3px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 999;

  > form > fieldset {
    border: none;
    padding: 0;
  }

  ${breakpoint(1)`
  position: relative;
  height: unset;
  width: auto;
  min-width: 363px;
  padding: ${({ theme }) => theme.space[5]}px;
  `}
`;

const StyledDateRangeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;

  ${breakpoint(1)`
    flex: none;
    > div:first-child {
      margin-right: 8px;
    }
  `}
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

//* hard coded constants *******************************************
const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
const GUEST_INPUT_ID = 'guests';
const FORM_SPACING = ['16px', '32px'];

//*  Component Function ********************************************
const ReservationForm = (props) => {
  const theme = useContext(ThemeContext);

  const { availability, reservation, control, onReview } = props;
  const {
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    selectedGuestOptionIndex,
    reserveReview,
  } = control;

  const { error, price, unit, unitAmount, arriveDate } = reservation;
  const { title, showTitle, maxGuests } = props;
  const [showError, setShowError] = useState(false);

  // only allow guest selection <= property capacity
  const filteredGuestOptions = guestOptions.filter(
    (guest) => guest.value <= maxGuests
  );

  // * refs ****************************************************

  // used for react-datepicker "popper" container / calendar popup
  const formContainerRef = useRef();
  const guestRef = useRef();

  function handleReview() {
    setShowError(true);
    if (onReview) {
      onReview();
      return;
    }
    reserveReview();
  }

  // *** Component return value ***********************
  return (
    <StyledReserveWrapper ref={formContainerRef}>
      <InvoiceHeader
        unit={unit}
        price={price.avg || price.today}
        title={title}
        showTitle={showTitle}
      />
      <InputGroup heading="Dates">
        <StyledDateRangeWrapper>
          <DateRange
            variant="reservation"
            endProps={endDateProps}
            startProps={startDateProps}
            filterStartDate={(dt) => isAvail(dt, availability)}
            filterEndDate={(dt) =>
              isValidDeparture(dt, arriveDate, availability)
            }
            displayVertical={false}
            forceClose={false}
            popperParent={formContainerRef}
            showLabel
            valueFunctions={{ get: getDate, set: setDate }}
          />
        </StyledDateRangeWrapper>
      </InputGroup>
      <Spacer vertical space={FORM_SPACING} />
      <InputGroup heading="Guests">
        <CustomSelect
          variant="searchBar"
          value={guestOptions[selectedGuestOptionIndex]}
          theme={theme}
          key="guests"
          innerKey="guestsSelect"
          name={GUEST_INPUT_ID}
          id={GUEST_INPUT_ID}
          placeholder="Guests"
          focusNext={false}
          icon={GUEST_ICON}
          iconOffset="0.5rem"
          iconWidth="1.6rem"
          iconHeight="1.6rem"
          showLabel
          textOffset="1.8rem"
          width="100%"
          placeholderColor={theme.colors.lightText}
          options={filteredGuestOptions}
          valueFunctions={{ get: getNumGuests, set: setNumGuests }}
          ref={guestRef}
          height="4rem" //! refactor? Set height of React-Select objects to match input styling:
        />
      </InputGroup>
      <Spacer vertical space={FORM_SPACING} />
      <InvoiceContent
        price={price.avg}
        unit={unit}
        unitAmount={unitAmount}
        total={price.total}
      />
      <Spacer vertical space={FORM_SPACING} />
      {showError && <ErrorContainer error={error} />}
      <Spacer vertical space={FORM_SPACING} />
      <StyledButtonWrapper>
        <ActionButton variant="reserve" onClick={handleReview}>
          Reserve
        </ActionButton>
      </StyledButtonWrapper>
    </StyledReserveWrapper>
  );
};

export default ReservationForm;
