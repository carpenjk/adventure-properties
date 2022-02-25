import { condition } from 'dataweaver';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledMenuContainer = styled.div`
  overflow-y: visible;

  ${condition('isSearchFiltersOpen')`
    overflow-y: auto;
  `}

  ${breakpoint(1)`
    display: flex;
    flex-direction: column;
    ${condition('isSearchFiltersOpen')`
      padding: 8px;
    `}
  `}
`;

const MenuContainer = ({
  children,
  isSearchFiltersOpen,
  isSearchBarFocused,
}) => (
  <StyledMenuContainer
    isSearchFiltersOpen={isSearchFiltersOpen}
    isSearchBarFocused={isSearchBarFocused}
  >
    {children}
  </StyledMenuContainer>
);

export default MenuContainer;
