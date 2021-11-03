import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

import { Portal } from 'react-portal';
import useLockBodyScroll from '../hooks/UseLockBodyScroll';
import ReservationPrice from './ReservationPrice';
import ActionButton from '../base/ActionButton';
import useReservation from './UseReservation';
import ReservationForm from './ReservationForm';
import FullScreenOverlay from '../FullScreenOverlay';
import ClientOnly from '../ClientOnly';
import InvoiceHeader from './InvoiceHeader';

const StyledTest = styled.div`
  display: flex;
`;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 3px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.025em;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 300px;

  ${condition('isAmount')`
    max-width: 575px;
  `}

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding-right: 8px;
  }

  ${breakpoint(1)`
    max-width: none;
  `}
`;

const StyledResSummary = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-right: 8px;
`;

const StyledTotal = styled.div`
  font-weight: bold;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  -webkit-letter-spacing: 0.05em;
  letter-spacing: 0.05em;
  color: #000000;
`;

const StyledUnits = styled.div``;

const StyledChar = styled.span`
  padding-left: 1em;
  padding-right: 1em;
`;

const StyledReservationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  background-color: white;

  ${condition('isOpen')`
    display: flex;
  `}
`;

const ReserveCTA = (props) => {
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
  } = useReservation();
  const [isReserveFormOpen, setIsReserveFormOpen] = useState(false);
  const bodyLock = useLockBodyScroll(true, isReserveFormOpen);

  const { price, title, unit, unitAmount, availability } = props;
  const isAmount = unitAmount > 0;
  // const isAmount = false;
  const total = price * unitAmount;
  const unitDesc = unitAmount > 1 ? `${unit}s` : unit;
  const unitDescription = `${unitAmount} ${unitDesc}`;

  function openReservationForm() {
    setIsReserveFormOpen(true);
  }

  // Lock and unlock scrolling
  useEffect(() => {
    if (isReserveFormOpen) {
      bodyLock.lock();
    } else {
      bodyLock.unlock();
    }
  }, [isReserveFormOpen, bodyLock]);

  function handleClose() {
    setIsReserveFormOpen(false);
  }

  return (
    <>
      <StyledWrapper>
        <StyledInnerWrapper isAmount={isAmount}>
          <div>
            <ReservationPrice price={price} unit={unit} variant="small" />
            {isAmount && (
              <>
                <StyledChar>x</StyledChar>
                <StyledUnits>{unitDescription}</StyledUnits>
                <StyledChar>|</StyledChar>
                <StyledTotal>${total} Total</StyledTotal>
              </>
            )}
          </div>
          <ActionButton variant="reserve" onClick={openReservationForm}>
            Reserve
          </ActionButton>
        </StyledInnerWrapper>
      </StyledWrapper>
      <ClientOnly>
        <Portal>
          <FullScreenOverlay isOpen={isReserveFormOpen} onClose={handleClose}>
            <ReservationForm
              price={price}
              unit={unitDesc}
              title={title}
              showTitle
            />
          </FullScreenOverlay>
        </Portal>
      </ClientOnly>
    </>
  );
};

export default ReserveCTA;
