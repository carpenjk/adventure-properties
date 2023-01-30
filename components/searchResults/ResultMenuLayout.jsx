import styled from 'styled-components';
import { useRouter } from 'next/router';
import { breakpoint, getProp } from '@carpenjk/prop-x/css';
import { useSearchBar } from '@carpenjk/searchbar';
import { ActionButton } from '@carpenjk/base/button';
import { Spacer } from '@carpenjk/base/layout';

const StyledMenuGroup = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-items: ${getProp('alignContent')};
  padding-left: ${({ theme }) => theme.space[1]}px;
  ${breakpoint(1)`
  padding-left:${({ theme }) => theme.space[2]}px;
  `}
`;

function toggleSort(obj) {
  const key = Object.keys(obj)[0];
  return { [key]: obj[key] * -1 };
}

const ResultMenuLayout = ({ ignoredLocation }) => {
  const { searchState } = useSearchBar();
  const router = useRouter();

  const { query } = router;
  const { sortBy } = query;
  const currentSort = sortBy ? JSON.parse(sortBy) : {};
  const isPriceSorted =
    currentSort.displayPrice !== undefined || ignoredLocation;

  const isdestinationSearch = query.destination && true;
  const isDestinationSorted = currentSort.destination && !ignoredLocation;

  async function handlePriceSort() {
    // if price is current sort, toggle sort
    const isExplicitSort =
      currentSort && currentSort.displayPrice !== undefined;
    const implicitSort =
      !isExplicitSort && isPriceSorted ? { displayPrice: -1 } : undefined;
    const currPriceSort = isExplicitSort ? currentSort : implicitSort;
    // if price is already sorted then toggle
    const newSort = currPriceSort
      ? toggleSort(currPriceSort)
      : { displayPrice: -1 };
    searchState.search({ ...searchState.values, sortBy: newSort, page: 1 });
  }

  async function handleDestinationSort() {
    if (!isDestinationSorted) {
      searchState.search({
        ...searchState.values,
        sortBy: { destination: 1 },
        page: 1,
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
  }
  return (
    <>
      <StyledMenuGroup justifyContent="flex-start" alignItems="center">
        <ActionButton
          tw={{
            variant: 'contentNav',
          }}
          onClick={() => {
            searchState.setIsOpen(true);
            searchState.setIsHidden(false);
          }}
        >
          <img src="/static/assets/searchResults/filter.svg" alt="filter" />
          <Spacer space="4px" />
          <span>Filters</span>
        </ActionButton>
      </StyledMenuGroup>
      <StyledMenuGroup justifyContent="flex-end" alignItems="center">
        <ActionButton
          tw={{
            variant: 'contentNav',
          }}
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
        <Spacer space={['4px', '8px']} />
        <ActionButton
          tw={{ variant: 'contentNav' }}
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
