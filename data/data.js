import MobileNavList from '../components/navbar/MobileNavList';
import AccountMenuItems from '../components/navbar/AccountMenuItems';

export const navData = {
  nav: {
    props: {
      logo: '/static/assets/LogoMain.svg',
      logoUrl: '/',
    },
    items: [
      {
        Component: MobileNavList,
        key: 'mobileNavList',
        props: {},
        items: [
          {
            key: 'about',
            text: 'About',
            link: './about',
          },
        ],
      },
      {
        Component: AccountMenuItems,
        key: 'accountMenuItems',
      },
    ],
  },
};

export const slider1Data = {
  items: [
    {
      key: 'skiing1',
      title: '1 Bdr With Amazing Views',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere dolorem voluptatem iure. Corrupti architecto distinctio autem. Dicta consequuntur natus possimus quia libero, recusandae laborum blanditiis, quaerat ipsa quisquam deleniti dolorem? Laudantium inventore accusamus natus enim dignissimos vero est atque libero!',
      location: 'Sugarloaf, ME',
      price: '239',
      maxGuests: 2,
      beds: 1,
      baths: 1,
      propertyType: 'Cabin',
      nearbyActivities: [
        'Skiing',
        'Snowshoeing',
        'Birding',
        'Snowmobiling',
        'Hiking',
      ],
      currSymbol: '$',
      unit: 'night',
    },
    {
      key: 'skiing2',
      title: '2 Bdr With Amazing Views',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere dolorem voluptatem iure. Corrupti architecto distinctio autem. Dicta consequuntur natus possimus quia libero, recusandae laborum blanditiis, quaerat ipsa quisquam deleniti dolorem? Laudantium inventore accusamus natus enim dignissimos vero est atque libero!',
      location: 'Sugarloaf, ME',
      price: '239',
      maxGuests: 2,
      beds: 2,
      baths: 1,
      propertyType: 'Cabin',
      nearbyActivities: [
        'Skiing',
        'Snowshoeing',
        'Birding',
        'Snowmobiling',
        'Hiking',
      ],
      currSymbol: '$',
      unit: 'night',
    },
    {
      key: 'skiing3',
      title: '3 Bdr With Amazing Views',
      description: 'this is a description of the property',
      location: 'Sugarloaf, ME',
      price: '239',
      maxGuests: 2,
      beds: 3,
      baths: 1,
      propertyType: 'Cabin',
      nearbyActivities: [
        'Skiing',
        'Snowshoeing',
        'Birding',
        'Snowmobiling',
        'Hiking',
      ],
      currSymbol: '$',
      unit: 'night',
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
