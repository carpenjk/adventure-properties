import styled from 'styled-components';
import FilterHandler from './FilterHandler';
import CustomSelect from '../CustomSelect';
import withFilterGroup from './WithFilterGroup';

import { priceFilters as inputs } from '../../compConfig';

const StyledPriceFilter = styled.div`
  display: flex;
  flex-direction: row;
`;

const componentMap = {
  CustomSelect: CustomSelect,
};

const PriceFilter = (props) => {
  const { mobileBreakpoint, valueFunctions } = props;

  const MinFilter = componentMap[inputs.minPrice.type];
  const MaxFilter = componentMap[inputs.maxPrice.type];
  return (
    <React.Fragment>
      <FilterHandler
        component={MinFilter}
        key="minPrice"
        name={inputs.minPrice.id}
        input={inputs.minPrice}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        mobileBreakpoint={mobileBreakpoint}
        valueFunctions={valueFunctions}
      />
      <FilterHandler
        component={MaxFilter}
        key="maxPrice"
        name={inputs.maxPrice.id}
        input={inputs.maxPrice}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        mobileBreakpoint={mobileBreakpoint}
        valueFunctions={valueFunctions}
      />
    </React.Fragment>
  );
};

export default withFilterGroup(PriceFilter);
