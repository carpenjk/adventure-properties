import SearchBarMenu from './SearchBarMenu';
import { SearchBarProvider } from './searchBarContext';

const SearchBar = (props) => (
  <SearchBarProvider>
    <SearchBarMenu {...props} />
  </SearchBarProvider>
);

export default SearchBar;
