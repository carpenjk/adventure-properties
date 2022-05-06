import * as yup from 'yup';
import { checkFiltersData, priceFilters, roomsFilters } from '../input';

const { minPrice, maxPrice } = priceFilters;
const { bedroom, bathroom } = roomsFilters;

export const getInitialCheckFilters = () =>
  checkFiltersData.reduce((obj, filter) => ({ ...obj, [filter.name]: [] }), {});

export const prepValues = (values) => {
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

function isValidSort(val) {
  if (!val) return true;
  const priceSort = val.displayPrice || undefined;
  const destSort = val.destination || undefined;
  const selectedSort = priceSort || destSort;
  if (
    (priceSort === undefined && destSort === undefined) ||
    Object.keys(val).length > 1
  ) {
    return false;
  }
  return selectedSort === 1 || selectedSort === -1;
}

export const SearchSchema = yup.object().shape({
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
  minPrice: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(minPrice.options[minPrice.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  maxPrice: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(maxPrice.options[maxPrice.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  bedroom: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(bedroom.options[bedroom.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  bathroom: yup
    .number()
    .nullable(true)
    .integer()
    .max(Number(bathroom.options[bathroom.options.length - 1].value))
    .transform((_, val) => (val === Number(val) ? val : null)),
  ...getCheckFiltersSchema(),
  features: yup.boolean(),
  cmsID: yup.string().length(22),
  page: yup
    .number()
    .nullable(true)
    .integer()
    .transform((_, val) => (val === Number(val) ? val : null)),
  sortBy: yup.object().test('is_sortBy_valid', (val) => isValidSort(val)),
});
