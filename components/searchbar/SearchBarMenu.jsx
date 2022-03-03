// hooks
import { useContext, useRef } from 'react';
import { Formik, useFormikContext } from 'formik';

import {
  checkFiltersData,
  endDateProps,
  startDateProps,
} from '../../data/input';

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
import MenuContainer from './MenuContainer';
import SearchFieldsContainer from './SearchFieldsContainer';
import ButtonContainer from './ButtonContainer';

// global var
const DEFAULT_OFFSET_TOP_PX = 20;

//* *****************************************************************
//* Beginning of Functional Component ******************************
const SearchBarMenu = (props) => {
  const {
    offsetTop,
    openMaxWidth,
    checkFilters,
    FilterFields,
    PrimarySearchFields,
    SecondarySearchFields,
  } = props;
  //* context *********************************************************
  const {
    updateSearch,
    getSearchValue,
    isStarted,
    searchHasValues,
    isSearchBarFocused,
    setIsSearchBarFocused,
    isSearchFiltersOpen,
    setIsSearchFiltersOpen,
  } = useContext(SearchBarContext);

  const formik = useFormikContext();
  const { values } = formik;

  //* Dom References ***********************************************
  const searchBarRef = useRef(null);
  const searchBarBgRef = useRef(null);
  // const scrollContainerRef = useRef(null);
  const visibleInputRefs = useRef([]);
  const secondaryInputRefs = useRef([]);

  //* variables ****************************************************
  const searchBarOffsetTop = offsetTop || DEFAULT_OFFSET_TOP_PX;

  //* helpers ******************************************************
  const getInitialCheckFilters = () =>
    checkFiltersData.reduce(
      (obj, filter) => ({ ...obj, [filter.title]: [] }),
      {}
    );

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
          {/* <Formik
            initialValues={{
              destination: '',
              guests: '',
              [startDateProps.id]: '',
              [endDateProps.id]: '',
              ...getInitialCheckFilters(),
            }}
          >
            {(formik) => {
              const { values } = formik;
              console.log(
                '🚀 ~ file: SearchBarMenu.jsx ~ line 113 ~ SearchBarMenu ~ formik',
                formik
              );
              return (
                <form>
                  <SearchFieldsContainer
                    isSearchFiltersOpen={isSearchFiltersOpen}
                  >
                    <InputGroup hide={false}>
                      <PrimarySearchFields
                        inputRefs={visibleInputRefs}
                        onInputFocus={handleFocus}
                        searchBarRef={searchBarRef}
                        values={values}
                      />
                    </InputGroup>
                    <InputGroup hide={[!isSearchBarFocused, false]}>
                      <SecondarySearchFields
                        isSearchBarFocused={isSearchBarFocused}
                        inputRefs={secondaryInputRefs}
                        onInputFocus={handleFocus}
                        searchBarRef={searchBarRef}
                        values={values}
                      />
                    </InputGroup>
                  </SearchFieldsContainer>
                  <SearchFilters
                    FilterFields={FilterFields}
                    checkFilters={checkFilters}
                    isScrollable={[false, true]}
                  />
                </form>
              );
            }}
          </Formik> */}
          <form>
            <SearchFieldsContainer isSearchFiltersOpen={isSearchFiltersOpen}>
              <InputGroup hide={false}>
                <PrimarySearchFields
                  inputRefs={visibleInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  values={values}
                />
              </InputGroup>
              <InputGroup hide={[!isSearchBarFocused, false]}>
                <SecondarySearchFields
                  isSearchBarFocused={isSearchBarFocused}
                  inputRefs={secondaryInputRefs}
                  onInputFocus={handleFocus}
                  searchBarRef={searchBarRef}
                  values={values}
                />
              </InputGroup>
            </SearchFieldsContainer>
            <SearchFilters
              FilterFields={FilterFields}
              checkFilters={checkFilters}
              isScrollable={[false, true]}
            />
          </form>
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
