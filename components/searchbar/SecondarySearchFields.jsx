import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FormikDateRange, FormikSelect } from '@carpenjk/base/input';
import { gtDateOnly, isNotPast } from '@carpenjk/date-utils';
import { startDateProps, endDateProps, guestOptions } from '../../data/input';
import 'react-datepicker/dist/react-datepicker.css';

const SecondarySearchFields = (props) => {
  const {
    onInputFocus,
    inputRefs,
    searchBarRef,
    searchState: { isSearchBarFocused, values },
  } = props;

  const theme = useContext(ThemeContext);

  return (
    <>
      <FormikDateRange
        tw={{ variant: 'searchBar' }}
        key="dateRange"
        values={values}
        filterStartDate={(dt) => isNotPast(dt)}
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
        icon="/static/assets/searchbar/icon/guest.svg"
        iconOffset="5px"
        iconWidth="16px"
        iconHeight="16px"
        textOffset="26px"
        width={['100%', '158px']}
        options={guestOptions}
        showInsetPlaceholder
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[1] = el)}
      />
    </>
  );
};

export default SecondarySearchFields;
