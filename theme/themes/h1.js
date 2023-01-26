import { variant, value } from '@carpenjk/themeweaver';

export default {
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
};
