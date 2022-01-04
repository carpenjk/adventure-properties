import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

import useLockBodyScroll from '../hooks/UseLockBodyScroll';
import ReservationPrice from './ReservationPrice';
import ActionButton from '../base/ActionButton';
import LinkButton from '../base/LinkButton';
import useReservation from './UseReservation';
import FullScreenReservation from './FullScreenReservation';

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

  > button.link {
    color: ${({ theme }) => theme.colors.link[0]};
  }
  > button.link:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }

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

const StyledUnits = styled.div`
  font-family: ${({ theme }) => theme.fonts.openSans};
  color: inherit;
  text-decoration: underline;
`;

const StyledChar = styled.span`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.link[0]};
  padding-left: 1em;
  padding-right: 1em;
  &:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }
`;

const StyledButtonLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReserveCTA = ({ title, openInitialRender }) => {
  const { availability, reservation, reservationControl } = useReservation();

  // reservation properties
  const { price, unit, unitLabel, unitAmount, isResReady } = reservation;
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
        <StyledInnerWrapper isAmount={isAmount}>
          <LinkButton className="link" onClick={handleInputOpen}>
            <StyledButtonLayout>
              <ReservationPrice price={price.avg} unit={unit} variant="link" />
              {isAmount && (
                <>
                  <StyledChar>x</StyledChar>
                  <StyledUnits>{`${unitAmount} ${unitLabel}`}</StyledUnits>
                  <StyledChar>|</StyledChar>
                </>
              )}
            </StyledButtonLayout>
            {isAmount && <StyledTotal>${price.total} Total</StyledTotal>}
          </LinkButton>
          {!isResReady && (
            <ActionButton variant="reserve" onClick={handleInputOpen}>
              Check Availability
            </ActionButton>
          )}
          {isResReady && (
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
