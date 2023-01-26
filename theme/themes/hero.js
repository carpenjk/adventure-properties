import { variant, value } from '@carpenjk/themeweaver';

export default {
  hero: {
    ...variant('home', {
      height: [value('68.5vh'), value('76vh')],
      borderRadius: 2,
    }),
    ...variant('about', {
      height: value('calc(100vh - 135px)'),
    }),
  },
  heroBanner: {
    ...variant('home', {
      // width: value('90%'),
      maxWidth: [value('500px'), value('21em')],
    }),
  },
};
