import { withThemeWeaver, variant, value } from 'themeweaver';

export const theme = withThemeWeaver(
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
    },
    nav: {
      ...variant('main', {
        backgroundColor: 'secondary',
        height: value('50px'),
        width: value('50px'),
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        transition: { top: 'down', left: 'left' },
        minHeight: value('80px'),
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
  }
);

export default theme;
