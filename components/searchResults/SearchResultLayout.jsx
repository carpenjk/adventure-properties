import { SearchBarMenu } from '@carpenjk/searchbar';
import PrimarySearchFields from '../searchbar/PrimarySearchFields';
import SecondarySearchFields from '../searchbar/SecondarySearchFields';
import ResultMenuLayout from './ResultMenuLayout';
import SearchDisplay from './searchDisplay/SearchDisplay';
import Filters from '../searchbar/Filters';
import { checkFiltersData as checkFilters } from '../../data/input';
import PageHeader from '../PageHeader';
import CustomDatePickerStyles from '../datepicker/CustomDatePickerStyles';

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
    <CustomDatePickerStyles>
      <SearchDisplay
        itemsPerPage={itemsPerPage}
        page={page}
        filtersMenu={
          <SearchBarMenu
            searchBarId="searchbar"
            offsetTop={-40}
            PrimarySearchFields={PrimarySearchFields}
            SecondarySearchFields={SecondarySearchFields}
            FilterFields={Filters}
            checkFilters={checkFilters}
            openMaxWidth={['none', '833px']}
          />
        }
        DashboardMenuLayout={ResultMenuLayout}
        results={results}
        message={message}
        error={error}
        ignoredLocation={ignoredLocation}
      />
    </CustomDatePickerStyles>
  </>
);

export default SearchResultLayout;
