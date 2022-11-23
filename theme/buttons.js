import { value, variant } from '@carpenjk/themeweaver';

const buttons = {
  button: {
    ...variant('nav', {
      // backgroundColor: 'secondary',
      color: 'action[1]',
      fontFamily: 'poppins',
      fontSize: 4,
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
    ...variant('nav_hover', {
      // color: 'action[0]',
      color: 'white',
      backgroundColor: 'action[1]',
    }),
    ...variant('user', {
      width: value('100%'),
      backgroundColor: 'primary[0]',
      color: 'white',
      border: value('2px solid'),
      borderColor: 'primary[0]',
      fontFamily: 'poppins',
      fontSize: 4,
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
    ...variant('user_hover', {
      backgroundColor: 'white',
      color: 'primary[0]',
      border: value('2px solid'),
      borderColor: 'primary[1]',
    }),
    ...variant('user_focus', {
      backgroundColor: 'white',
      color: 'primary[0]',
      border: value('2px solid'),
      borderColor: 'primary[1]',
    }),
    ...variant('nav-footer', {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      fontFamily: 'poppins',
      fontSize: 2,
      lineHeight: value('24px'),
      letterSpacing: value('0.025em'),
      color: 'tertiary',
      border: value('1px solid'),
      borderColor: 'tertiary',
    }),
    ...variant('nav-footer_hover', {
      color: 'tertiary',
      backgroundColor: 'primary[0]',
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
    ...variant('reserve', {
      backgroundColor: 'secondary',
      borderColor: 'secondary',
      color: 'white',
      fontFamily: 'roboto',
      fontSize: [value('16px'), 3],
      paddingLeft: [value('1.5em'), value('2em')],
      paddingRight: [value('1.5em'), value('2em')],
    }),
    ...variant('reserve_hover', {
      backgroundColor: 'white',
      borderColor: 'secondary',
      color: 'secondary',
    }),
    ...variant('login', {
      backgroundColor: 'action[1]',
      color: 'lightBackground',
      fontFamily: 'roboto',
      fontSize: [3, 3],
      paddingLeft: [value('1.5em', value('2em'))],
      paddingRight: [value('1.5em', value('2em'))],
    }),
    ...variant('search', {
      backgroundColor: 'action[1]',
      color: 'lightBackground',
      fontFamily: 'roboto',
      fontSize: 2,
    }),
    ...variant('search-hover', {
      backgroundColor: 'action[1]',
      color: 'lightBackground',
      transform: value('scale(1.04)'),
    }),
    ...variant('signUp', {
      backgroundColor: 'tertiary',
      color: 'primary[0]',
      fontFamily: 'roboto',
      fontSize: 3,
      lineHeight: value('21px'),
    }),
    ...variant('contentNav', {
      backgroundColor: 'white',
      border: value('3px solid'),
      borderColor: value('#cdf7f6'),
      color: 'lightText',
      fontFamily: 'poppins',
      fontSize: [2, 3],
      fontWeight: 'bold',
      lineHeight: value('150%'),
      letterSpacing: value('0.025em'),
      paddingTop: [2, 2],
      paddingLeft: [2, 2],
      paddingBottom: [2, 2],
      paddingRight: [2, 2],
    }),
    ...variant('contentNav_hover', {
      color: 'white',
      backgroundColor: 'lightText',
      border: value('3px solid'),
      // borderColor: value('#f3b9bd'),
      borderColor: 'lightText',
    }),
    ...variant('contentNav_isActive', {
      backgroundColor: 'white',
      color: 'secondaryText',
      border: value('3px solid'),
      // borderColor: value('#f3b9bd'),
      borderColor: 'action[1]',
    }),
    ...variant('contentNav_isDisabled', {
      backgroundColor: 'white',
      border: value('3px solid '),
      borderColor: value('#cdf7f6'),
      color: 'lightText',
    }),
  },
};

export default buttons;
