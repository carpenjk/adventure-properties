import { SearchBarMenu } from '@carpenjk/searchbar';
import PrimarySearchFields from '../searchbar/PrimarySearchFields';
import SecondarySearchFields from '../searchbar/SecondarySearchFields';
import ResultMenuLayout from './ResultMenuLayout';
import SearchDisplay from './searchDisplay/SearchDisplay';
import Filters from '../searchbar/Filters';
import { checkFiltersData as checkFilters } from '../../data/input';
import PageHeader from '../PageHeader';

const SearchResultLayout = ({
  results,
  message,
  error,
  page,
  itemsPerPage,
  ignoredLocation,
}) => (
  <>
    <PageHeader title="Search Results" />
    <SearchDisplay
      itemsPerPage={itemsPerPage}
      page={page}
      filtersMenu={
        <SearchBarMenu
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

export default SearchResultLayout;
