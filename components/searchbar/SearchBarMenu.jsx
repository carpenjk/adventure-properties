import styled from 'styled-components';
import {
  breakpoint,
  getBackgroundColor,
  getBorderRadius,
  getWidth,
  getMaxHeight,
  getMaxWidth,
  getMinWidth,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
} from 'themeweaver';

import { getProp, getConditionalProp } from '../../utils/themeweaver-utils';

//hooks
import { useContext, useRef } from 'react';
import useIsoOnClickOutside from '../hooks/UseIsoOnClickOutside';
import useWindowSize from '../hooks/UseWindowSize';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';
import { SearchBarContext } from './searchBarContext';

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
  flex: none;
  position: absolute;
  top: ${getProp('offsetTop')}px;
  left: ${getProp('offsetLeft')};
  display: flex;
  flex-direction: column;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  box-sizing: content-box;
  background-color: ${getBackgroundColor('searchBar', 'none')};

  ${(props) =>
    props.isSearchBarFocused &&
    `
    margin-top: ${getMarginTop('searchBar', '0')(props)};
    margin-right: ${getMarginRight('searchBar', '0')(props, 1)};
    margin-bottom: ${getMarginBottom('searchBar', '0')(props)};
    margin-left: ${getMarginLeft('searchBar', '0')(props)};
    max-width: ${getProp('openMaxWidth', 0)};
  `}

  max-height: ${getMaxHeight('searchBar', 'none')};
  max-width: ${getMaxWidth('searchBar', 'none')};
  width: ${getWidth('searchBar', 'auto')};
  z-index: 999999;
  border-radius: ${getBorderRadius('searchBar', '8px')};

  ${breakpoint(1)`
    top: ${getProp('offsetTop', 1)}px;
    background-color: ${getBackgroundColor('searchBar', 'none')};
    margin-top: ${getMarginTop('searchBar', '0')};
    margin-right: ${getMarginRight('searchBar', '0')};
    margin-bottom: ${getMarginBottom('searchBar', '0')};
    margin-left: ${getMarginLeft('searchBar', '0')};
    padding: 0;

    width: ${getWidth('searchBar', 'auto')};
    max-width: ${getMaxWidth('searchBar', 'none')};
    min-width: ${getMinWidth('searchBar', '0')};
    border-radius: ${getBorderRadius('searchBar', '8px')};


  ${(props) =>
    props.isSearchFiltersOpen &&
    `
      width: 90vw;
      max-width: ${getProp('openMaxWidth', 1)(props)};
      max-height: ${getMaxHeight('searchBar', '82vh')(props)};
    `}}
`}
`;

const StyledBackground = styled.div`
  background-color: transparent;
  border-radius: ${getBorderRadius('searchBar', '8px')};
  position: absolute;
  top: -${getPaddingTop('searchBar', '1rem')};
  right: -${getPaddingRight('searchBar', '1rem')};
  bottom: -${getPaddingBottom('searchBar', '1rem')};
  left: -${getPaddingLeft('searchBar', '1rem')};
  z-index: -999999;

  ${(props) =>
    props.isSearchBarFocused &&
    `
      background-color: ${getBackgroundColor('searchBar', 'none')(props)};
    `}

  ${breakpoint(1)`
    border-radius: ${getBorderRadius('searchBar', '8px')};
    top: -${getPaddingTop('searchBar', '1rem')};
    right: -${getPaddingRight('searchBar', '1rem')};
    bottom: -${getPaddingBottom('searchBar', '1rem')};
    left: -${getPaddingLeft('searchBar', '1rem')};
    ${(props) =>
      props.isSearchFiltersOpen &&
      `
        right: 0;
      `}
    `}
