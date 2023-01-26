import { variant, value } from '@carpenjk/themeweaver';

export default {
  results: {
    ...variant('default', {
      paddingTop: 5,
      paddingBottom: 5,
    }),
  },
  results_item: {
    maxWidth: value('466px'),
  },
  results_footer: {
    color: 'primary[0]',
    fontFamily: 'raleway',
    fontSize: 3,
    fontWeight: 'bold',
  },
  results_header: {
    color: 'action[1]',
    fontFamily: 'poppins',
    fontSize: 4,
    fontWeight: 'bold',
    letterSpacing: value('0.05em'),
    paddingTop: 3,
    paddingBottom: 3,
  },
  results_topic: {
    color: 'primary[0]',
  },
};
