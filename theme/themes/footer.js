import { variant, value } from '@carpenjk/themeweaver';

export default {
  footer: {
    paddingTop: 2,
    paddingRight: 3,
    paddingBottom: 2,
    paddingLeft: 3,
    backgroundColor: 'primary[0]',
  },
  footerNav: {
    fontFamily: 'poppins',
    width: ['', value('80%')],
    minWidth: ['', value('800px')],
    maxWidth: ['', value('1200px')],
  },
  footerNav_group: {
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    paddingLeft: 3,
  },
  footerNav_header: {
    fontSize: 4,
    lineHeight: value('32px'),
    letterSpacing: value('0.025em'),
    color: 'primary'[0],
  },
  footerNav_item: {
    ...variant('default', {
      fontSize: 2,
      lineHeight: value('40px'),
      letterSpacing: value('0.025em'),
      color: 'primary[0]',
    }),
    ...variant('hover', {
      backgroundColor: 'tertiary',
      color: 'primary[0]',
    }),
  },
};
