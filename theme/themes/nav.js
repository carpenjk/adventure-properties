import { variant, value } from '@carpenjk/themeweaver';

export default {
  nav: {
    ...variant('main', {
      backgroundColor: 'white',
      fontFamily: 'poppins',
      fontSize: 3,
      fontWeight: 'bold',
      transition: { top: 'down', left: 'left' },
      minHeight: value('80px'),
      height: value('80px'),
      paddingLeft: [0, 3],
      paddingRight: 0,
    }),
  },
};
