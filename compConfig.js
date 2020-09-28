export const NavMenu_config = {
  position: 'right',
  items: [
    { text: 'About', ref: './about' },
    { text: 'Owner', ref: './owner' },
    { text: 'Log In', ref: './logIn' },
    { text: 'Sign Up', ref: './signUp' },
  ],
};

export const NavToggle_config = {
  position: 'center',
  items: [{ text: 'Buy' }, { text: 'Rent' }, { text: 'Long Term' }],
};

export const SearchBar_config = {
  inputs: [
    {
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
    },
    {
      id: 'dateRange',
      type: 'DateRange',
      hideInitialMobile: true,
      focusNext: true,
      startDate: {
        id: 'arriveDate',
        type: 'DateHandler',
        placeholder: 'Arrive',
        icon: {
          url: './static/assets/searchbar/icon/date-range.svg',
          offset: '0.5rem',
        },
        textOffset: '2.6rem',
        width: '12.5rem',
      },
      endDate: {
        id: 'departDate',
        type: 'DateHandler',
        placeholder: 'Depart',
        icon: {
          url: './static/assets/searchbar/icon/date-range.svg',
          offset: '0.5rem',
        },
        textOffset: '2.6rem',
        width: '12.5rem',
      },
    },
    {
      id: 'guests',
      name: 'guests',
      type: 'CustomSelect',
      placeholder: 'Guests',
      focusNext: true,
      icon: {
        url: './static/assets/searchbar/icon/guest.svg',
        offset: '0.5rem',
        width: '1.6rem',
        height: '1.6rem',
      },
      textOffset: '1.8rem',
      width: '15rem',
      hideInitialMobile: true,
      options: [
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
      ],
    },
  ],
};

export const checkFiltersData = [
  {
    title: 'Experience',
    filters: [
      {
        id: 'goodForWork',
        name: 'goodForWork',
        label: 'Good for Work',
        type: 'Checkbox',
      },
      {
        id: 'vacation',
        name: 'vacation',
        label: 'Vacation',
        type: 'Checkbox',
      },
      {
        id: 'mountains',
        name: 'mountains',
        label: 'Mountains',
        type: 'Checkbox',
      },
      {
        id: 'water',
        name: 'water',
        label: 'Water',
        type: 'Checkbox',
      },
      {
        id: 'outdoors',
        name: 'outdoors',
        label: 'Outdoors',
        type: 'Checkbox',
      },
      {
        id: 'green',
        name: 'green',
        label: 'Green',
        type: 'Checkbox',
      },
      {
        id: 'primitive',
        name: 'primitive',
        label: 'Primitive',
        type: 'Checkbox',
      },
      {
        id: 'outdoors2',
        name: 'outdoors2',
        label: 'Outdoors2',
        type: 'Checkbox',
      },
      {
        id: 'outdoors3',
        name: 'outdoors3',
        label: 'Outdoors3',
        type: 'Checkbox',
      },
      {
        id: 'outdoors4',
        name: 'outdoors4',
        label: 'Outdoors4',
        type: 'Checkbox',
      },
    ],
  },
  {
    title: 'Nearby Activities',
    filters: [
      {
        id: 'golf',
        name: 'golf',
        label: 'Golfing',
        type: 'Checkbox',
      },
      {
        id: 'hike',
        name: 'hike',
        label: 'Hiking',
        type: 'Checkbox',
      },
      {
        id: 'ski',
        name: 'ski',
        label: 'Ski/Snowboard',
        type: 'Checkbox',
      },
      {
        id: 'snowshoe',
        name: 'snowshoe',
        label: 'Snowshoeing',
        type: 'Checkbox',
      },
      {
        id: 'fish',
        name: 'fish',
        label: 'Fishing',
        type: 'Checkbox',
      },
      {
        id: 'hunt',
        name: 'hunt',
        label: 'Hunting',
        type: 'Checkbox',
      },
      {
        id: 'boating',
        name: 'boating',
        label: 'Boating',
        type: 'Checkbox',
      },
    ],
  },
  {
    title: 'Property Type',
    filters: [
      {
        id: 'house',
        name: 'house',
        label: 'House',
        type: 'Checkbox',
      },
      {
        id: 'cabin',
        name: 'cabin',
        label: 'Cabin',
        type: 'Checkbox',
      },
      {
        id: 'cottage',
        name: 'cottage',
        label: 'Cottage',
        type: 'Checkbox',
      },
      {
        id: 'townhouse',
        name: 'townhouse',
        label: 'Townhouse',
        type: 'Checkbox',
      },
      {
        id: 'condo',
        name: 'condo',
        label: 'Condo',
        type: 'Checkbox',
      },
    ],
  },
  {
    title: 'Availability',
    filters: [
      {
        id: 'longTerm',
        name: 'longTerm',
        label: 'Long Term',
        type: 'Checkbox',
      },
      {
        id: 'shortTerm',
        name: 'shortTerm',
        label: 'Short Term',
        type: 'Checkbox',
      },
      {
        id: 'allSeasons',
        name: 'allSeasons',
        label: 'All Seasons',
        type: 'Checkbox',
      },
      {
        id: 'summer',
        name: 'summer',
        label: 'Summer',
        type: 'Checkbox',
      },
      {
        id: 'winter',
        name: 'winter',
        label: 'Winter',
        type: 'Checkbox',
      },
      {
        id: 'spring',
        name: 'spring',
        label: 'Spring',
        type: 'Checkbox',
      },
      {
        id: 'fall',
        name: 'fall',
        label: 'Fall',
        type: 'Checkbox',
      },
    ],
  },
];

