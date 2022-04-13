import { Formik } from 'formik';
import { SearchSchema } from '../../data/validation/search';

import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const SearchBar = ({ initialValues, onSubmit, ...props }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={SearchSchema}
    onSubmit={onSubmit}
  >
    <SearchBarProvider>
      <SearchBarMenu {...props} />
    </SearchBarProvider>
  </Formik>
);

export default SearchBar;
