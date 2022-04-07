import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { roomsFilters } from '../../data/input';
import FormikSelect from '../base/input/FormikSelect';

const RoomsFilters = (props) => {
  const theme = useContext(ThemeContext);
  const { bedroom, bathroom } = roomsFilters;

  return (
    <>
      <FormikSelect
        id={bedroom.id}
        instanceId={bedroom.id}
        name={bedroom.id}
        key="bedFilter"
        theme={theme}
        placeholder={bedroom.placeholder}
        width={bedroom.width}
        textOffset={bedroom.textOffset}
        options={bedroom.options}
        showInsetPlaceholder
      />
      <FormikSelect
        id={bathroom.id}
        instanceId={bathroom.id}
        name={bathroom.id}
        key="bathFilter"
        theme={theme}
        placeholder={bathroom.placeholder}
        width={bathroom.width}
        textOffset={bathroom.textOffset}
        options={bathroom.options}
        showInsetPlaceholder
      />
    </>
  );
};

export default RoomsFilters;
