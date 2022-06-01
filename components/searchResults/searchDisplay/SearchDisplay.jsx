import { useContext, useEffect, useState } from 'react';
import { SearchBarContext } from '../../searchbar/searchBarContext';
import Dashboard from './Dashboard';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import CenterWithContent from '../../base/layout/CenterWithContent';

const SearchDisplay = (props) => {
  const { control, searchState } = useContext(SearchBarContext);
  const [pageCount, setPageCount] = useState(0);
  const {
    filtersMenu,
    DashboardMenuLayout,
    page,
    itemsPerPage,
    ...fwdProps
  } = props;
  const { results, message, error } = fwdProps;
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  useEffect(() => {
    setPageCount(Math.ceil(results.count / itemsPerPage));
  }, [results, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const { selected } = event;
    control.search(searchState.values, selected + 1);
  };

  return (
    <CenterWithContent>
      {filtersMenu}
      <Dashboard
        message={message || ''}
        isSearchMenuOpen={showSearchMenu}
        setIsSearchMenuOpen={setShowSearchMenu}
      >
        <DashboardMenuLayout {...fwdProps} />
      </Dashboard>
      <SearchResults items={results.items || []} />
      <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
    </CenterWithContent>
  );
};

export default SearchDisplay;
