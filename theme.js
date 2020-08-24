import { withThemeweaver, variant, value } from 'themeweaver';

export const theme = withThemeweaver(
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
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
    breakpoints: ['40em', '52em', '64em', '80em'],
  },
  {
    // beginning of themeweaver asignments *****************
    document: {
      paddingLeft: 2,
      paddingRight: 2,
    },
    content: {
      paddingLeft: 2,
    },
    button: {
      ...variant('nav', {
        backgroundColor: 'secondary',
        color: 'action[1]',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        minWidth: value('60px'),
        marginLeft: [0, 2],
        marginRight: [0, 2],
        marginTop: 0,
        marginBottom: 0,
        paddingTop: [4, 0],
        paddingLeft: [4, 0],
        paddingBottom: [4, 0],
        paddingRight: [4, 0],
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
      }),
      ...variant('search', {
        backgroundColor: 'action[1]',
        color: 'lightBackground',
        fontFamily: 'roboto',
        fontSize: 2,
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
        marginRight: [0, 3],
        marginBottom: [2, 0],
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    select: {
      ...variant('searchBar', {
        marginRight: [0, 3],
        marginBottom: [2, 0],
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    checkbox: {
      ...variant('searchBar', {
        color: 'lightText',
        fontSize: 2,
      }),
    },
    date: {
      ...variant('searchBar', {
        marginRight: [0, 3],
        marginBottom: [2, 0],
        color: 'primary',
        fontSize: 2,
        fontFamily: 'poppins',
      }),
    },
    nav: {
      ...variant('main', {
        backgroundColor: 'secondary',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        transition: { top: 'down', left: 'left' },
        minHeight: value('80px'),
        paddingLeft: 2,
        paddingRight: 2,
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
    },
    searchBar: {
      backgroundColor: 'white',
      width: [value('95vw'), value('auto')],
      maxWidth: [value('500px'), value('none')],
      borderRadius: 2,
      paddingTop: [2, 1],
      paddingRight: 1,
      paddingBottom: [2, 1],
      paddingLeft: 1,
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
  }
);

// export default theme;
