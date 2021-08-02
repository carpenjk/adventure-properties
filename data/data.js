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
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere dolorem voluptatem iure. Corrupti architecto distinctio autem. Dicta consequuntur natus possimus quia libero, recusandae laborum blanditiis, quaerat ipsa quisquam deleniti dolorem? Laudantium inventore accusamus natus enim dignissimos vero est atque libero!',
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
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ipsa, inventore iure tempora vero fugit enim cumque quae quos cupiditate id et placeat ipsam veritatis voluptate qui adipisci architecto molestiae facere veniam. A voluptates esse repellendus optio molestiae autem accusamus, saepe beatae, ducimus voluptatem impedit nisi provident enim corporis facere. Harum tenetur sequi ut nesciunt dolor, veritatis enim numquam corporis.',
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
  ],
};

export const footerNavData = [
  {
    name: 'Buyers',
    items: [
      {
        text: 'Top Available Properties',
        link: '/about',
      },
      {
        text: 'Most Affordable Properties',
        link: '/about',
      },
      {
        text: 'Mountain Properties',
        link: '/about',
      },
      {
        text: 'Ocean Properties',
        link: '/about',
      },
      {
        text: 'Primitive Properties',
        link: '/about',
      },
      {
        text: 'Top Investment Properties',
        link: '/about',
      },
    ],
  },
  {
    name: 'Renters',
    items: [
      {
        text: 'Top Available Getaways',
        link: '/about',
      },
      {
        text: 'Long Term and Seasonal Rentals',
        link: '/about',
      },
      {
        text: 'Mountain Rentals',
        link: '/about',
      },
      {
        text: 'Ocean Rentals',
        link: '/about',
      },
      {
        text: 'Primitive Rentals',
        link: '/about',
      },
      {
        text: 'Properties by Nearby Activities',
        link: '/about',
      },
    ],
  },
  {
    name: 'Owners',
    items: [
      {
        text: 'View/Set My Property Availability',
        link: '/about',
      },
      {
        text: 'Manage My Property',
        link: '/about',
      },
    ],
  },
  {
    name: 'Company',
    items: [
      {
        text: 'About',
        link: '/about',
      },
      {
        text: 'Contact Us',
        link: '/about',
      },
    ],
  },
];
