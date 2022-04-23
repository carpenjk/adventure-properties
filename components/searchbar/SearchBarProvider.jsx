import { Formik } from 'formik';
import { SearchBarInnerProvider } from './searchBarContext';

const SearchBarProvider = (props) => {
  const { initialValues, schema, onSubmit, children, ...options } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <SearchBarInnerProvider {...options}>{children}</SearchBarInnerProvider>
    </Formik>
  );
};

export default SearchBarProvider;
