import styled from 'styled-components';
import { useContext } from 'react';
import { SearchBarContext } from './searchBarContext';
import PriceFilter from './PriceFilter';
import RoomsFilter from './RoomsFilter';
import CheckFilters from './CheckFilters';

import { checkFilters as filters } from '../../compConfig';

const StyleWrapper = styled.ul`
  display: none;
  flex-grow: 1;
  overflow-y: scroll;
  &.searchFiltersOpen {
    display: flex;
    flex-direction: column;
  }
  ul {
    margin: 0;
  }
`;

const SearchFilters = (props) => {
  //* context *********************************************************
  const {
    isSearchFiltersOpen,
    updateFilters,
    getFilterValue,
    toggleBooleanFilter,
  } = useContext(SearchBarContext);

  const { mobileBreakpoint } = props;
  return (
    <StyleWrapper
      key="priceWrapper"
      className={`searchFilters ${
        isSearchFiltersOpen ? 'searchFiltersOpen' : ''
      }`}
      mobileBreakpoint={mobileBreakpoint}
    >
      <li key={'priceFilter'}>
        <PriceFilter
          title={'Price'}
          mobileBreakpoint={mobileBreakpoint}
          valueFunctions={{ get: getFilterValue, set: updateFilters }}
        />
      </li>
      <li key={'bedFilter'}>
        <RoomsFilter
          title={'Rooms'}
          mobileBreakpoint={mobileBreakpoint}
          valueFunctions={{ get: getFilterValue, set: updateFilters }}
        />
      </li>
      {filters.map((filter) => {
        return (
          <li key={filter.title}>
            <CheckFilters
              title={filter.title}
              filters={filter.filters}
              mobileBreakpoint={mobileBreakpoint}
              valueFunctions={{ get: getFilterValue, set: toggleBooleanFilter }}
            />
          </li>
        );
      })}
    </StyleWrapper>
  );
};

export default SearchFilters;
