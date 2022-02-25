// hooks
import { useContext, useRef } from 'react';
import useIsoOnClickOutside from '../hooks/UseIsoOnClickOutside';
import { SearchBarContext } from './searchBarContext';

// components
import SearchBarContainer from './SearchBarContainer';
import ExpandedBackground from './ExpandBackground';
import SearchButton from './SearchButton';
import MoreButton from '../base/MoreButton';
import SearchFilters from './SearchFilters';
import PopupModal from '../base/PopupModal';
import InputGroup from './InputGroup';
import PrimarySearchLayout from './PrimarySearchLayout';
import SecondarySearchLayout from './SecondarySearchLayout';
import MenuContainer from './MenuContainer';
import SearchFieldsContainer from './SearchFieldsContainer';
import ButtonContainer from './ButtonContainer';

// global var
const DEFAULT_OFFSET_TOP_PX = 20;

//* *****************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const { offsetTop, openMaxWidth, FilterFields } = props;
  //* context *********************************************************
  const {
    updateSearch,
    getSearchValue,
    isStarted,
    isSearchBarFocused,
    setIsSearchBarFocused,
    isSearchFiltersOpen,
    setIsSearchFiltersOpen,
  } = useContext(SearchBarContext);

  //* Dom References ***********************************************
  const searchBarRef = useRef(null);
  const searchBarBgRef = useRef(null);
  // const scrollContainerRef = useRef(null);
  const visibleInputRefs = useRef([]);
  const secondaryInputRefs = useRef([]);

  //* variables ****************************************************
  const searchBarOffsetTop = offsetTop || DEFAULT_OFFSET_TOP_PX;

  //* event handlers ***********************************************
  const handleFocus = (e) => {
    setIsSearchBarFocused(true);
  };

  const onClickOutsideEffect = () => {
    setIsSearchBarFocused(false);
    setIsSearchFiltersOpen(false);
  };

  //* hooks/lifecycle
  useIsoOnClickOutside(searchBarRef, onClickOutsideEffect, [isStarted]);

  //* component rendering ********************************************************
  return (
    <>
      {isSearchBarFocused && (
        <PopupModal isOpen={[isSearchBarFocused, isSearchFiltersOpen]} />
      )}

      <SearchBarContainer
        isSearchFiltersOpen={isSearchFiltersOpen}
        isSearchBarFocused={isSearchBarFocused}
        offsetTop={searchBarOffsetTop}
        openMaxWidth={openMaxWidth}
        searchBarRef={searchBarRef}
      >
        <ExpandedBackground
          isExpanded={isSearchBarFocused}
          hideRight={[false, isSearchFiltersOpen]}
          innerRef={searchBarBgRef}
        />
        <MenuContainer
          isSearchFiltersOpen={isSearchFiltersOpen}
          isSearchBarFocused={isSearchBarFocused}
        >
          <SearchFieldsContainer isSearchFiltersOpen={isSearchFiltersOpen}>
            <InputGroup
              key="primarySearch"
              groupkey="primaryGroup"
              hide={false}
              isSearchBarFocused={isSearchBarFocused}
              InputFields={PrimarySearchLayout}
              inputRefs={visibleInputRefs}
              valueFunctions={{ get: getSearchValue, set: updateSearch }}
              onInputFocus={handleFocus}
            />
            <InputGroup
              key="secondarySearch"
              groupKey="secondaryGroup"
              hide={[!isSearchBarFocused, false]}
              isSearchBarFocused={isSearchBarFocused}
              InputFields={SecondarySearchLayout}
              inputRefs={secondaryInputRefs}
              valueFunctions={{ get: getSearchValue, set: updateSearch }}
              onInputFocus={handleFocus}
              lastItemMargin={[{ bottom: '4px' }, { right: '4px' }]}
              searchBarRef={searchBarRef}
            />
          </SearchFieldsContainer>
          <SearchFilters
            FilterFields={FilterFields}
            isScrollable={[false, true]}
          />
        </MenuContainer>
        <ButtonContainer
          isDisplayed={[isSearchBarFocused, isSearchBarFocused || isStarted]}
          isSearchFiltersOpen={isSearchFiltersOpen}
        >
          <MoreButton
            text="More Filters"
            onClick={() => setIsSearchFiltersOpen(() => !isSearchFiltersOpen)}
            expanded={isSearchFiltersOpen}
          />
          <SearchButton />
        </ButtonContainer>
      </SearchBarContainer>
    </>
  );
};

export default SearchBarMenu;