`;

const StyledScrollContainer = styled.div`
  overflow-y: ${({ isSearchFiltersOpen }) =>
    isSearchFiltersOpen ? 'auto' : 'initial'};

  ${breakpoint(1)`
    overflow-y: ${({ isSearchFiltersOpen }) =>
      isSearchFiltersOpen ? 'hidden' : 'initial'};
    display: flex;
    flex-direction: column;
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
  display: ${getConditionalProp('isDisplayed', ({ isDisplayed }) =>
    isDisplayed ? 'flex' : 'none'
  )};
  justify-content: space-between;
  padding-top: ${getPaddingTop('searchBar_container.buttons', '0')};
  padding-right: ${getPaddingRight('searchBar_container.buttons', '0')};
  padding-bottom: ${getPaddingBottom('searchBar_container.buttons', '0')};
  padding-left: ${getPaddingLeft('searchBar_container.buttons', '0')};
  border-top: ${({ isSearchFiltersOpen }) =>
    isSearchFiltersOpen ? '1px solid rgba(151, 151, 151, 0.35)' : 'none'};

  ${breakpoint(1)`
  display: ${getConditionalProp(
    'isDisplayed',
    ({ isDisplayed }) => (isDisplayed ? 'flex' : 'none'),
    1
  )};
  `}
`;

//******************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const { offsetTop, openMaxWidth } = props;
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
  const scrollContainerRef = useRef(null);
  const visibleInputRefs = useRef([]);
  const hidableInputRefs = useRef([]);

  //* event handlers ***********************************************
  const handleFocus = (e) => {
    setIsSearchBarFocused(true);
  };

  const onClickOutsideEffect = () => {
    setIsSearchBarFocused(false);
    setIsSearchFiltersOpen(false);
  };

  //* hooks/lifecycle
  const windowSize = useWindowSize();

  useIsoOnClickOutside(searchBarRef, onClickOutsideEffect, [isStarted]);

  useIsoLayoutEffect(() => {
    const outerElement = searchBarBgRef.current;
    const searchBarOffsetTop = offsetTop ? offsetTop : DEFAULT_OFFSET_TOP_PX;
    const parentOffsetTop = searchBarOffsetTop + outerElement.offsetTop;
    const viewportOffsetTop = outerElement
      ? outerElement.getBoundingClientRect().top
      : 0;
    searchBarRef.current.style.maxHeight = `${
      window.innerHeight - viewportOffsetTop - parentOffsetTop * 2
    }px`;
  }, [windowSize.height]);

  //* component rendering ********************************************************
  return (
    <React.Fragment>
      {isSearchBarFocused && (
        <PopupModal isOpen={[isSearchBarFocused, isSearchFiltersOpen]} />
      )}

      <StyledSearchBar
        key="searchBar"
        isSearchFiltersOpen={isSearchFiltersOpen}
        isSearchBarFocused={isSearchBarFocused}
        offsetTop={offsetTop}
        openMaxWidth={openMaxWidth}
        ref={searchBarRef}
      >
        <StyledBackground
          isSearchBarFocused={isSearchBarFocused}
          isSearchFiltersOpen={isSearchFiltersOpen}
          ref={searchBarBgRef}
        />
        <StyledScrollContainer
          isSearchFiltersOpen={isSearchFiltersOpen}
          isSearchBarFocused={isSearchBarFocused}
          ref={scrollContainerRef}
        >
          <StyledSearchFields isSearchFiltersOpen={isSearchFiltersOpen}>
            <InputGroup
              key="primarySearch"
              groupkey="primaryGroup"
              isVisible={true}
              isSearchBarFocused={isSearchBarFocused}
              InputFields={PrimarySearchLayout}
              inputRefs={visibleInputRefs}
              valueFunctions={{ get: getSearchValue, set: updateSearch }}
              onInputFocus={handleFocus}
            />
            <InputGroup
              key="secondarySearch"
              groupKey="secondaryGroup"
              isVisible={[isSearchBarFocused, true]}
              isSearchBarFocused={isSearchBarFocused}
              InputFields={SecondarySearchLayout}
              inputRefs={hidableInputRefs}
              valueFunctions={{ get: getSearchValue, set: updateSearch }}
              onInputFocus={handleFocus}
              lastItemMargin={[{ bottom: '4px' }, { right: '4px' }]}
              searchBarRef={searchBarRef}
            />
          </StyledSearchFields>

          <SearchFilters isScrollable={[false, true]} />
        </StyledScrollContainer>
        <StyledButtonContainer
          isDisplayed={[isSearchBarFocused, isSearchBarFocused || isStarted]}
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
