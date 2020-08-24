import styled from 'styled-components';
//hooks
import { useContext, useRef } from 'react';
import useIsoOnClickOutside from '../hooks/UseIsoOnClickOutside';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';
import useWindowSize from '../hooks/UseWindowSize';
import { SearchBarContext } from './searchBarContext';

//components
import MenuInputHandler from './MenuInputHandler';
import SearchButton from '../SearchButton';
import MoreButton from './MoreButton';
import SearchFilters from './SearchFilters';
import PopupModal from '../PopupModal';

//configs
import { SearchBar_config } from '../../compConfig';

const SearchBar = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  display: flex;
  flex-direction: column;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-sizing: content-box;
  padding: 0;
  border-radius: 8px;
  background: white;
  width: 95vw;
  max-width: ${(props) => props.mobileMaxWidth};
  z-index: 999999;

  .searchFields {
    display: flex;
    flex-direction: column;
  }
  .buttonsContainer {
    display: none;
    justify-content: space-between;
    padding: 2.3rem 1rem 1.8rem 0.5rem;
    border-top: 1px solid rgba(151,151,151, .35);
  }
  &.searchBar-isOpen {
    padding: 1rem 0.5rem 1rem 0.5rem;
    top: 10px;
  }
  &.searchBar-isOpen > .buttonsContainer {
    display: flex;
  }
  &.searchBar-isFiltersOpen {
    height: 82vh;
  }
  &.searchBar-isFiltersOpen > .searchFields {
    padding-bottom: 20px;
  }
  .searchFields > * {
    margin: 0 0 1rem 0;
  }

  .searchFields > .lastMobile {
    margin: 0;
  }

  >* {
    box-sizing: border-box;
  }

  @media (${(props) => props.mobileBreakpoint}) {
      top: 20px;
      padding: 0.5rem;
      width: auto;
      max-width: 95vw;
    .searchFields {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
    &.searchBar-isOpen {
      padding: 0.5rem;
      top: 20px;
    }
    &.searchBar-isFiltersOpen {
      width: 90vw;
      max-width: 1000px;
      padding: 2.5rem;
    }
    .searchFields > * {
      margin: 0 1.3rem 0 0;
    }
    .searchFields > .lastPortal {
      margin: 0 1.3rem 0 0;
    }
    .searchFields > .lastDesktop {
      margin: 0;
    }
  }
  }
`;

//******************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const { inputs } = SearchBar_config;
  const { mobileBreakpoint, mobileMaxWidth, popupMaxScreenWidth } = props;
  const windowSize = useWindowSize();
  //* context *********************************************************
  const {
    updateSearch,
    getSearchValue,
    isStarted,
    isSearchBarOpen,
    setIsSearchBarOpen,
    isSearchFiltersOpen,
    setIsSearchFiltersOpen,
    isPopup,
  } = useContext(SearchBarContext);

  //* Dom References ***********************************************
  const searchBarRef = useRef(null);
  const searchFieldsRef = useRef(null);
  const inputRefs = useRef([]);

  //* helper functions ***************************************************
  const isLastDesktop = (input) => input === inputs[inputs.length - 1];
  const isLastMobile = (input) => {
    let lastMobileField = [];
    if (isSearchBarOpen) {
      lastMobileField = inputs.slice(-1)[0];
    } else {
      lastMobileField = inputs
        .filter((mobileField) => mobileField.hideInitialMobile !== true)
        .slice(-1)[0];
    }
    return input === lastMobileField;
  };

  function getWrapperClass(input) {
    if (windowSize.width <= popupMaxScreenWidth) {
      if (isLastMobile(input)) return 'lastMobile';
    } else {
      if (isLastDesktop(input)) return 'lastDesktop';
    }
    return '';
  }

  //* event handlers ***********************************************
  const handleFocus = (e) => {
    setIsSearchBarOpen(true);
  };

  const onClickOutsideEffect = () => {
    if (!isStarted) {
      setIsSearchBarOpen(false);
      setIsSearchFiltersOpen(false);
    }
  };

  //* hooks/lifecycle
  useIsoLayoutEffect(() => {
    !isStarted ? setIsSearchBarOpen(false) : setIsSearchBarOpen(true);
  }, [isStarted]);

  useIsoOnClickOutside(searchBarRef, onClickOutsideEffect, [isStarted]);

  //* component rendering ********************************************************

  return (
    <React.Fragment>
      {!(isSearchBarOpen && isPopup) || (
        <PopupModal
          open={isSearchBarOpen && isPopup}
          className={isSearchBarOpen && isPopup ? 'popupOpen' : ''}
        />
      )}
      <SearchBar
        key="1"
        mobileBreakpoint={mobileBreakpoint}
        mobileMaxWidth={mobileMaxWidth}
        className={`searchBar ${isSearchBarOpen ? 'searchBar-isOpen' : ''} ${
          isSearchFiltersOpen ? 'searchBar-isFiltersOpen' : ''
        }`}
        ref={searchBarRef}
      >
        <div className="searchFields" ref={searchFieldsRef}>
          {inputs.map((input, index) => {
            return (
              <MenuInputHandler
                key={input.id}
                name={input.id}
                valueFunctions={{ get: getSearchValue, set: updateSearch }}
                input={input}
                hide={isPopup && input.hideInitialMobile && !isSearchBarOpen}
                wrapperClass={getWrapperClass(input)}
                mobileBreakpoint={mobileBreakpoint}
                onFocus={handleFocus}
                inputRef={(el) => (inputRefs.current[index] = el)}
                nextFocusRef={
                  input.focusNext ? inputRefs.current[index + 1] : undefined
                }
                height="4rem" //! refactor? Set height of React-Select objects to match input styling:
              />
            );
          })}
        </div>
        <SearchFilters mobileBreakpoint={mobileBreakpoint} />
        <div className="buttonsContainer">
          <MoreButton
            onClick={() => setIsSearchFiltersOpen(() => !isSearchFiltersOpen)}
            expanded={isSearchFiltersOpen}
          />
          <SearchButton />
        </div>
      </SearchBar>
    </React.Fragment>
  );
};

export default SearchBarMenu;
