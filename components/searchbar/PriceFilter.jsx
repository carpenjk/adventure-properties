import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import CustomSelect from '../base/input/CustomSelect';
import withFilterGroup from './WithFilterGroup';

import { priceFilters } from '../../data/input';

const PriceFilter = (props) => {
  const { valueFunctions } = props;
  const theme = useContext(ThemeContext);
  const { minPrice, maxPrice } = priceFilters;
  return (
    <>
      <CustomSelect
        innerKey="minPriceSelect"
        theme={theme}
        key="minPrice"
        name={minPrice.id}
        placeholder={minPrice.placeholder}
        width={minPrice.width}
        textOffset={minPrice.textOffset}
        options={minPrice.options}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
      <CustomSelect
        innerKey="maxPriceSelect"
        theme={theme}
        key="maxPrice"
        name={maxPrice.id}
        placeholder={maxPrice.placeholder}
        width={maxPrice.width}
        textOffset={maxPrice.textOffset}
        options={maxPrice.options}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling
        valueFunctions={valueFunctions}
      />
    </>
  );
};

export default withFilterGroup(PriceFilter);
