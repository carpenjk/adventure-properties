import { withThemeweaver, variant, value, getBorderColor } from 'themeweaver';
import { breakpoints } from './Media';

export const theme = withThemeweaver(
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
      tertiary: '#CDF7f6',
      action: ['#F6E8E8', '#E5707A'],
      lightText: '#979797',
      mainText: '#444649',
      secondaryText: '#E5707A',
      lightBackground: '#F8F8F8',
      disabledBackground: '#E2E2E2',
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
      paddingLeft: 2,
      minWidth: ['', value('800px')],
      maxWidth: value('1350px'),
    },
    button: {
      ...variant('nav', {
        backgroundColor: 'secondary',
        color: 'action[1]',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        minWidth: value('60px'),
        marginLeft: [0, 0],
        marginRight: [0, 0],
        marginTop: 0,
        marginBottom: 0,
        paddingTop: [4, 0],
        paddingLeft: [4, 4],
        paddingBottom: [4, 0],
        paddingRight: [4, 4],
      }),
      ...variant('menu', {
        color: 'action[1]',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        height: value('50px'),
        width: value('50px'),
      }),
      ...variant('expander', {
        color: 'lightText',
        fontFamily: 'poppins',
        fontSize: 2,
        paddingTop: 2,
        paddingRight: 2,
        paddingBottom: 2,
        paddingLeft: 2,
      }),
      ...variant('search', {
        backgroundColor: 'action[1]',
        color: 'lightBackground',
        fontFamily: 'roboto',
        fontSize: 2,
      }),
      ...variant('signUp', {
        backgroundColor: 'tertiary',
        color: 'primary',
        fontFamily: 'roboto',
        fontSize: 3,
        lineHeight: value('21px'),
      }),
    },
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
    input: {
      ...variant('searchBar', {
        height: value('4rem'),
        marginTop: 1,
        marginRight: [1, 2],
        marginBottom: [1, 1],
        marginLeft: 1,
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    inputGroup: {
      ...variant('searchBar', {
        paddingTop: value('8px'),
      }),
    },
    select: {
      ...variant('searchBar', {
        height: value('4rem'),
        marginTop: 1,
        marginRight: [1, 2],
        marginBottom: [1, 1],
        marginLeft: 1,
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    checkbox: {
      ...variant('searchBar', {
        color: 'lightText',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    date: {
      ...variant('searchBar', {
        height: value('4rem'),
        marginTop: 1,
        marginRight: [1, 2],
        marginBottom: [1, 1],
        marginLeft: 1,
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
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
      ...variant('hover', {
        color: 'action[0]',
        backgroundColor: 'action[0]',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        padding: 6,
      }),
    },
    hero: {
      height: value('81.5vh'),
      borderRadius: 2,
    },
    searchBar: {
      backgroundColor: 'white',
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
      color: 'primary',
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
      color: 'primary',
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
      backgroundColor: 'primary',
    },
    CTA: {
      ...variant('signUp', {
        paddingTop: 4,
        paddingRight: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        border: value('1px solid'),
        borderColor: 'tertiary',
        color: 'tertiary',
        fontFamily: 'poppins',
        lineHeight: value('30px'),
        letterSpacing: value('0.05em'),
      }),
    },
    copyright: {
      fontFamily: 'poppins',
      fontSize: 2,
      lineHeight: value('24px'),
      letterSpacing: value('0.025em'),
      color: 'secondary',
      border: value('1px solid'),
      borderColor: 'secondary',
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
      color: 'tertiary',
    },
    footerNav_item: {
      ...variant('default', {
        fontSize: 2,
        lineHeight: value('40px'),
        letterSpacing: value('0.025em'),
        color: 'tertiary',
      }),
      ...variant('hover', {
        backgroundColor: 'tertiary',
        color: 'primary',
      }),
    },
  }
);

// export default theme;
