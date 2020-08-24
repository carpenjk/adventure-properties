import styled from 'styled-components';
import {
  breakpoint,
  getBackgroundColor,
  getBorderRadius,
  getHeight,
  getWidth,
  getMaxWidth,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
} from 'themeweaver';

import { getProp } from '../../utils/themeweaver-utils';

//hooks
import { useContext, useRef } from 'react';
import useIsoOnClickOutside from '../hooks/UseIsoOnClickOutside';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';
import { SearchBarContext } from './searchBarContext';
import useWindowSize from '../hooks/UseWindowSize';

//components
import SearchButton from '../SearchButton';
import MoreButton from './MoreButton';
import SearchFilters from './SearchFilters';
import PopupModal from '../PopupModal';
import InputGroup from './InputGroup';
import PrimarySearchLayout from './PrimarySearchLayout';
import SecondarySearchLayout from './SecondarySearchLayout';

//global var
const DEFAULT_OFFSET_TOP_PX = 20;

const StyledSearchBar = styled.div`
  position: absolute;
  top: ${getProp('offsetTop')}px;
  left: ${getProp('offsetLeft')};
  display: flex;
  flex-direction: column;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-sizing: content-box;
  background-color: ${getBackgroundColor('searchBar', 'none')};
  margin-top: ${getMarginTop('searchBar', '0')};
  margin-right: ${getMarginRight('searchBar', '0')};
  margin-bottom: ${getMarginBottom('searchBar', '0')};
  margin-left: ${getMarginLeft('searchBar', '0')};

  ${(props) =>
    props.isSearchBarOpen &&
    `
    padding-top: ${getPaddingTop('searchBar', '1rem')(props)};
    padding-right: ${getPaddingRight('searchBar', '1rem')(props)};
    padding-bottom: ${getPaddingBottom('searchBar', '1rem')(props)};
    padding-left: ${getPaddingLeft('searchBar', '1rem')(props)};
  `}

  ${(props) =>
    props.isSearchFiltersOpen &&
    `
    height: ${getHeight('searchBar', '82vh')(props)}; 
    `}

  max-width: ${getMaxWidth('searchBar', 'none')};
  width: ${getWidth('searchBar', 'auto')};
  z-index: 999999;
  border-radius: ${getBorderRadius('searchBar', '8px')};

  > * {
    box-sizing: border-box;
  }

  ${breakpoint(1)`
  top: ${getProp('offsetTop', 1)}px;
  background-color: ${getBackgroundColor('searchBar', 'none')};
  margin-top: ${getMarginTop('searchBar', '0')};
  margin-right: ${getMarginRight('searchBar', '0')};
  margin-bottom: ${getMarginBottom('searchBar', '0')};
  margin-left: ${getMarginLeft('searchBar', '0')};
  padding-top: ${getPaddingTop('searchBar', '0')};
  padding-right: ${getPaddingRight('searchBar', '0')};
  padding-bottom: ${getPaddingBottom('searchBar', '0')};
  padding-left: ${getPaddingLeft('searchBar', '0')};
  width: ${getWidth('searchBar', 'auto')};
  max-width: ${getMaxWidth('searchbar', 'none')};
  border-radius: ${getBorderRadius('searchBar', '8px')};
  
  ${({ isSearchFiltersOpen }) =>
    isSearchFiltersOpen &&
    `
      width: 90vw;
      max-width: 1000px;
      padding: 2.5rem;
    `}}
`}
`;

const StyledSearchFields = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isSearchFiltersOpen }) => isSearchFiltersOpen && 'margin-bottom: 20px;'}
  ${breakpoint(1)`
    flex-direction: row;
  `}
`;

StyledSearchBar.defaultProps = {
  position: 'absolute',
  offsetTop: DEFAULT_OFFSET_TOP_PX,
  offsetLeft: '50%',
};

const StyledButtonContainer = styled.div`
  display: ${({ isSearchBarOpen }) => (isSearchBarOpen ? 'flex' : 'none')};
  justify-content: space-between;
  padding-top: ${getPaddingTop('searchBar_container.buttons', '0')};
  padding-right: ${getPaddingRight('searchBar_container.buttons', '0')};
  padding-bottom: ${getPaddingBottom('searchBar_container.buttons', '0')};
  padding-left: ${getPaddingLeft('searchBar_container.buttons', '0')};
  border-top: ${({ isSearchFiltersOpen }) =>
    isSearchFiltersOpen ? '1px solid rgba(151, 151, 151, 0.35)' : 'none'};
`;

//******************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const { offsetTop } = props;
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
  const visibleInputRefs = useRef([]);
  const hidableInputRefs = useRef([]);

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

  useIsoLayoutEffect(() => {
    const top = offsetTop ? offsetTop : DEFAULT_OFFSET_TOP_PX;
    if (!isSearchFiltersOpen) {
      const searchBarPaddingTop = window
        .getComputedStyle(searchBarRef.current)
        .getPropertyValue('padding-top')
        .split('px')[0];
      searchBarRef.current.style.top = `${top - searchBarPaddingTop}px`;
    }
  }, [isSearchBarOpen, isSearchFiltersOpen]);

  //* component rendering ********************************************************

  return (
    <React.Fragment>
      {!(isSearchBarOpen && isPopup) || (
        <PopupModal
          isOpen={[isSearchBarOpen, isSearchFiltersOpen]}
          className={isSearchBarOpen && isPopup ? 'popupOpen' : ''}
        />
      )}
      <StyledSearchBar
        isSearchBarOpen={isSearchBarOpen}
        isSearchFiltersOpen={isSearchFiltersOpen}
        offsetTop={offsetTop}
        ref={searchBarRef}
      >
        <StyledSearchFields isSearchFiltersOpen={isSearchFiltersOpen}>
          <InputGroup
            key="primarySearch"
            isVisible={true}
            isSearchBarOpen={isSearchBarOpen}
            InputFields={PrimarySearchLayout}
            inputRefs={visibleInputRefs}
            valueFunctions={{ get: getSearchValue, set: updateSearch }}
            onInputFocus={handleFocus}
            lastBottomMargin={[true, true]}
            lastRightMargin={[true, true]}
          />
          <InputGroup
            key="secondarySearch"
            isVisible={[isSearchBarOpen, true]}
            isSearchBarOpen={isSearchBarOpen}
            InputFields={SecondarySearchLayout}
            inputRefs={hidableInputRefs}
            valueFunctions={{ get: getSearchValue, set: updateSearch }}
            onInputFocus={handleFocus}
            lastBottomMargin={[false, true]}
            lastRightMargin={[true, false]}
          />
        </StyledSearchFields>

        <SearchFilters />
        <StyledButtonContainer
          isSearchBarOpen={isSearchBarOpen}
          isSearchFiltersOpen={isSearchFiltersOpen}
        >
          <MoreButton
            onClick={() => setIsSearchFiltersOpen(() => !isSearchFiltersOpen)}
            expanded={isSearchFiltersOpen}
          />
          <SearchButton />
        </StyledButtonContainer>
      </StyledSearchBar>
    </React.Fragment>
  );
};

export default SearchBarMenu;
