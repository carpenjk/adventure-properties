import { variant } from '@carpenjk/themeweaver';

export default {
  reservations: {
    ...variant('default', {
      paddingTop: 3,
      paddingRight: [3, 5],
      paddingBottom: 3,
      paddingLeft: [3, 5],
      backgroundColor: 'lightBackground',
    }),
  },
};
