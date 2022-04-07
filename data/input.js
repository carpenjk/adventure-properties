export const startDateProps = {
  id: 'arriveDate',
  name: 'arriveDate',
  placeholder: { value: 'Arrive', translateX: '-21px', translateY: '-18px' },
  icon: {
    url: '/static/assets/searchbar/icon/date-range.svg',
    offset: '5px',
  },
  textOffset: '26px',
  width: '125px',
};

export const endDateProps = {
  id: 'departDate',
  name: 'departDate',
  placeholder: { value: 'Depart', translateX: '-21px', translateY: '-18px' },
  icon: {
    url: '/static/assets/searchbar/icon/date-range.svg',
    offset: '5px',
  },
  textOffset: '26px',
  width: '125px',
};

export const guestOptions = [
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
    selectedLabel: '10+ Guests',
  },
];

export const checkFiltersData = [
  {
    title: 'Experience',
    name: 'experience',
    checkboxes: [
      {
        id: 'goodForWork',
        name: 'goodForWork',
        label: 'Good For Work',
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
    title: 'Property Type',
    name: 'propertyType',
    checkboxes: [
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
    name: 'availability',
    checkboxes: [
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
  {
    title: 'Amenities',
    name: 'amenities',
    checkboxes: [
      {
        id: 'airConditioning',
        name: 'airConditioning',
        label: 'Air Conditioning',
        type: 'Checkbox',
      },
      {
        id: 'heating',
        name: 'heating',
        label: 'Heating',
        type: 'Checkbox',
      },
      {
        id: 'hotTub',
        name: 'hotTub',
        label: 'Hot Tub',
        type: 'Checkbox',
      },
      {
        id: 'fireplace',
        name: 'fireplace',
        label: 'Fireplace',
        type: 'Checkbox',
      },
      {
        id: 'fullyFurnished',
        name: 'fullyFurnished',
        label: 'Fully Furnished',
        type: 'Checkbox',
      },
      {
        id: 'washer',
        name: 'washer',
        label: 'Washer',
        type: 'Checkbox',
      },
      {
        id: 'dryer',
        name: 'dryer',
        label: 'Dryer',
        type: 'Checkbox',
      },
    ],
  },
  {
    title: 'Access',
    name: 'access',
    checkboxes: [
      {
        id: 'beachfront',
        name: 'beachfront',
        label: 'Beachfront',
        type: 'Checkbox',
      },
      {
        id: 'waterfront',
        name: 'waterfront',
        label: 'Waterfront',
        type: 'Checkbox',
      },
      {
        id: 'skiInSkiOut',
        name: 'skiInSkiOut',
        label: 'Ski-in/ski-out',
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
    placeholder: {
      value: 'Min',
      translateX: '0px',
      translateY: '-18px',
    },
    textOffset: '5px',
    width: '13.5rem',
    options: [
      {
        value: '0',
        label: '$0',
        selectedLabel: '$0',
      },
      {
        value: '100',
        label: '$100',
        selectedLabel: '$100',
      },
      {
        value: '150',
        label: '$150',
        selectedLabel: '$150',
      },
      {
        value: '200',
        label: '$200',
        selectedLabel: '$200',
      },
      {
        value: '250',
        label: '$250',
        selectedLabel: '$250',
      },
      {
        value: '300',
        label: '$300',
        selectedLabel: '$300',
      },
      {
        value: '350',
        label: '$350',
        selectedLabel: '$350',
      },
      {
        value: '400',
        label: '$400',
        selectedLabel: '$400',
      },
      {
        value: '500',
        label: '$500',
        selectedLabel: '$500',
      },
      {
        value: '750',
        label: '$750+',
        selectedLabel: '$750+',
      },
    ],
  },
  maxPrice: {
    id: 'maxPrice',
    name: 'maxPrice',
    type: 'CustomSelect',
    placeholder: {
      value: 'Max',
      translateX: '0px',
      translateY: '-18px',
    },
    textOffset: '5px',
    width: '13.5rem',
    options: [
      {
        value: '0',
        label: '$0',
        selectedLabel: '$0',
      },
      {
        value: '100',
        label: '$100',
        selectedLabel: '$100',
      },
      {
        value: '150',
        label: '$150',
        selectedLabel: '$150',
      },
      {
        value: '200',
        label: '$200',
        selectedLabel: '$200',
      },
      {
        value: '250',
        label: '$250',
        selectedLabel: '$250',
      },
      {
        value: '300',
        label: '$300',
        selectedLabel: '$300',
      },
      {
        value: '350',
        label: '$350',
        selectedLabel: '$350',
      },
      {
        value: '400',
        label: '$400',
        selectedLabel: '$400',
      },
      {
        value: '500',
        label: '$500',
        selectedLabel: '$500',
      },
      {
        value: '750',
        label: '$750+',
        selectedLabel: '$750+',
      },
    ],
  },
};

export const roomsFilters = {
  bedroom: {
    id: 'beds',
    name: 'beds',
    placeholder: {
      value: 'Beds',
      translateX: '0px',
      translateY: '-18px',
    },
    type: 'CustomSelect',
    textOffset: '5px',
    width: '13.5rem',
    options: [
      {
        value: '1',
        label: '1',
        selectedLabel: '1',
      },
      {
        value: '2',
        label: '2',
        selectedLabel: '2',
      },
      {
        value: '3',
        label: '3',
        selectedLabel: '3',
      },
      {
        value: '4',
        label: '4',
        selectedLabel: '4',
      },
      {
        value: '5',
        label: '5+',
        selectedLabel: '5+',
      },
    ],
  },
  bathroom: {
    id: 'baths',
    name: 'baths',
    placeholder: {
      value: 'Baths',
      translateX: '0px',
      translateY: '-18px',
    },
    type: 'CustomSelect',
    textOffset: '5px',
    width: '13.5rem',
    options: [
      {
        value: '1',
        label: '1',
        selectedLabel: '1',
      },
      {
        value: '2',
        label: '2',
        selectedLabel: '2',
      },
      {
        value: '3',
        label: '3',
        selectedLabel: '3',
      },
      {
        value: '4',
        label: '4',
        selectedLabel: '4',
      },
      {
        value: '5',
        label: '5+',
        selectedLabel: '5+',
      },
    ],
  },
};
