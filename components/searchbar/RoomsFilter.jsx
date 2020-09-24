import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import CustomSelect from '../base/input/CustomSelect';
import withFilterGroup from './WithFilterGroup';

import { roomsFilters as inputs } from '../../compConfig';

const RoomsFilter = (props) => {
  const { valueFunctions } = props;
  const theme = useContext(ThemeContext);

  return (
    <React.Fragment>
      <CustomSelect
        theme={theme}
        key="bedFilter"
        name={inputs.bedroom.id}
        placeholder={inputs.bedroom.placeholder}
        width={inputs.bedroom.width}
        textOffset={inputs.bedroom.textOffset}
        options={inputs.bedroom.options}
        wrapperClass="roomsFilter"
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
      <CustomSelect
        theme={theme}
        key="bathFilter"
        name={inputs.bathroom.id}
        placeholder={inputs.bathroom.placeholder}
        width={inputs.bathroom.width}
        textOffset={inputs.bathroom.textOffset}
        options={inputs.bathroom.options}
        wrapperClass="roomsFilter"
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
    </React.Fragment>
  );
};

export default withFilterGroup(RoomsFilter);
