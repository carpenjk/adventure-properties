import { variant } from '@carpenjk/themeweaver';

export default {
  features: {
    ...variant('default', {
      paddingTop: 3,
      paddingRight: 5,
      paddingBottom: 3,
      paddingLeft: 5,
      backgroundColor: 'white',
    }),
  },
};
