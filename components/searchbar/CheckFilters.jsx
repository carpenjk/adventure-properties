import styled from 'styled-components';
import withFilterGroup from './WithFilterGroup';
import FilterHandler from './FilterHandler';
import Checkbox from '../Checkbox';

const StyledList = styled.ul`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, 175px);
  justify-content: center;
  width: 100%;
  @media (${(props) => props.mobileBreakpoint}) {
    justify-content: start;
  }
`;

const ComponentMap = {
  Checkbox: Checkbox,
};

const CheckFilters = (props) => {
  const { filters, mobileBreakpoint, valueFunctions } = props;
  const FilterComponent = ComponentMap[filters[0].type];

  return (
    <StyledList mobileBreakpoint={mobileBreakpoint}>
      {filters.map((filter) => {
        return (
          <li key={filter.id}>
            <FilterHandler
              component={FilterComponent}
              id={filter.id}
              name={filter.name}
              label={filter.label}
              input={filter}
              mobileBreakpoint={mobileBreakpoint}
              valueFunctions={valueFunctions}
            />
          </li>
        );
      })}
    </StyledList>
  );
};

export default withFilterGroup(CheckFilters);
