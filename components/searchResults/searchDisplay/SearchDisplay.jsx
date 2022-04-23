import { useState } from 'react';
import Dashboard from './Dashboard';
import SearchResults from './SearchResults';

const SearchDisplay = (props) => {
  const { filtersMenu, DashboardMenuLayout, ...fwdProps } = props;
  const { results, message, error } = fwdProps;
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  return (
    <>
      {filtersMenu}
      <Dashboard
        message={message || ''}
        isSearchMenuOpen={showSearchMenu}
        setIsSearchMenuOpen={setShowSearchMenu}
      >
        <DashboardMenuLayout {...fwdProps} />
      </Dashboard>
      <SearchResults results={results || []} />
    </>
  );
};

export default SearchDisplay;
