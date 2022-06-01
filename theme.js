import { withThemeweaver, variant, value } from 'themeweaver';
import { breakpoints } from './Media';
import buttons from './theme/buttons';
import inputs from './theme/inputs';

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
      down: 'top 500ms ease-in-out',
      left: 'left 500ms ease',
      right: 'right 500ms ease',
      colorBig: 'color 500ms ease',
      padding: 'padding 500ms ease',
    },
    breakpoints,
  },
  {
    // beginning of themeweaver asignments *****************
    document: {
      paddingLeft: 2,
      paddingRight: 2,
    },
    content: {
      ...variant('default', {
        minWidth: ['', value('800px')],
        maxWidth: value('1080px'),
      }),
      ...variant('property', {
        minWidth: ['', value('800px')],
        maxWidth: value('1200px'),
      }),
      ...variant('reserve', {
        maxWidth: [value('532px'), value('532px')],
      }),
    },
    ...buttons,
    h1: {
      ...variant('searchBar', {
        color: 'mainText',
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 3,
        lineHeight: value('150%'),
        letterSpacing: value('0.025em'),
        marginBottom: 3,
      }),
    },
    ...inputs,
    nav: {
      ...variant('main', {
        backgroundColor: 'white',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        transition: { top: 'down', left: 'left' },
        minHeight: value('80px'),
        paddingLeft: [0, 2],
        paddingRight: 0,
      }),
    },
    section: {
      ...variant('hero', {
        borderRadius: 2,
      }),
      ...variant('footer', {
        width: value('100vw'),
        backgroundColor: 'primary[0]',
      }),
      ...variant('features', {
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
        backgroundColor: 'white',
      }),
      ...variant('reservations', {
        paddingTop: 3,
        paddingRight: [3, 5],
        paddingBottom: 3,
        paddingLeft: [3, 5],
      }),
      ...variant('property_images', {}),
      ...variant('property_details', {}),
    },
    header: {
      backgroundColor: 'white',
    },
    hero: {
      height: [value('68.5vh'), value('76vh')],
      borderRadius: 2,
    },
    searchBar: {
      backgroundColor: 'lightBackground',
      width: [value('90vw'), value('auto')],
      maxWidth: [value('500px'), value('none')],
      borderRadius: 2,
      paddingTop: [2, 2],
      paddingRight: [2, 2],
      paddingBottom: [2, 2],
      paddingLeft: [2, 2],
    },
    searchBar_container: {
      ...variant('buttons', {
        paddingTop: 4,
        paddingRight: 2,
        paddingBottom: 4,
        paddingLeft: 2,
      }),
      ...variant('filterGroup', {
        marginTop: 5,
        paddingBottom: 3,
      }),
      ...variant('filter', {
        marginBottom: 2,
        marginRight: [0, 3],
      }),
    },
    features: {
      ...variant('default', {
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
        backgroundColor: 'white',
      }),
    },
    reservations: {
      ...variant('default', {
        paddingTop: 3,
        paddingRight: [3, 5],
        paddingBottom: 3,
        paddingLeft: [3, 5],
        backgroundColor: 'lightBackground',
      }),
    },
    results: {
      ...variant('default', {
        paddingTop: 5,
        paddingBottom: 5,
      }),
    },
    results_item: {
      maxWidth: value('466px'),
    },
    results_footer: {
      color: 'primary[0]',
      fontFamily: 'raleway',
      fontSize: 3,
      fontWeight: 'bold',
    },
    results_header: {
      color: 'action[1]',
      fontFamily: 'poppins',
      fontSize: 4,
      fontWeight: 'bold',
      letterSpacing: value('0.05em'),
      paddingTop: 3,
      paddingBottom: 3,
    },
    results_topic: {
      color: 'primary[0]',
    },
    property_description: {
      color: 'mainText',
      fontFamily: 'openSans',
      fontSize: 2,
      lineHeight: value('150%'),
      letterSpacing: value('0.025em'),
      paddingTop: 5,
      paddingRight: 5,
      paddingBottom: 5,
      paddingLeft: 5,
    },
    footer: {
      paddingTop: 2,
      paddingRight: 3,
      paddingBottom: 2,
      paddingLeft: 3,
      backgroundColor: 'primary[0]',
    },
    footerNav: {
      fontFamily: 'poppins',

      width: ['', value('80%')],
      minWidth: ['', value('800px')],
      maxWidth: ['', value('1200px')],
    },
    footerNav_group: {
      paddingTop: 3,
      paddingRight: 3,
      paddingBottom: 3,
      paddingLeft: 3,
    },
    footerNav_header: {
      fontSize: 4,
      lineHeight: value('32px'),
      letterSpacing: value('0.025em'),
      color: 'primary'[0],
    },
    footerNav_item: {
      ...variant('default', {
        fontSize: 2,
        lineHeight: value('40px'),
        letterSpacing: value('0.025em'),
        color: 'primary[0]',
      }),
      ...variant('hover', {
        backgroundColor: 'tertiary',
        color: 'primary[0]',
      }),
    },
  }
);

// export default theme;
