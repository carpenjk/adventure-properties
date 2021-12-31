import styled, { ThemeContext } from 'styled-components';
import { useRef, useContext } from 'react';
import { breakpoint } from 'themeweaver';
import useReservation from './UseReservation';
import useFullScreenInputSlide from './UseFullScreenInputSlide';
import InputSlide from './InputSlide';
import CustomSelect from '../base/input/CustomSelect';
import FullScreenInputContainer from './FullScreenInputContainer';
import InvoiceHeader from './InvoiceHeader';
import InputGroup from './InputGroup';
import DateRange from '../searchbar/DateRange';
import ReservePreview from './ReservePreview';

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

const FullScreenReservation = (props) => {
  const GUEST_ICON = '/static/assets/searchbar/icon/guest.svg';
  const GUEST_INPUT_ID = 'guests';
  const NUM_SLIDES = 3;
  const theme = useContext(ThemeContext);
  const { isOpen, onClose, unit, unitAmount, price, total, title } = props;

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
    reservePreview,
  } = useReservation();

  const { slideControl, slideState } = useFullScreenInputSlide({
    enabled: true,
  });

  const containerRef = useRef();

  function handleSave() {
    slideControl.next();
    setSessionData();
  }

  function getButtonText() {
    if (slideControl && slideControl.currSlide < NUM_SLIDES - 1) {
      return 'Save';
    }
    return 'Reserve';
  }

  const isLastSlide = slideControl.currSlide === NUM_SLIDES - 1;

  return (
    <FullScreenInputContainer
      isOpen={isOpen}
      onClose={onClose}
      onAction={!isLastSlide ? handleSave : reservePreview}
      buttonText={getButtonText()}
    >
      <StyledWrapper ref={containerRef}>
        <InvoiceHeader unit={unit} price={price} title={title} showTitle />
        <InputSlide slideState={slideState} index={0}>
          <InputGroup heading="Dates">
            <StyledDateRangeWrapper>
              <DateRange
                variant="reservation"
                endProps={endDateProps}
                startProps={startDateProps}
                displayVertical={false}
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
        </InputSlide>
        <InputSlide slideState={slideState} index={2}>
          <ReservePreview
            price={price}
            unit={unit}
            unitAmount={unitAmount}
            title={title}
            showTitle={false}
            total={total}
          />
        </InputSlide>
      </StyledWrapper>
    </FullScreenInputContainer>
  );
};

export default FullScreenReservation;
