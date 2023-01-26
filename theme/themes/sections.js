import { value, variant } from '@carpenjk/themeweaver';

export default {
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
      paddingBottom: value('87px'),
      paddingLeft: [3, 5],
    }),
    ...variant('search', {
      paddingBottom: value('87px'),
    }),
  },
};
