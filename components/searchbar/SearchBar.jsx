import { Formik } from 'formik';
import {
  checkFiltersData,
  endDateProps,
  startDateProps,
} from '../../data/input';
import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const getInitialCheckFilters = () =>
  checkFiltersData.reduce(
    (obj, filter) => ({ ...obj, [filter.title]: [] }),
    {}
  );

const SearchBar = (props) => (
  <Formik
    initialValues={{
      destination: '',
      guests: '',
      [startDateProps.id]: '',
      [endDateProps.id]: '',
      ...getInitialCheckFilters(),
    }}
  >
    <SearchBarProvider>
      <SearchBarMenu {...props} />
    </SearchBarProvider>
  </Formik>
);

export default SearchBar;
