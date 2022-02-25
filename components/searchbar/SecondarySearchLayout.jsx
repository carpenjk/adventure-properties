import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import DateRange from './DateRange';
import CustomSelect from '../base/input/CustomSelect';
import { startDateProps, endDateProps, guestOptions } from '../../data/input';

const SecondarySearchLayout = (props) => {
  const {
    valueFunctions,
    onInputFocus,
    inputRefs,
    searchBarRef,
    isSearchBarFocused,
  } = props;
  const theme = useContext(ThemeContext);

  return (
    <>
      <DateRange
        tw={{ variant: 'searchBar' }}
        key="dateRange"
        startProps={startDateProps}
        endProps={endDateProps}
        valueFunctions={valueFunctions}
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[0] = el)}
        popperParent={searchBarRef}
        forceClose={!isSearchBarFocused}
        showInsetPlaceholder
      />
      <CustomSelect
        theme={theme}
        key="guests"
        innerKey="guestsSelect"
        id="guests"
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
        placeholderColor={theme.colors.lightText}
        options={guestOptions}
        valueFunctions={valueFunctions}
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[1] = el)}
      />
    </>
  );
};

export default SecondarySearchLayout;
