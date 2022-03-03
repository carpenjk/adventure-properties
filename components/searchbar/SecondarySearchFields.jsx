import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { startDateProps, endDateProps, guestOptions } from '../../data/input';
import FormikDateRange from '../base/input/FormikDateRange';
import FormikSelect from '../base/input/FormikSelect';
import { gtDateOnly } from '../../utils/dates';

const SecondarySearchFields = (props) => {
  const {
    onInputFocus,
    inputRefs,
    searchBarRef,
    isSearchBarFocused,
    values,
  } = props;

  const theme = useContext(ThemeContext);

  return (
    <>
      <FormikDateRange
        tw={{ variant: 'searchBar' }}
        key="dateRange"
        values={values}
        filterEndDate={(dt) => gtDateOnly(dt, values[startDateProps.id])}
        startProps={startDateProps}
        endProps={endDateProps}
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[0] = el)}
        popperParent={searchBarRef}
        forceClose={!isSearchBarFocused}
        showInsetPlaceholder
      />
      <FormikSelect
        theme={theme}
        id="guests"
        instanceId="guests"
        name="guests"
        placeholder={{
          value: 'Guests',
          translateX: '-21px',
          translateY: '-18px',
        }}
        icon="./static/assets/searchbar/icon/guest.svg"
        iconOffset="5px"
        iconWidth="16px"
        iconHeight="16px"
        textOffset="26px"
        width="158px"
        options={guestOptions}
        showInsetPlaceholder
        onFocus={onInputFocus}
        // ref={(el) => (inputRefs.current[1] = el)}
      />
    </>
  );
};

export default SecondarySearchFields;
