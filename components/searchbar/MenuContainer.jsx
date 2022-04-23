import { condition } from 'dataweaver';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledMenuContainer = styled.div`
  overflow-y: visible;

  ${condition('isFiltersOpen')`
    overflow-y: auto;
    padding: 4px;
  `}

  ${breakpoint(1)`
    display: flex;
    flex-direction: column;
    ${condition('isFiltersOpen')`
      padding: 8px;
    `}
  `}
`;

const MenuContainer = ({ children, isFiltersOpen, isSearchBarFocused }) => (
  <StyledMenuContainer
    isFiltersOpen={isFiltersOpen}
    isSearchBarFocused={isSearchBarFocused}
  >
    {children}
  </StyledMenuContainer>
);

export default MenuContainer;
