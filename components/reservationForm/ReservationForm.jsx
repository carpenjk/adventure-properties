import styled, { ThemeContext } from 'styled-components';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useRef, useContext, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import { isAvail, isValidDeparture } from '../../utils/dateValidation';
import DateRange from '../searchbar/DateRange';
import CustomSelect from '../base/input/CustomSelect';
import Spacer from '../base/Spacer';
import InputGroup from './InputGroup';
import InvoiceContent from './InvoiceContent';
import ActionButton from '../base/ActionButton';
import useReservation from './UseReservation';
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
const StyledErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.action[1]};
`;

const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
const GUEST_INPUT_ID = 'guests';

//*  Component Function ********************************************
const ReservationForm = (props) => {
  const theme = useContext(ThemeContext);
  const {
    availability,
    reservation,
    arriveDateVal,
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    selectedGuestOptionIndex,
    reservePreview,
  } = useReservation();

  useEffect(() => {
    console.log('ReservationForm => availability changed: ', availability);
  }, [availability]);

  const { price, unit, unitAmount, total, error, arriveDate } = reservation;
  const { title, showTitle, maxGuests } = props;
  const filteredGuestOptions = guestOptions.filter(
    (guest) => guest.value <= maxGuests
  );
  const FORM_SPACING = ['16px', '32px'];

  // * refs ****************************************************
  const formContainerRef = useRef();
  const guestRef = useRef();

  // *  effects  ***********************************************

  // * date and date availability helpers *********************
  // const findDate = (date) => {
  //   if (!availability) {
  //     return false;
  //   }
  //   return availability.avail.find(
  //     (dt) => dt.date.getTime() === date.getTime()
  //   );
  // };

  // logic to determine available dates for property
  // const isAvail = (date) => {
  //   // find date within initial availability
  //   const dateObj = findDate(date);
  //   // true if initially available and not booked
  //   return dateObj ? !dateObj.booked : false;
  // };

  // logic to determin valid departure date
  // valid if after start dt and <= next booked date
  // const isValidDeparture = (date, arDate) => {
  //   if (!availability || !arDate) {
  //     return false;
  //   }

  //   const dateTime = date.getTime();
  //   const arDateTime = arDate.getTime();

  //   // index of booked date
  //   const i = !availability
  //     ? 0
  //     : availability.avail.findIndex((dt) => dt.date.getTime() === arDateTime);

  //   // first booked date after res start date
  //   const nextBookedDateObj = availability.avail
  //     .slice(i)
  //     .find((dt) => dt.booked);
  //   const nextBookedDate = nextBookedDateObj ? nextBookedDateObj.date : false;

  //   // all dates available
  //   if (!nextBookedDate) {
  //     return dateTime > arDateTime;
  //   }
  //   // dates after res start up to next booked date are available for departure
  //   return dateTime > arDateTime && dateTime <= nextBookedDate.getTime();
  // };

  // *** Component return value ***********************
  return (
    <StyledReserveWrapper ref={formContainerRef}>
      <InvoiceHeader
        unit={unit}
        price={price.avg}
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
      <StyledErrorWrapper>{error}</StyledErrorWrapper>
      <Spacer vertical space={FORM_SPACING} />
      <StyledButtonWrapper>
        <ActionButton variant="reserve" onClick={reservePreview}>
          Reserve
        </ActionButton>
      </StyledButtonWrapper>
    </StyledReserveWrapper>
  );
};

export default ReservationForm;
