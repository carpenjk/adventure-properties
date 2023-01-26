import styled from 'styled-components';
import { useState, useRef } from 'react';
import { breakpoint } from '@carpenjk/prop-x/css';
import ScrollLock from '@carpenjk/scroll-lock';
import { ActionButton } from '@carpenjk/base/button';
import { Spacer } from '@carpenjk/base/layout';
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
  padding-top: 16px;
  padding-right: 8px;
  padding-bottom: 16px;
  padding-left: 8px;
  border: 2px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 3px 3px 1px 1px;

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

const ReserveCTA = ({ maxGuests, title, openInitialRender, onReview }) => {
  const { availability, reservation, reservationControl } = useReservation();
  const fullScreenRef = useRef();

  // reservation properties
  const { price, unit, unitLabel, unitAmount, isValid } = reservation;
  // passed in props
  const [isInputOpen, setIsInputOpen] = useState(openInitialRender);
  const isAmount = unitAmount > 0;

  function handleInputOpen() {
    setIsInputOpen(true);
  }
  function handlePortalClose() {
    setIsInputOpen(false);
  }

  return (
    <>
      <StyledWrapper>
        <StyledInnerWrapper maxWidth={isAmount ? '400px' : '300px'}>
          <OverviewButton
            isAmount={isAmount}
            price={price}
            unit={unit}
            unitAmount={unitAmount}
            unitLabel={unitLabel}
            className="link"
            onClick={handleInputOpen}
          />
          <Spacer space="4px" />
          {!isValid && (
            <ActionButton tw={{ variant: 'reserve' }} onClick={handleInputOpen}>
              Check Availability
            </ActionButton>
          )}
          {isValid && (
            <ActionButton tw={{ variant: 'reserve' }} onClick={onReview}>
              Reserve
            </ActionButton>
          )}
        </StyledInnerWrapper>
      </StyledWrapper>
      {isInputOpen && (
        <>
          <ScrollLock scrollNode={fullScreenRef} reserveScrollBarGap />
          <FullScreenReservation
            availability={availability}
            reservation={reservation}
            maxGuests={maxGuests}
            control={reservationControl}
            title={title}
            showTitle
            isOpen={isInputOpen}
            onClose={handlePortalClose}
            onReview={onReview}
          />
        </>
      )}
    </>
  );
};

export default ReserveCTA;
