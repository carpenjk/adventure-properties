import NavToggle from '../components/NavToggle';
import NavList from '../components/NavList';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/searchbar/SearchBar';
import HeroContainer from '../components/HeroContainer';

export const navData = {
  nav: {
    props: {
      logo: '../static/assets/LogoMain.svg',
    },
    items: [
      {
        Component: NavToggle,
        key: 'navToggle',
        props: {
          displayVertical: [true, false],
        },
        items: [
          { key: 'buyToggle', text: 'Buy' },
          { key: 'rentToggle', text: 'Rent' },
          { key: 'longTermToggle', text: 'Long Term' },
        ],
      },
      {
        Component: NavList,
        key: 'navList',
        props: {},
        items: [
          {
            key: 'about',
            text: 'About',
            link: './about',
          },
          {
            key: 'owner',
            text: 'Owner',
            link: './owner',
          },
          {
            key: 'logIn',
            text: 'Log In',
            link: './logIn',
          },
          {
            key: 'signUp',
            text: 'Sign Up',
            link: './signUp',
          },
        ],
      },
    ],
  },
};

export const heroData = {
  hero: {
    Component: HeroContainer,
    props: {
      offsetTop: '80px',
      backgroundImage: '../static/assets/lofoten-2220461.png',
    },
    items: [
      {
        Component: HeroBanner,
        key: 'herobanner',
        Layout: undefined,
        props: { prop1: 'value' },
      },
      {
        Component: SearchBar,
        key: 'searchbar',
        Layout: undefined,
        props: { prop1: 'value' },
      },
    ],
  },
};

export const slider1Data = {
  items: [
    {
      key: 'skiing1',
      heading: '1 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 1,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing2',
      heading: '2 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 2,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing3',
      heading: '3 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 3,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing4',
      heading: '4 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 4,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing5',
      heading: '5 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 5,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing6',
      heading: '6 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 6,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing7',
      heading: '7 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 7,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing8',
      heading: '8 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 8,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
    {
      key: 'skiing9',
      heading: '9 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '$239',
      maxGuests: 2,
      beds: 9,
      baths: 1,
      propertyType: 'Cabin',
      tags: ['Skiing', 'Snowshoeing', 'Birding', 'Snowmobiling', 'Hiking'],
    },
  ],
};
