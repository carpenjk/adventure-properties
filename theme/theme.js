import { withThemeweaver } from '@carpenjk/themeweaver';
import { breakpoints } from '../Media';
import buttons from './themes/buttons';
import features from './themes/features';
import footer from './themes/footer';
import globals from './themes/globals';
import h1 from './themes/h1';
import header from './themes/header';
import hero from './themes/hero';
import inputs from './themes/inputs';
import nav from './themes/nav';
import property from './themes/property';
import reservations from './themes/reservations';
import results from './themes/results';
import searchbar from './themes/searchbar';
import sections from './themes/sections';

export const theme = withThemeweaver(
  {
    colors: {
      primary: ['#696f92', '#C6D8FF'],
      _secondary: '#C6D8FF',
      secondary: '#047F5E',
      tertiary: '#FEFDEC',
      action: ['#FCEEEF', '#E5707A', '#F3B9BD'],
      link: ['#5D71BA', '#344783'],
      lightText: '#767676',
      mainText: '#444649',
      bannerText: '#047F5E',
      secondaryText: '#D53D5A',
      // secondaryText: '#E5707A',
      heading: ['#444649', '#696f92', '#344783'],
      lightButton: '#F8F8F8',
      lightBackground: '#F6FEFF',
      disabledBackground: '#909090',
      white: '#ffffff',
    },
    fonts: {
      poppins: "'Poppins', sans-serif",
      roboto: "'Roboto', sans-serif",
      openSans: "'Open Sans', sans-serif",
      raleway: "'Raleway', sans-serif",
    },
    fontSizes: [10, 12, 14, 18, 24, 32],
    fontWeights: {
      regular: 400,
      bold: 700,
    },
    sizes: [0, '100%', 80],
    space: [0, 4, 8, 16, 20, 32, 64],
    transitions: {
      down: 'transform 0.5s ease-in',
      left: 'left 500ms ease',
      right: 'right 500ms ease',
      colorBig: 'color 500ms ease',
      padding: 'padding 500ms ease',
    },
    breakpoints,
  },
  {
    // beginning of themeweaver asignments *****************
    ...globals,
    ...buttons,
    ...h1,
    ...inputs,
    ...nav,
    ...sections,
    ...header,
    ...hero,
    ...searchbar,
    ...features,
    ...reservations,
    ...results,
    ...property,
    ...footer,
  }
);
