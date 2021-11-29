import Head from 'next/head';
import styled, { ThemeContext } from 'styled-components';
import { useRef, useContext } from 'react';
import { breakpoint } from 'themeweaver';
import { mediaStyles } from '../Media';
import useReservation from '../components/reservationForm/UseReservation';
import useFullScreenInputSlide from '../components/reservationForm/UseFullScreenInputSlide';
import InputSlide from '../components/reservationForm/InputSlide';
import CustomSelect from '../components/base/input/CustomSelect';
import InvoiceHeader from '../components/reservationForm/InvoiceHeader';
import InputGroup from '../components/reservationForm/InputGroup';
import DateRange from '../components/searchbar/DateRange';

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

const Test = () => {
  const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
  const GUEST_INPUT_ID = 'guests';
  const unit = 'night';
  const price = '$299';
  const title = 'My Awesome Cabin';

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
    reserve,
    isResReady,
  } = useReservation();

  const { slideControl, slideState } = useFullScreenInputSlide({
    enabled: true,
  });

  const containerRef = useRef();
  return (
    <>
      <Head>
        <title>Adventure Properties</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledWrapper ref={containerRef}>
        <InvoiceHeader unit={unit} price={price} title={title} showTitle />
        <InputGroup heading="Guests">
          <CustomSelect
            theme={theme}
            variant="searchBar"
            value={guestOptions[selectedGuestOptionIndex]}
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
            height="4rem" //! refactor? Set height of React-Select objects to match input styling:
          />
        </InputGroup>
      </StyledWrapper>
    </>
  );
};
export default Test;
