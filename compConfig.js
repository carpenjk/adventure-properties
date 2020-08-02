export const NavMenu_config = {
  position: 'right',
  items: [
    { text: 'About', ref: './about' },
    { text: 'Owner', ref: './owner' },
    { text: 'Log In', ref: './logIn' },
    { text: 'Sign Up', ref: './signUp' }
  ]
};

export const NavToggle_config = {
  position: 'center',
  items: [{ text: 'Buy' }, { text: 'Rent' }, { text: 'Long Term' }]
};

export const SearchBar_config = {
  inputs: [
    {
      id: 'dest',
      type: 'input',
      placeholder: 'Enter a destinaton or activity',
      icon: {
        url: './static/assets/searchbar/icon/location.svg',
        offset: '0.5rem'
      },
      textOffset: '2.7rem',
      width: '33.2rem'
    },
    {
      id: 'arrive',
      type: 'input',
      placeholder: 'Arrive',
      icon: {
        url: './static/assets/searchbar/icon/date-range.svg',
        offset: '0.5rem'
      },
      textOffset: '2.6rem',
      width: '12.5rem'
    },
    {
      id: 'arrive',
      type: 'input',
      placeholder: 'Arrive',
      icon: {
        url: './static/assets/searchbar/icon/date-range.svg',
        offset: '0.5rem'
      },
      textOffset: '2.6rem',
      width: '12.5rem'
    },
    {
      id: 'guests',
      type: 'input',
      placeholder: 'Guests',
      icon: {
        url: './static/assets/searchbar/icon/guest.svg',
        offset: '0.5rem'
      },
      textOffset: '2.6rem',
      width: '9.1rem'
    }
  ]
};
