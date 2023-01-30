import { value, variant } from '@carpenjk/themeweaver';

export default {
  searchBar: {
    backgroundColor: [value('transparent'), 'lightBackground'],
    width: [value('90vw'), value('90vw')],
    maxWidth: [value('500px'), value('fit-content')],
    maxHeight: value('calc(100vh - 224px)'),
    borderRadius: 2,
    paddingTop: [2, 2],
    paddingRight: [2, 2],
    paddingBottom: [1, 1],
    paddingLeft: [2, 2],
  },
  'searchBar-isFiltersOpen': {
    maxWidth: value('833px'),
  },
  searchBar__buttonContainer: {
    paddingTop: [1, 3],
    paddingRight: [2, 3],
    paddingBottom: [1, 3],
    paddingLeft: [2],
  },
  searchBar_container: {
    ...variant('filterGroup', {
      marginTop: 5,
      paddingBottom: 3,
    }),
    ...variant('filter', {
      marginBottom: 2,
      marginRight: [0, 3],
    }),
  },
};
