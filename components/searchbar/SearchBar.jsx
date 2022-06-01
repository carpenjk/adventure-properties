import { Formik } from 'formik';
import { SearchSchema } from '../../data/validation/search';

import SearchBarMenu from './SearchBarMenu';
import { SearchBarInnerProvider } from './searchBarContext';

const SearchBar = ({
  initialValues,
  onSubmit,
  allOpenMode,
  search,
  ...props
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={SearchSchema}
    onSubmit={search}
  >
    <SearchBarInnerProvider allOpenMode={allOpenMode} search={search}>
      <SearchBarMenu {...props} />
    </SearchBarInnerProvider>
  </Formik>
);

export default SearchBar;
