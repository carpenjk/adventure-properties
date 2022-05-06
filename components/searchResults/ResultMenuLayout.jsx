import styled from 'styled-components';
import { getProp } from 'dataweaver';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActionButton from '../base/ActionButton';
import Spacer from '../base/Spacer';
import { SearchBarContext } from '../searchbar/searchBarContext';

const StyledMenuGroup = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-items: ${getProp('alignContent')};
`;

function toggleSort(obj) {
  const key = Object.keys(obj)[0];
  return { [key]: obj[key] * -1 };
}

const ResultMenuLayout = ({ ignoredLocation }) => {
  const { control } = useContext(SearchBarContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { query } = router;
  const { sortBy } = query;
  const currentSort = sortBy ? JSON.parse(sortBy) : {};
  const isPriceSorted =
    currentSort.displayPrice !== undefined || ignoredLocation;

  const isdestinationSearch = query.destination && true;
  const isDestinationSorted = currentSort.destination && !ignoredLocation;

  // const priceTransform =  isPriceSorted && currentSort.displayPrice ? transform: 'scaleY(-1)';

  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function handlePriceSort() {
    // if price is current sort, toggle sort

    const isExplicitSort =
      currentSort && currentSort.displayPrice !== undefined;
    console.log(
      '🚀 ~ file: ResultMenuLayout.jsx ~ line 45 ~ handlePriceSort ~ isExplicitSort',
      isExplicitSort
    );
    const implicitSort =
      !isExplicitSort && isPriceSorted ? { displayPrice: -1 } : undefined;
    console.log(
      '🚀 ~ file: ResultMenuLayout.jsx ~ line 48 ~ handlePriceSort ~ implicitSort',
      implicitSort
    );

    const currPriceSort = isExplicitSort ? currentSort : implicitSort;

    console.log(
      '🚀 ~ file: ResultMenuLayout.jsx ~ line 51 ~ handlePriceSort ~ currPriceSort',
      currPriceSort
    );

    // if price is already sorted then toggle
    const newSort = currPriceSort
      ? toggleSort(currPriceSort)
      : { displayPrice: -1 };
    // const currKey = Object.keys(currentSort)[0];
    // const newSort =
    //   currKey === 'displayPrice'
    //     ? toggleSort(currentSort)
    //     : { displayPrice: -1 };
    router.push({
      pathname: '/properties/search',
      query: { ...query, sortBy: JSON.stringify(newSort) },
    });
  }

  async function handleDestinationSort() {
    const { sortBy: prevSort, ...remQuery } = query || {};
    if (!isDestinationSorted) {
      router.push({
        pathname: '/properties/search',
        query: { ...remQuery, sortBy: JSON.stringify({ destination: 1 }) },
      });
    }
  }

  function getPriceTransform() {
    if (!isPriceSorted) return;
    if (currentSort && currentSort.displayPrice !== undefined) {
      return currentSort.displayPrice === 1
        ? { transform: 'scaleY(-1)' }
        : undefined;
    }
    // not active or defaulted from ignoring destination
  }
  function getCurrentSortVal() {
    return currentSort[Object.keys(currentSort)[0]];
  }
  return (
    <>
      <StyledMenuGroup justifyContent="flex-start" alignItems="center">
        <ActionButton
          tw={{
            variant: 'results',
          }}
          onClick={() => control.unHide()}
        >
          <img src="/static/assets/searchResults/filter.svg" alt="filter" />
          <Spacer space="4px" />
          <span>Filters</span>
        </ActionButton>
      </StyledMenuGroup>
      <StyledMenuGroup justifyContent="flex-end" alignItems="center">
        <ActionButton
          tw={{
            variant: 'results',
          }}
          isActive={isPriceSorted}
          onClick={handlePriceSort}
        >
          <img
            src="/static/assets/searchResults/sortDesc.svg"
            alt="filter"
            style={isPriceSorted ? getPriceTransform() : undefined}
          />
          <Spacer space="4px" />
          <span>Price</span>
        </ActionButton>
        <Spacer space="8px" />
        <ActionButton
          tw={{ variant: 'results' }}
          isActive={isDestinationSorted && !ignoredLocation}
          disabled={!isdestinationSearch || ignoredLocation}
          onClick={handleDestinationSort}
        >
          <img
            src="/static/assets/searchResults/sortDesc.svg"
            alt="filter"
            style={{ transform: 'scaleY(-1)' }}
          />
          <Spacer space="4px" />
          <span>Nearest</span>
        </ActionButton>
      </StyledMenuGroup>
    </>
  );
};

export default ResultMenuLayout;
