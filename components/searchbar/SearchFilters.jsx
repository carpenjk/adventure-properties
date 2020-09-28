import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';
import { useContext } from 'react';
import { SearchBarContext } from './searchBarContext';
import PriceFilter from './PriceFilter';
import RoomsFilter from './RoomsFilter';
import CheckFilters from './CheckFilters';

import { checkFiltersData as filters } from '../../compConfig';

const StyledSearchFilter = styled.ul`
  display: none;
  ${condition('isSearchFiltersOpen')`
    display: flex;
  `}

  flex-direction: column;
  flex: none;
  overflow-x: hidden;
  overflow-y: hidden;
  ${condition('isScrollable')`
    overflow-y: scroll;
  `}
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;

  ${breakpoint(1)`
    flex: 1;
    overflow-y: hidden;
    ${condition('isScrollable')`
      overflow-y: scroll;
    `}
  `}
`;

const SearchFilters = (props) => {
  const { isScrollable } = props;
  //* context *********************************************************
  const {
    isSearchFiltersOpen,
    updateFilters,
    getFilterValue,
    toggleBooleanFilter,
  } = useContext(SearchBarContext);

  return (
    <StyledSearchFilter
      key="priceWrapper"
      isSearchFiltersOpen={isSearchFiltersOpen}
      isScrollable={isScrollable}
      className={`searchFilters ${
        isSearchFiltersOpen ? 'searchFiltersOpen' : ''
      }`}
    >
      <li key={'priceFilter'}>
        <PriceFilter
          title={'Price'}
          valueFunctions={{ get: getFilterValue, set: updateFilters }}
        />
      </li>
      <li key={'bedFilter'}>
        <RoomsFilter
          title={'Rooms'}
          valueFunctions={{ get: getFilterValue, set: updateFilters }}
        />
      </li>
      {filters.map((filter) => {
        return (
          <li key={filter.title}>
            <CheckFilters
              title={filter.title}
              filters={filter.filters}
              valueFunctions={{ get: getFilterValue, set: toggleBooleanFilter }}
            />
          </li>
        );
      })}
    </StyledSearchFilter>
  );
};

export default SearchFilters;
