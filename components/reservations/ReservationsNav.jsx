import { useRouter } from 'next/router';
import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';
import { ActionButton } from '@carpenjk/base/button';
import { Spacer } from '@carpenjk/base/layout';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  ${breakpoint(1)`
    justify-content: flex-end;
  `}
`;
const ReservationsNav = ({ itemsPerPage }) => {
  const router = useRouter();
  const { query } = router;
  const { filter } = query;
  const isPast = filter === 'past';
  const itemsPerPageObj = itemsPerPage ? { itemsPerPage } : {};

  function handleUpcoming() {
    if (isPast) {
      router.push({
        pathname: '/reservations',
      });
    }
  }
  function handlePast() {
    if (!isPast) {
      router.push({
        pathname: '/reservations',
        query: { ...query, filter: 'past', ...itemsPerPageObj },
      });
    }
  }

  return (
    <StyledContainer>
      <ActionButton
        isActive={isPast}
        tw={{ variant: 'contentNav' }}
        onClick={handlePast}
      >
        Past
      </ActionButton>
      <Spacer space="8px" />
      <ActionButton
        isActive={!isPast}
        tw={{ variant: 'contentNav' }}
        onClick={handleUpcoming}
      >
        Upcoming
      </ActionButton>
    </StyledContainer>
  );
};

export default ReservationsNav;
