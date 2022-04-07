import PriceFilters from './PriceFilters';
import RoomsFilters from './RoomsFilters';
import CheckFilters from './CheckFilters';
import FilterGroup from './FilterGroup';
import ActivitiesFilter from './ActivitiesFilter';

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
    <li key="nearbyActivities">
      <FilterGroup title="Nearby Activities">
        <ActivitiesFilter />
      </FilterGroup>
    </li>
    {checkFilters.map((filter) => (
      <li key={filter.title}>
        <FilterGroup title={filter.title}>
          <CheckFilters name={filter.name} filters={filter.checkboxes} />
        </FilterGroup>
      </li>
    ))}
  </>
);

export default Filters;
