import { value, variant } from '@carpenjk/themeweaver';

const inputs = {
  input: {
    ...variant('default', {
      height: value('60px'),
      marginTop: 0,
      marginRight: [0, 0],
      marginBottom: [0, 0],
      marginLeft: 0,
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
    ...variant('searchBar', {
      height: value('60px'),
      marginTop: 0,
      marginRight: [0, 0],
      marginBottom: [0, 0],
      marginLeft: 0,
      color: 'primary[0]',
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
    ...variant('default', {
      height: value('60px'),
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
    ...variant('reservation', {
      height: value('60px'),
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
  },
  checkbox: {
    ...variant('searchBar', {
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
  },
  date: {
    ...variant('searchBar', {
      height: value('60px'),
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
    ...variant('reservation', {
      height: value('60px'),
      minWidth: [value('0'), value('108px')],
      color: 'primary[0]',
      fontSize: 2,
      fontFamily: 'poppins',
    }),
  },
};

export default inputs;
