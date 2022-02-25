import { checkFiltersData as filters } from '../../data/input';
import PriceFilter from './PriceFilter';
import RoomsFilter from './RoomsFilter';
import CheckFilters from './CheckFilters';

const Filters = ({ updateFilters, getFilterValue, toggleBooleanFilter }) => (
  <>
    <li key="priceFilter">
      <PriceFilter
        title="Price"
        valueFunctions={{ get: getFilterValue, set: updateFilters }}
      />
    </li>
    <li key="bedFilter">
      <RoomsFilter
        title="Rooms"
        valueFunctions={{ get: getFilterValue, set: updateFilters }}
      />
    </li>
    {filters.map((filter) => (
      <li key={filter.title}>
        <CheckFilters
          title={filter.title}
          filters={filter.filters}
          valueFunctions={{ get: getFilterValue, set: toggleBooleanFilter }}
        />
      </li>
    ))}
  </>
);

export default Filters;
