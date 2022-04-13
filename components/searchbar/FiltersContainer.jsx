import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';
import { checkFiltersData as filters } from '../../data/input';

const StyledSearchFilter = styled.ul`
  display: none;
  ${condition('isSearchFiltersOpen')`
    display: flex;
  `}

  flex-direction: column;
  flex: none;
  overflow-x: hidden;
  ${condition('isScrollable')`
    overflow-y: scroll;
    overflow-y:auto;
  `}
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;

  ${breakpoint(1)`
    flex: none;
    overflow-y: hidden;
    ${condition('isScrollable')`
      overflow-y: scroll;
      overflow-y:auto;
    `}
  `}
`;

const FiltersContainer = ({ children, isSearchFiltersOpen, isScrollable }) => (
  <StyledSearchFilter
    isSearchFiltersOpen={isSearchFiltersOpen}
    isScrollable={isScrollable}
    className={`searchFilters ${
      isSearchFiltersOpen ? 'searchFiltersOpen' : ''
    }`}
  >
    {children}
  </StyledSearchFilter>
);

export default FiltersContainer;