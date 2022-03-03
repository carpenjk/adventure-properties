import { useContext } from 'react';
import { SearchBarContext } from './searchBarContext';
import FiltersContainer from './FiltersContainer';

const SearchFilters = (props) => {
  const { isScrollable, checkFilters, FilterFields } = props;
  //* context *********************************************************
  const { isSearchFiltersOpen } = useContext(SearchBarContext);

  return (
    <FiltersContainer
      isSearchFiltersOpen={isSearchFiltersOpen}
      isScrollable={isScrollable}
      className={`searchFilters ${
        isSearchFiltersOpen ? 'searchFiltersOpen' : ''
      }`}
    >
      <FilterFields checkFilters={checkFilters} />
    </FiltersContainer>
  );
};

export default SearchFilters;
