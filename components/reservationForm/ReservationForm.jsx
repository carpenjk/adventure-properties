import styled, { ThemeContext } from 'styled-components';

import { useRef, useContext } from 'react';
import { breakpoint } from 'themeweaver';
import { signIn, useSession } from 'next-auth/client';
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
  padding: 16px;
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
  padding: 32px;
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

const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
const GUEST_INPUT_ID = 'guests';

const ReservationForm = (props) => {
  const theme = useContext(ThemeContext);

  const {
    reservation,
    getDate,
    setDate,
    getNumGuests,
    setNumGuests,
    startDateProps,
    endDateProps,
    guestOptions,
    setSessionData,
    selectedGuestOptionIndex,
    reserve,
    reservePreview,
    isResReady,
  } = useReservation();

  const { price, unit, unitAmount, total } = reservation;

  const { title, showTitle } = props;
  const [session, loading] = useSession();

  const FORM_SPACING = ['16px', '32px'];

  const formContainerRef = useRef();
  const guestRef = useRef();

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
          options={guestOptions}
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
        total={total}
      />
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
