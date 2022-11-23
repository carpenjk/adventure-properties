import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FormikSelect } from '@carpenjk/base/input';
import { priceFilters } from '../../data/input';

const PriceFilters = () => {
  const theme = useContext(ThemeContext);
  const { minPrice, maxPrice } = priceFilters;
  return (
    <>
      <FormikSelect
        id={minPrice.id}
        instanceId={minPrice.id}
        name={minPrice.id}
        theme={theme}
        key="minPrice"
        placeholder={minPrice.placeholder}
        width={minPrice.width}
        textOffset={minPrice.textOffset}
        options={minPrice.options}
        showInsetPlaceholder
      />
      <FormikSelect
        id={minPrice.id}
        instanceId={minPrice.id}
        name={maxPrice.id}
        theme={theme}
        key="maxPrice"
        placeholder={maxPrice.placeholder}
        width={maxPrice.width}
        textOffset={maxPrice.textOffset}
        options={maxPrice.options}
        showInsetPlaceholder
      />
    </>
  );
};

export default PriceFilters;