export const priceFilters = {
  minPrice: {
    id: 'minPrice',
    name: 'minPrice',
    type: 'CustomSelect',
    placeholder: 'Min',
    textOffset: '0',
    width: '13.5rem',
    options: [
      {
        value: '0',
        label: '$0',
        selectedLabel: 'Min: $0',
      },
      {
        value: '100',
        label: '$100',
        selectedLabel: 'Min: $100',
      },
      {
        value: '150',
        label: '$150',
        selectedLabel: 'Min: $150',
      },
      {
        value: '200',
        label: '$200',
        selectedLabel: 'Min: $200',
      },
      {
        value: '250',
        label: '$250',
        selectedLabel: 'Min: $250',
      },
      {
        value: '300',
        label: '$300',
        selectedLabel: 'Min: $300',
      },
      {
        value: '350',
        label: '$350',
        selectedLabel: 'Min: $350',
      },
      {
        value: '400',
        label: '$400',
        selectedLabel: 'Min: $400',
      },
      {
        value: '500',
        label: '$500',
        selectedLabel: 'Min: $500',
      },
      {
        value: '750',
        label: '$750+',
        selectedLabel: 'Min: $750+',
      },
    ],
  },
  maxPrice: {
    id: 'maxPrice',
    name: 'maxPrice',
    type: 'CustomSelect',
    placeholder: 'Max',
    textOffset: '0',
    width: '13.5rem',
    options: [
      {
        value: '0',
        label: '$0',
        selectedLabel: 'Max: $0',
      },
      {
        value: '100',
        label: '$100',
        selectedLabel: 'Max: $100',
      },
      {
        value: '150',
        label: '$150',
        selectedLabel: 'Max: $150',
      },
      {
        value: '200',
        label: '$200',
        selectedLabel: 'Max: $200',
      },
      {
        value: '250',
        label: '$250',
        selectedLabel: 'Max: $250',
      },
      {
        value: '300',
        label: '$300',
        selectedLabel: 'Max: $300',
      },
      {
        value: '350',
        label: '$350',
        selectedLabel: 'Max: $350',
      },
      {
        value: '400',
        label: '$400',
        selectedLabel: 'Max: $400',
      },
      {
        value: '500',
        label: '$500',
        selectedLabel: 'Max: $500',
      },
      {
        value: '750',
        label: '$750+',
        selectedLabel: 'Max: $750+',
      },
    ],
  },
};

export const roomsFilters = {
  bedroom: {
    id: 'beds',
    name: 'beds',
    placeholder: 'Beds',
    type: 'CustomSelect',
    textOffset: '0',
    width: '13.5rem',
    options: [
      {
        value: '1',
        label: '1+',
        selectedLabel: 'Beds: 1+',
      },
      {
        value: '2',
        label: '2+',
        selectedLabel: 'Beds: 2+',
      },
      {
        value: '3',
        label: '3+',
        selectedLabel: 'Beds: 3+',
      },
      {
        value: '4',
        label: '4+',
        selectedLabel: 'Beds: 4+',
      },
      {
        value: '5',
        label: '5+',
        selectedLabel: 'Beds: 5+',
      },
    ],
  },
  bathroom: {
    id: 'baths',
    name: 'baths',
    placeholder: 'Baths',
    type: 'CustomSelect',
    textOffset: '0',
    width: '13.5rem',
    options: [
      {
        value: '1',
        label: '1+',
        selectedLabel: 'Baths: 1+',
      },
      {
        value: '2',
        label: '2+',
        selectedLabel: 'Baths: 2+',
      },
      {
        value: '3',
        label: '3+',
        selectedLabel: 'Baths: 3+',
      },
      {
        value: '4',
        label: '4+',
        selectedLabel: 'Baths: 4+',
      },
      {
        value: '5',
        label: '5+',
        selectedLabel: 'Baths: 5+',
      },
    ],
  },
};
