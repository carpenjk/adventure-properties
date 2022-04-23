import styled from 'styled-components';
import { getProp } from 'dataweaver';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import ActionButton from '../base/ActionButton';
import Spacer from '../base/Spacer';
import { SearchBarContext } from '../searchbar/searchBarContext';
import { prepValues } from '../../data/validation/search';

const StyledMenuGroup = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-items: ${getProp('alignContent')};
`;

function toggleSort(obj) {
  const key = Object.keys(obj)[0];
  return { [key]: obj[key] * -1 };
}
const ResultMenuLayout = () => {
  const { control } = useContext(SearchBarContext);
  const [priceSort, setPriceSort] = useState();
  const [locationSort, setlocationSort] = useState();
  const router = useRouter();
  const { query } = router;
  const { sortBy } = query;
  const currentSort = sortBy ? JSON.parse(sortBy) : {};
  const isPriceSorted = currentSort.displayPrice !== undefined;
  const isdestinationSearch = query.destination && true;
  const isDestinationSorted = currentSort.destination && true;

  async function handlePriceSort() {
    // if price is current sort, toggle sort
    const currKey = Object.keys(currentSort)[0];
    const newSort =
      currKey === 'displayPrice'
        ? toggleSort(currentSort)
        : { displayPrice: -1 };
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
        query: { ...remQuery, sortBy: { destination: 1 } },
      });
    }
  }

  function getTransform() {
    const numericSort = currentSort[Object.keys(currentSort)[0]];
    return numericSort === 1 ? { transform: 'scaleY(-1)' } : undefined;
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
            style={isPriceSorted ? getTransform() : undefined}
          />
          <Spacer space="4px" />
          <span>Price</span>
        </ActionButton>
        <Spacer space="8px" />
        <ActionButton
          tw={{ variant: 'results' }}
          isActive={isDestinationSorted}
          isDisabled={!isdestinationSearch}
          onClick={handleDestinationSort}
        >
          <img
            src="/static/assets/searchResults/sortDesc.svg"
            alt="filter"
            // style={isDestinationSorted ? getTransform() : undefined}
          />
          <Spacer space="4px" />
          <span>Nearest</span>
        </ActionButton>
      </StyledMenuGroup>
    </>
  );
};

export default ResultMenuLayout;
