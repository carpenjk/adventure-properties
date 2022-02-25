import styled from 'styled-components';
import { condition } from 'dataweaver';
import {
  breakpoint,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
} from 'themeweaver';

const StyledButtonContainer = styled.div`
  display: none;
  ${condition('isDisplayed')`
    display: flex;
  `}
  justify-content: space-between;
  padding-top: ${getPaddingTop('searchBar_container.buttons', '0')};
  padding-right: ${getPaddingRight('searchBar_container.buttons', '0')};
  padding-bottom: ${getPaddingBottom('searchBar_container.buttons', '0')};
  padding-left: ${getPaddingLeft('searchBar_container.buttons', '0')};
  border-top: none;

  ${condition('isSearchFiltersOpen')`
    border-top: 1px solid rgba(151, 151, 151, 0.35);
  `}

  ${breakpoint(1)`
    display: none;
    ${condition('isDisplayed')`
      display: flex;
    `}
  `}
`;

const ButtonContainer = ({ children, isDisplayed, isSearchFiltersOpen }) => (
  <StyledButtonContainer
    isSearchFiltersOpen={isSearchFiltersOpen}
    isDisplayed={isDisplayed}
  >
    {children}
  </StyledButtonContainer>
);

export default ButtonContainer;
