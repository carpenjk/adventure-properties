import { useContext } from 'react';
import PrimarySearchFields from '../searchbar/PrimarySearchFields';
import { SearchBarContext } from '../searchbar/searchBarContext';
import SecondarySearchFields from '../searchbar/SecondarySearchFields';
import ResultMenuLayout from './ResultMenuLayout';
import SearchDisplay from './searchDisplay/SearchDisplay';
import Filters from '../searchbar/Filters';
import SearchBarMenu from '../searchbar/SearchBarMenu';
import { checkFiltersData as checkFilters } from '../../data/input';

const SearchResultLayout = ({ results, message, error }) => {
  const { control } = useContext(SearchBarContext);

  return (
    <>
      <SearchDisplay
        filtersMenu={
          <SearchBarMenu
            onExit={() => control.hide()}
            PrimarySearchFields={PrimarySearchFields}
            SecondarySearchFields={SecondarySearchFields}
            FilterFields={Filters}
            checkFilters={checkFilters}
            openMaxWidth={['none', '1000px']}
          />
        }
        DashboardMenuLayout={ResultMenuLayout}
        results={results}
        message={message}
        error={error}
      />
    </>
  );
};

export default SearchResultLayout;
