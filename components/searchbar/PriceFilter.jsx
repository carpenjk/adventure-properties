import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import CustomSelect from '../base/input/CustomSelect';
import withFilterGroup from './WithFilterGroup';

import { priceFilters as inputs } from '../../compConfig';

const PriceFilter = (props) => {
  const { valueFunctions } = props;
  const theme = useContext(ThemeContext);
  return (
    <React.Fragment>
      <CustomSelect
        theme={theme}
        key="minPrice"
        name={inputs.minPrice.id}
        placeholder={inputs.minPrice.placeholder}
        width={inputs.minPrice.width}
        textOffset={inputs.minPrice.textOffset}
        options={inputs.minPrice.options}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
      <CustomSelect
        theme={theme}
        key="maxPrice"
        name={inputs.maxPrice.id}
        placeholder={inputs.maxPrice.placeholder}
        width={inputs.maxPrice.width}
        textOffset={inputs.maxPrice.textOffset}
        options={inputs.maxPrice.options}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
    </React.Fragment>
  );
};

export default withFilterGroup(PriceFilter);
