import { variant, value } from '@carpenjk/themeweaver';

export default {
  document: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  content: {
    ...variant('default', {
      minWidth: ['', value('800px')],
      maxWidth: value('1080px'),
    }),
    ...variant('property', {
      minWidth: ['', value('800px')],
      maxWidth: value('1200px'),
    }),
    ...variant('reserve', {
      maxWidth: [value('532px'), value('532px')],
    }),
    ...variant('about', {
      maxWidth: value('1920px'),
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    }),
  },
};
