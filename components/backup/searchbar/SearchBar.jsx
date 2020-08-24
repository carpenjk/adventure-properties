import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const SearchBar = (props) => {
  const { mobileBreakpoint, popupMaxScreenWidth, mobileMaxWidth } = props;
  return (
    <SearchBarProvider popupMaxSceenWidth={popupMaxScreenWidth}>
      <SearchBarMenu
        mobileBreakpoint={mobileBreakpoint}
        mobileMaxWidth={mobileMaxWidth}
        popupMaxScreenWidth={popupMaxScreenWidth}
      />
    </SearchBarProvider>
  );
};

export default SearchBar;
