import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const SearchBar = (props) => {
  return (
    <SearchBarProvider>
      <SearchBarMenu key="searchBarContainer" {...props} />
    </SearchBarProvider>
  );
};

export default SearchBar;
