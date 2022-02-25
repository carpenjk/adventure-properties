import InputBase from '../base/input/InputBase';

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

const PrimarySearchLayout = (props) => {
  const { valueFunctions, onInputFocus, inputRefs } = props;
  return (
    <>
      <InputBase
        key="destination"
        id="destination"
        tw={{ semKey: 'input', variant: 'searchBar' }}
        name="destination"
        placeholder={{
          value: 'Destination',
          translateX: '-21px',
          translateY: '-18px',
        }}
        valueFunctions={valueFunctions}
        textOffset="26px"
        icon="./static/assets/searchbar/icon/location.svg"
        iconOffset="5px"
        width={['100%', '340px']}
        input={searchProps}
        onFocus={onInputFocus}
        showInsetPlaceholder
        ref={(el) => (inputRefs.current[0] = el)}
      />
    </>
  );
};

export default PrimarySearchLayout;
