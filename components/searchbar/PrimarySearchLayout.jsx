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
        placeholder="Enter a destination or activity"
        name="destination"
        valueFunctions={valueFunctions}
        textOffset="2.6rem"
        icon="./static/assets/searchbar/icon/location.svg"
        iconOffset="0.5rem"
        width={['100%', '33.2rem']}
        input={searchProps}
        onFocus={onInputFocus}
        inputRef={(el) => (inputRefs.current[0] = el)}
        nextFocusRef={
          searchProps.focusNext ? inputRefs.current[index + 1] : undefined
        }
        height="4rem" //! refactor? Set height of React-Select objects to match input styling:
      />
    </>
  );
};

export default PrimarySearchLayout;
