import CustomSelect from '../CustomSelect';
import withFilterGroup from './WithFilterGroup';
import FilterHandler from './FilterHandler';

import { roomsFilters as inputs } from '../../compConfig';

const componentMap = {
  CustomSelect: CustomSelect,
};

const RoomsFilter = (props) => {
  const { mobileBreakpoint, valueFunctions } = props;

  const BedComponent = componentMap[inputs.bedroom.type];
  const BathComponent = componentMap[inputs.bathroom.type];
  return (
    <React.Fragment>
      <FilterHandler
        component={BedComponent}
        key="bedFilter"
        name={inputs.bedroom.id}
        wrapperClass="roomsFilter"
        input={inputs.bedroom}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        mobileBreakpoint={mobileBreakpoint}
        valueFunctions={valueFunctions}
      />
      <FilterHandler
        component={BathComponent}
        key="bathFilter"
        name={inputs.bathroom.id}
        wrapperClass="roomsFilter"
        input={inputs.bathroom}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        mobileBreakpoint={mobileBreakpoint}
        valueFunctions={valueFunctions}
      />
    </React.Fragment>
  );
};

export default withFilterGroup(RoomsFilter);
