import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import DateRange from './DateRange';
import CustomSelect from '../base/input/CustomSelect';

const startDate = {
  id: 'arriveDate',
  placeholder: 'Arrive',
  icon: {
    url: './static/assets/searchbar/icon/date-range.svg',
    offset: '0.5rem',
  },
  textOffset: '2.6rem',
  width: '12.5rem',
};

const endDate = {
  id: 'departDate',
  placeholder: 'Depart',
  icon: {
    url: './static/assets/searchbar/icon/date-range.svg',
    offset: '0.5rem',
  },
  textOffset: '2.6rem',
  width: '12.5rem',
};

const guestOptions = [
  {
    value: '1',
    label: '1',
    selectedLabel: '1 Guest',
  },
  {
    value: '2',
    label: '2',
    selectedLabel: '2 Guests',
  },
  {
    value: '3',
    label: '3',
    selectedLabel: '3 Guests',
  },
  {
    value: '4',
    label: '4',
    selectedLabel: '4 Guests',
  },
  {
    value: '5',
    label: '5',
    selectedLabel: '5 Guests',
  },
  {
    value: '6',
    label: '6',
    selectedLabel: '6 Guests',
  },
  {
    value: '7',
    label: '7',
    selectedLabel: '7 Guests',
  },
  {
    value: '8',
    label: '8',
    selectedLabel: '8 Guests',
  },
  {
    value: '9',
    label: '9',
    selectedLabel: '9 Guests',
  },
  {
    value: '10',
    label: '10+',
    selectedLabel: '2 Guests',
  },
];

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
        variant="searchBar"
        key="dateRange"
        startProps={startDate}
        endProps={endDate}
        valueFunctions={valueFunctions}
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[0] = el)}
        focusNext
        nextFocusRef={inputRefs.current[1]}
        popperParent={searchBarRef}
        forceClose={!isSearchBarFocused}
      />
      <CustomSelect
        variant="searchBar"
        theme={theme}
        key="guests"
        innerKey="guestsSelect"
        id="guests"
        placeholder="Guests"
        focusNext={false}
        icon="./static/assets/searchbar/icon/guest.svg"
        iconOffset="0.5rem"
        iconWidth="1.6rem"
        iconHeight="1.6rem"
        textOffset="1.8rem"
        width="15rem"
        placeholderColor={theme.colors.lightText}
        options={guestOptions}
        valueFunctions={valueFunctions}
        onFocus={onInputFocus}
        ref={(el) => (inputRefs.current[1] = el)}
        nextFocusRef={false}
        height="4rem" //! refactor? Set height of React-Select objects to match input styling:
      />
    </>
  );
};

export default SecondarySearchLayout;
