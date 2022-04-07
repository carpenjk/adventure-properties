import LocationInput from '../base/input/LocationInput';

const searchProps = {
  id: 'destination',
  type: 'InputBase',
  placeholder: 'Enter a destinaton or activity',
  icon: {
    url: './static/assets/searchbar/icon/location.svg',
    offset: '0.5rem',
  },
  textOffset: '2.7rem',
  width: '33.2rem',
  hideInitialMobile: false,
  focusNext: false,
};

const PrimarySearchFields = (props) => {
  const {
    onInputFocus,
    inputRefs,
    isSearchBarFocused,
    currentInputElement,
  } = props;

  function getInputRef() {
    if (inputRefs && inputRefs.current && inputRefs.current[0]) {
      return inputRefs.current[0].inputRef.current;
    }
  }

  return (
    <>
      <LocationInput
        key="destination"
        id="destination"
        name="destination"
        tw={{ semKey: 'input', variant: 'searchBar' }}
        placeholder={{
          value: 'Destination',
          translateX: '-21px',
          translateY: '-18px',
        }}
        textOffset="26px"
        icon="./static/assets/searchbar/icon/location.svg"
        iconOffset="5px"
        width={['100%', '340px']}
        autoCompleteWidth="100%"
        autoCompleteOptions={{
          autoCompleteWidth: '100%',
          forceClose:
            !isSearchBarFocused || currentInputElement !== getInputRef(),
        }}
        input={searchProps}
        onFocus={onInputFocus}
        showInsetPlaceholder
        ref={(el) => (inputRefs.current[0] = el)}
      />
    </>
  );
};

export default PrimarySearchFields;
