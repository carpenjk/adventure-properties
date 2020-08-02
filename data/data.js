import NavToggle from '../components/NavToggle';
import NavList from '../components/NavList';

export const navData = {
  nav: {
    props: {
      logo: '../static/assets/LogoMain.svg',
    },
    items: [
      {
        Component: NavToggle,
        key: 'comp2',
        props: {
          displayVertical: [true, false],
          maxWidth: 'none',
          itemMinWidth: 'none',
        },
        items: [
          { key: 'buyToggle', text: 'Buy' },
          { key: 'rentToggle', text: 'Rent' },
          { key: 'longTermToggle', text: 'Long Term' },
        ],
      },
      {
        Component: NavList,
        key: 'comp1',
        props: {
          maxWidth: 'none',
          itemMinWidth: '75px',
        },
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
