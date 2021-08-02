import styled, { ThemeContext } from 'styled-components';
import {
  getMaxHeight,
  getMinHeight,
  getMinWidth,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  breakpoint,
  getMaxWidth,
  useBreakpoints,
} from 'themeweaver';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getProp } from 'dataweaver';
import client from '../../Contentful';
import Property from '../cards/Property';
import PropertyCardLayout from '../cards/PropertyCardLayout';
import ViewMoreCardLayout from '../cards/ViewMoreCardLayout';

const StyledSliderDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;

  ${breakpoint(2)`
    flex-direction: row;
    flex: none;
    justify-content: space-between;
    justify-content: flex-start;
    justify-items: flex-start;
    flex-wrap: nowrap;
    width auto;

    > * {
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 0;
    }
  `}7
`;

const StyledSlot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex: none;
  width: ${({ slotWidth }) => `${slotWidth}px`};
`;

const SliderDrawer = (props) => {
  const {
    items,
    showMoreItem,
    activeItem,
    keyboardNavOn,
    itemsToDisplay,
    slideRef,
    drawer,
  } = props;

  const theme = useContext(ThemeContext);
  const br = useBreakpoints(theme);
  const slotSize = drawer.viewWidth / itemsToDisplay;

  const getCardState = (c) => (!drawer.isCurrentView(c) ? 'inactive' : '');

  async function fetchProperties() {
    const results = await client.getAsset('6VW7ZyCNS3kTPZJFqhLCSf');
    return results;
  }

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function getProperties() {
      const allProperties = await fetchProperties();
      setProperties(allProperties);
    }
    getProperties();
  }, []);

  const buildPicUrl = useCallback(() => {
    if (properties && properties.fields) {
      return `http:${properties.fields.file.url}?w=325`;
    }
    return undefined;
  }, [properties]);

  return (
    <StyledSliderDrawer ref={slideRef}>
      {items.map((item, index) => (
        <StyledSlot key={item.key} slotWidth={slotSize}>
          <Property
            property={item}
            tw={{ state: getCardState(index) }}
            scale={1.125}
            scaleOnHover
            scaleUp={keyboardNavOn && activeItem === index}
            showDescription={br.current.width < br.br[2]}
            innerRef={drawer.addItemRef}
            cardLayout={() => (
              <PropertyCardLayout
                variant="large"
                data={item}
                picUrl={buildPicUrl}
              />
            )}
          />
        </StyledSlot>
      ))}
      {showMoreItem && (
        <StyledSlot key="more" slotWidth={slotSize}>
          <Property
            tw={{ state: getCardState(drawer.itemCount - 1) }}
            scale={1.125}
            scaleOnHover
            scaleUp={keyboardNavOn && activeItem === items.length}
            cardLayout={() => <ViewMoreCardLayout />}
          />
        </StyledSlot>
      )}
    </StyledSliderDrawer>
  );
};

export default SliderDrawer;
