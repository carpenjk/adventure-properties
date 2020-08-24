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
