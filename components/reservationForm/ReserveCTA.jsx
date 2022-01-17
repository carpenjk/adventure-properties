import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import useLockBodyScroll from '../hooks/UseLockBodyScroll';
import ActionButton from '../base/ActionButton';
import useReservation from './UseReservation';
import FullScreenReservation from './FullScreenReservation';
import OverviewButton from './OverviewButton';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 3px;

  font-family: ${({ theme }) => theme.fonts.openSans};
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
  max-width: ${({ maxWidth }) => maxWidth};

  > button.link {
    color: ${({ theme }) => theme.colors.link[0]};
  }
  > button.link:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }

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

const ReserveCTA = ({ title, openInitialRender }) => {
  const { availability, reservation, reservationControl } = useReservation();

  // reservation properties
  const {
    price,
    unit,
    unitLabel,
    unitAmount,
    isResReady,
    isValid,
  } = reservation;
  const { reservePreview } = reservationControl;

  // passed in props
  const [isInputOpen, setIsInputOpen] = useState(openInitialRender);
  const isAmount = unitAmount > 0;

  const bodyLock = useLockBodyScroll(true, setIsInputOpen);

  // Lock and unlock scrolling
  useEffect(() => {
    if (isInputOpen) {
      bodyLock.lock();
    } else {
      bodyLock.unlock();
    }
  }, [isInputOpen, bodyLock]);

  function handleInputOpen() {
    setIsInputOpen(true);
  }
  function handlePortalClose() {
    setIsInputOpen(false);
  }

  return (
    <>
      <StyledWrapper>
        <StyledInnerWrapper maxWidth={isAmount ? '575px' : '300px'}>
          <OverviewButton
            isAmount={isAmount}
            price={price}
            unit={unit}
            unitAmount={unitAmount}
            unitLabel={unitLabel}
            className="link"
            onClick={handleInputOpen}
          />
          {!isValid && (
            <ActionButton variant="reserve" onClick={handleInputOpen}>
              Check Availability
            </ActionButton>
          )}
          {isValid && (
            <ActionButton variant="reserve" onClick={reservePreview}>
              Reserve
            </ActionButton>
          )}
        </StyledInnerWrapper>
      </StyledWrapper>
      {isInputOpen && (
        <FullScreenReservation
          availability={availability}
          reservation={reservation}
          control={reservationControl}
          title={title}
          showTitle
          isOpen={isInputOpen}
          onClose={handlePortalClose}
        />
      )}
    </>
  );
};

export default ReserveCTA;
