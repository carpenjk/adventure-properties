import React, { useState, useEffect, useLayoutEffect } from 'react';
import { checkFiltersData } from '../../data/input';

const SearchBarContext = React.createContext();

const SearchBarProvider = (props) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [isSearchFiltersOpen, setIsSearchFiltersOpen] = useState(false);

  // set up state for each search field using id of input in config file
  const [searchFields, setSearchFields] = useState({
    destination: '',
    arriveDate: '',
    departDate: '',
    guests: '',
  });

  function createCheckFilterState() {
    return checkFiltersData.reduce(
      (acc, filterGroup) => ({
        ...acc,
        ...filterGroup.filters.reduce(
          (acc, filter) => ({
            ...acc,
            [filter.id]: { value: 0, filterFn: (filter) => filter >= value },
          }),
          {}
        ),
      }),
      {}
    );
  }

  const [checkFiltersState, setCheckFilters] = useState(
    createCheckFilterState()
  );

  const [searchFilters, setSearchFilters] = useState({
    minPrice: { value: 0, filterFn: (filter) => filter >= value },
    maxPrice: { value: 0, filterFn: (filter) => filter <= value },
    beds: { value: 0, filterFn: (filter) => filter >= value },
    baths: { value: 0, filterFn: (filter) => filter >= value },
    ...createCheckFilterState(),
  });

  // @param filter must match id of input in config file
  const getFilter = (filterId) => searchFilters[filterId];

  // @param filter must match id of input in config file
  const getFilterValue = (filterId) => searchFilters[filterId].value;

  function updateSearch(inputs) {
    if (inputs) setSearchFields(() => ({ ...searchFields, ...inputs }));
  }

  // @param field must match id of input in config file
  function getSearchValue(field) {
    return searchFields[field];
  }

  function searchHasValues() {
    const aryValues = Object.values(searchFields);
    const valuesNotBlank = aryValues.reduce(
      (containsValue, input) => containsValue || input !== '',
      false
    );
    return valuesNotBlank;
  }
  const createNewFilter = (prevFilters, filter) => {
    const filterId = Object.keys(filter)[0];
    const prevFilter = prevFilters[filterId];
    const newValue = { value: filter[filterId] };
    const newFilter = { [filterId]: { ...prevFilter, ...newValue } };
    return { ...searchFilters, ...newFilter };
  };

  // @param filter must match id of input in config file
  // Usage requires passing an object with filter id as object key
  // e.g. set({ [id]: checked });
  const updateFilters = (filter) => {
    if (filter) {
      setSearchFilters((prevFilter) => createNewFilter(prevFilter, filter));
    }
  };

  const toggleBooleanFilter = (filterId) => {
    setSearchFilters((prevFilters) => {
      const toggledFilter = { [filterId]: !prevFilters[filterId].value };
      return createNewFilter(prevFilters, toggledFilter);
    });
  };

  function toggleSearchFiltersOpen() {
    setIsSearchFiltersOpen(() => !isSearchFiltersOpen);
  }

  // lifecyle methods

  // check and set is started after every search criteria update
  const useIsoLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsoLayoutEffect(() => {
    setIsStarted(searchHasValues());
  }, [searchFields]);
  return (
    <SearchBarContext.Provider
      value={{
        updateSearch,
        getSearchValue,
        searchFields,
        searchFilters,
        isStarted,
        isSearchBarFocused,
        setIsSearchBarFocused,
        isSearchFiltersOpen,
        setIsSearchFiltersOpen,
        updateFilters,
        toggleBooleanFilter,
        getFilterValue,
      }}
    >
      {props.children}
    </SearchBarContext.Provider>
  );
};

export { SearchBarProvider, SearchBarContext };
