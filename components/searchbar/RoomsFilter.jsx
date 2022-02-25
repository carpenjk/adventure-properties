import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import CustomSelect from '../base/input/CustomSelect';
import withFilterGroup from './WithFilterGroup';

import { roomsFilters } from '../../data/input';

const RoomsFilter = (props) => {
  const { valueFunctions } = props;
  const theme = useContext(ThemeContext);
  const { bedroom, bathroom } = roomsFilters;

  return (
    <>
      <CustomSelect
        innerKey="bedSelect"
        theme={theme}
        key="bedFilter"
        name={bedroom.id}
        placeholder={bedroom.placeholder}
        width={bedroom.width}
        textOffset={bedroom.textOffset}
        options={bedroom.options}
        wrapperClass="roomsFilter"
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
      <CustomSelect
        innerKey="bathSelect"
        theme={theme}
        key="bathFilter"
        name={bathroom.id}
        placeholder={bathroom.placeholder}
        width={bathroom.width}
        textOffset={bathroom.textOffset}
        options={bathroom.options}
        wrapperClass="roomsFilter"
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
    </>
  );
};

export default withFilterGroup(RoomsFilter);
