import { useEffect, useState } from 'react';
import ClientOnly from '@carpenjk/client-only';
import { useSearchBar } from '@carpenjk/searchbar';
import { CenterWithContent } from '@carpenjk/base/layout';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

const SearchDisplay = (props) => {
  const { searchState } = useSearchBar();
  const router = useRouter();

  const { query } = router;
  const { sortBy } = query;
  const currentSort = sortBy ? JSON.parse(sortBy) : {};
  const [pageCount, setPageCount] = useState(1);
  const {
    filtersMenu,
    DashboardMenuLayout,
    page,
    itemsPerPage,
    ...fwdProps
  } = props;
  const { results, message } = fwdProps;
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  useEffect(() => {
    setPageCount(Math.ceil(results.count / itemsPerPage));
  }, [results, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const { selected } = event;
    searchState.search({
      ...searchState.values,
      sortBy: currentSort,
      page: selected + 1,
    });
  };

  return (
    <CenterWithContent>
      <ClientOnly>{filtersMenu}</ClientOnly>
      <Dashboard
        message={message || ''}
        isSearchMenuOpen={showSearchMenu}
        setIsSearchMenuOpen={setShowSearchMenu}
      >
        <DashboardMenuLayout {...fwdProps} />
      </Dashboard>
      <SearchResults items={results.items || []} />
      <Pagination
        onPageChange={handlePageClick}
        forcePage={page ? Number(page) - 1 : 0}
        pageCount={pageCount}
      />
    </CenterWithContent>
  );
};

export default SearchDisplay;
