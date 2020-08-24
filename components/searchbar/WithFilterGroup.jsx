import styled from 'styled-components';
import {
  breakpoint,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
} from 'themeweaver';
import FilterHeader from '../FilterHeader';

const StyledFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${getMarginTop('searchBar_container.filterGroup', '4rem')};
  margin-right: ${getMarginRight('searchBar_container.filterGroup', '0')};
  margin-bottom: ${getMarginBottom('searchBar_container.filterGroup', '0')};
  margin-left: ${getMarginLeft('searchBar_container.filterGroup', '0')};
  padding-top: ${getPaddingTop('searchBar_container.filterGroup', '0')};
  padding-right: ${getPaddingRight('searchBar_container.filterGroup', '0')};
  padding-bottom: ${getPaddingBottom(
    'searchBar_container.filterGroup',
    '1.6rem'
  )};
  padding-left: ${getPaddingLeft('searchBar_container.filterGroup', '0')};
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  & > * {
    margin-top: ${getMarginTop('searchBar_container.filter', '0')};
    margin-right: ${getMarginRight('searchBar_container.filter', '0')};
    margin-bottom: ${getMarginBottom('searchBar_container.filter', '0')};
    margin-left: ${getMarginLeft('searchBar_container.filter', '0')};
    padding-top: ${getPaddingTop('searchBar_container.filter', '0')};
    padding-right: ${getPaddingRight('searchBar_container.filter', '0')};
    padding-bottom: ${getPaddingBottom('searchBar_container.filter', '1rem')};
    padding-left: ${getPaddingLeft('searchBar_container.filter', '0')};
  }

  ${breakpoint(1)`
    flex-direction: row;
    & > * {
      margin-top: ${getMarginTop('searchBar_container.filter', '0')};
      margin-right: ${getMarginRight('searchBar_container.filter', '0')};
      margin-bottom: ${getMarginBottom('searchBar_container.filter', '0')};
      margin-left: ${getMarginLeft('searchBar_container.filter', '0')};
      padding-top: ${getPaddingTop('searchBar_container.filter', '0')};
      padding-right: ${getPaddingRight('searchBar_container.filter', '0')};
      padding-bottom: ${getPaddingBottom('searchBar_container.filter', '0')};
      padding-left: ${getPaddingLeft('searchBar_container.filter', '0')};
    }
  `}
`;

const withFilterGroup = (Filter) => {
  const WithFilterGroup = (props) => {
    return (
      <StyledFilterGroup key="wrapper">
        <FilterHeader headerText={props.title} key="title" />
        <FilterContainer>
          <Filter {...props} />
        </FilterContainer>
      </StyledFilterGroup>
    );
  };
  return WithFilterGroup;
};

export default withFilterGroup;
