import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  checkFiltersData,
  endDateProps,
  startDateProps,
  priceFilters,
  roomsFilters,
} from '../../data/input';
import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const { minPrice, maxPrice } = priceFilters;
const { bedroom, bathroom } = roomsFilters;

const getInitialCheckFilters = () =>
  checkFiltersData.reduce((obj, filter) => ({ ...obj, [filter.name]: [] }), {});

const aryIncludesValues = (values, ary) =>
  values.every((val) => ary.includes(val));

const testCheckboxFilter = (val, checkboxes) =>
  checkboxes.some((checkbox) => checkbox.label === val);

const getCheckFiltersSchema = () =>
  checkFiltersData.reduce(
    (obj, filter) => ({
      ...obj,
      [filter.name]: yup
        .array()
        .of(
          yup
            .string()
            .test('is_valid', (val) =>
              testCheckboxFilter(val, filter.checkboxes)
            )
        ),
    }),
    {}
  );

const schema = yup.object().shape({
  destination: yup.string().max(50),
  arriveDate: yup
    .date()
    .nullable(true)
    .transform((_, val) => (val === Date(val) ? val : null)), //! add test gte today
  departDate: yup
    .date()
    .nullable(true)
    .transform((_, val) => (val === Date(val) ? val : null)), //! add test gte arriveDate + 1
  guests: yup
    .number()
    .nullable(true)
    .integer()
    .positive()
    .max(10)
    .transform((_, val) => (val === Number(val) ? val : null)),
  [minPrice.id]: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(minPrice.options[minPrice.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  [maxPrice.id]: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(maxPrice.options[maxPrice.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  [bedroom.id]: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(bedroom.options[bedroom.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  [bathroom.id]: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(bathroom.options[bathroom.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  ...getCheckFiltersSchema(),
});

const prepValues = (values) => {
  const keys = Object.keys(values);

  const cleaned = keys.reduce((obj, p) => {
    const strVal = JSON.stringify(values[p]);
    // remove blank stringified parameters
    if (strVal === '""' || strVal === '[]' || strVal === '{}') {
      return obj;
    }
    return { ...obj, [p]: strVal };
  }, {});

  return cleaned;
};

const SearchBar = (props) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        destination: '',
        guests: '',
        [startDateProps.id]: '',
        [endDateProps.id]: '',
        nearbyActivities: '',
        ...getInitialCheckFilters(),
      }}
      validationSchema={schema}
      onSubmit={async (values, formik) => {
        console.log('routing to search');
        // await testValidation(values);
        router.push({
          pathname: '/properties/search',
          query: { ...prepValues(values) },
        });
      }}
    >
      <SearchBarProvider>
        <SearchBarMenu {...props} />
      </SearchBarProvider>
    </Formik>
  );
};

export default SearchBar;
