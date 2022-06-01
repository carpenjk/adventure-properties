import { useContext } from 'react';
import PrimarySearchFields from '../searchbar/PrimarySearchFields';
import { SearchBarContext } from '../searchbar/searchBarContext';
import SecondarySearchFields from '../searchbar/SecondarySearchFields';
import ResultMenuLayout from './ResultMenuLayout';
import SearchDisplay from './searchDisplay/SearchDisplay';
import Filters from '../searchbar/Filters';
import SearchBarMenu from '../searchbar/SearchBarMenu';
import { checkFiltersData as checkFilters } from '../../data/input';
import PageHeader from '../base/PageHeader';

const SearchResultLayout = ({
  results,
  message,
  error,
  page,
  itemsPerPage,
  ignoredLocation,
}) => {
  const { control } = useContext(SearchBarContext);

  return (
    <>
      <PageHeader title="Search Results" />
      <SearchDisplay
        itemsPerPage={itemsPerPage}
        page={page}
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
        ignoredLocation={ignoredLocation}
      />
    </>
  );
};

export default SearchResultLayout;
