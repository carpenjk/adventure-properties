import { useRouter } from 'next/router';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import PageHeader from '../base/PageHeader';
import Pagination from '../searchResults/searchDisplay/Pagination';
import Message from './Message';
import ReservationList from './ReservationList';
import ReservationsNav from './ReservationsNav';

const StyledResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${breakpoint(1)`
    min-width: 610px;
  `}
`;

const ReservationsContent = ({ reservations, page, itemsPerPage }) => {
  const { items, count, message } = reservations || {};
  const pageCount = Math.ceil(count / itemsPerPage);
  const router = useRouter();
  const { query } = router;
  const hasResults = items && items.length > 0;

  const handlePageClick = (event) => {
    const { selected } = event;
    router.push({
      pathname: '/reservations',
      query: { ...query, page: selected + 1 },
    });
  };
  return (
    <>
      <PageHeader title="My Adventures" />
      <StyledResultWrapper>
        <ReservationsNav itemsPerPage={itemsPerPage} />
        {hasResults && <ReservationList reservations={items} />}
        {!hasResults && <Message message={message} />}
      </StyledResultWrapper>
      <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  );
};
export default ReservationsContent;
