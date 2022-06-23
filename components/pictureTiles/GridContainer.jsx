import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getProp, parseSizeUnits } from 'dataweaver';
import { useContext } from 'react';
import InlineSpinner from '../inlineSpinner/InlineSpinner';
import { ImageLoaderContext } from '../ImageLoader/ImageLoader';

const StyledGrid = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: ${getProp('gridHeight')};
  max-width: ${getProp('maxWidth')};
  overflow: hidden;

  & button {
    width: 100%;
    height: 100%;
  }
  & button > img {
    flex: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  ${breakpoint(1)`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(${({ colCount }) => colCount}, 1fr);
    justify-items: stretch;
    align-items: stretch;
    width: 100%;
    height: ${getProp('gridHeight')};
    max-width: ${getProp('maxWidth')};

    > *:first-child {
      grid-row: 1 / span 2;
      grid-column: 1 / span 2;
    }
    > *:not(:first-child) {
      grid-row: auto / span 1;
      grid-column: auto / span 1;
      max-height: ${getProp('rowHeight')};
    }
    > *:last-child {
      grid-row: unset;
      grid-column: unset;
      max-height: unset;
    }
`}
`;
const GridContainer = ({ colCount, gridHeight, maxWidth, children }) => {
  const { isCompletelyLoaded } = useContext(ImageLoaderContext);
  const rowHeight = parseSizeUnits(gridHeight).map(
    (val) => `${val.value ? val.value / 2 : val.whole}${val.unit || ''}`
  );
  return (
    <StyledGrid
      colCount={colCount}
      gridHeight={gridHeight}
      maxWidth={maxWidth}
      rowHeight={rowHeight}
    >
      {children}
      <InlineSpinner isOpen={!isCompletelyLoaded} />
    </StyledGrid>
  );
};

export default GridContainer;
