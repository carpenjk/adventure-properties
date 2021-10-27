import styled, { ThemeContext } from 'styled-components';

import { useState, useRef, useContext, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import { signIn, useSession } from 'next-auth/client';
import { ReservationContext } from '../../contexts/ReservationContext';
import DateRange from '../searchbar/DateRange';
import CustomSelect from '../base/input/CustomSelect';
import Spacer from '../base/Spacer';
import ActionButton from '../base/ActionButton';

const StyledReserveForm = styled.div`
  position: fixed;
  bottom: 0;
  height: 90px;
  width: 100%;
  padding: 32px;
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
  height: 600px;
  flex: 1 1 400px;
  width: auto;
  min-width: 300px;
  max-width: 430px;
  `}
`;

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding 8px;

  box-shadow: 0px 0px 8px rgba(192, 192, 192, 0.52);
  border-radius: 5px;
  

  > div {
    display: flex;
    justify-content: flex-start;
  }
`;

const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
const GUEST_INPUT_ID = 'guests';

const ReservationForm = () => {
  const theme = useContext(ThemeContext);
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
  } = useContext(ReservationContext);
  console.log(
    '🚀 ~ file: ReservationForm.jsx ~ line 57 ~ ReservationForm ~ selectedGuestOptionIndex',
    selectedGuestOptionIndex
  );

  const [session, loading] = useSession();

  const formContainerRef = useRef();
  const guestRef = useRef();

  async function handleReservation() {
    // persist reservation parameters in a cookie
    setSessionData();
    if (!session) {
      signIn();
    }
  }
  function onSubmit() {
    // do something
  }

  return (
    <StyledReserveForm ref={formContainerRef}>
      <h2>$192 / night</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <StyledInputGroup>
            <h3>Dates</h3>
            <div>
              <DateRange
                startProps={startDateProps}
                endProps={endDateProps}
                valueFunctions={{ get: getDate, set: setDate }}
                popperParent={formContainerRef}
                forceClose={false}
                displayVertical={false}
              />
            </div>
          </StyledInputGroup>
        </fieldset>
        <Spacer vertical space="32px" />
        <StyledInputGroup>
          <label htmlFor="GUEST_INPUT_ID">Guests</label>
          <CustomSelect
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
            textOffset="1.8rem"
            width="15rem"
            placeholderColor={theme.colors.lightText}
            options={guestOptions}
            valueFunctions={{ get: getNumGuests, set: setNumGuests }}
            ref={guestRef}
            height="4rem" //! refactor? Set height of React-Select objects to match input styling:
          />
        </StyledInputGroup>
        <Spacer vertical space="32px" />
        <ActionButton semkey="button.reserve" onClick={handleReservation}>
          Reserve
        </ActionButton>
      </form>
    </StyledReserveForm>
  );
};

export default ReservationForm;
