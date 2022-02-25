import { useContext } from 'react';
import { SearchBarContext } from './searchBarContext';
import FiltersContainer from './FiltersContainer';

const SearchFilters = (props) => {
  const { isScrollable, FilterFields } = props;
  //* context *********************************************************
  const {
    isSearchFiltersOpen,
    updateFilters,
    getFilterValue,
    toggleBooleanFilter,
  } = useContext(SearchBarContext);

  return (
    <FiltersContainer
      isSearchFiltersOpen={isSearchFiltersOpen}
      isScrollable={isScrollable}
      className={`searchFilters ${
        isSearchFiltersOpen ? 'searchFiltersOpen' : ''
      }`}
    >
      <FilterFields
        updateFilters={updateFilters}
        getFilterValue={getFilterValue}
        toggleBooleanFilter={toggleBooleanFilter}
      />
    </FiltersContainer>
  );
};

export default SearchFilters;
