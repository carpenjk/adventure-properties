import PriceFilters from './PriceFilters';
import RoomsFilters from './RoomsFilters';
import CheckFilters from './CheckFilters';
import FilterGroup from './FilterGroup';

const Filters = ({ checkFilters }) => (
  <>
    <li key="priceFilter">
      <FilterGroup title="Price">
        <PriceFilters />
      </FilterGroup>
    </li>
    <li key="bedFilter">
      <FilterGroup title="Rooms">
        <RoomsFilters />
      </FilterGroup>
    </li>
    {checkFilters.map((filter) => (
      <li key={filter.title}>
        <FilterGroup title={filter.title}>
          <CheckFilters name={filter.title} filters={filter.filters} />
        </FilterGroup>
      </li>
    ))}
  </>
);

export default Filters;
