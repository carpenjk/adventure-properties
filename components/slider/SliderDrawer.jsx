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
import { useContext, useEffect, useState } from 'react';
import { getProp } from 'dataweaver';
import useParentSize from '../hooks/UseParentSize';
import Property from '../cards/Property';
import CardContainer from '../cards/CardContainer';
import PropertyCardLayout from '../cards/PropertyCardLayout';
import ViewMoreCardLayout from '../cards/ViewMoreCardLayout';

const StyledSliderDrawer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  ${breakpoint(2)`
    flex-direction: row;
    justify-content: space-between;
    flex: none;
    flex-wrap: nowrap;
    width: ${getProp('drawerWidth')}px;
    > * {
      margin-left: 0.60%;
      margin-right: 0.60%;
    }
  `}
`;

const SliderDrawer = (props) => {
  const {
    items,
    showMoreItem,
    activeItem,
    keyboardNavOn,
    itemsToDisplay,
    slideRef,
    parentRef,
    drawer,
    cardRefs,
  } = props;

  const theme = useContext(ThemeContext);
  const br = useBreakpoints(theme);
  // const parentSize = useParentSize(slideRef.current);

  const getCardState = (c) => (!drawer.isCurrentView(c) ? 'inactive' : '');

  const getDrawerWidth = () => {
    const contentElement = drawer.parentRef
      ? drawer.parentRef.current
      : undefined;

    const paddingLeft = contentElement
      ? window.getComputedStyle(contentElement).paddingLeft
      : '0';
    const paddingRight = contentElement
      ? window.getComputedStyle(contentElement).paddingRight
      : '0';

    const regex = /[\d]+/;
    const pxPaddingLeft = paddingLeft.match(regex)[0];
    const pxPaddingRight = paddingRight.match(regex)[0];

    // const contentWidth = parentSize.width - pxPaddingLeft - pxPaddingRight;

    const widthFactor =
      drawer.filledPages + drawer.itemsInLastPage / itemsToDisplay;
    const result = widthFactor * drawer.viewWidth;
    return result;
  };

  // const [drawerWidth, setDrawerWidth] = useState(getDrawerWidth);

  // useEffect(() => setDrawerWidth(getDrawerWidth()), [drawerWidth]);
  const scaleUp = keyboardNavOn && activeItem === 5;
  return (
    <StyledSliderDrawer
      ref={slideRef}
      drawerWidth={getDrawerWidth()}
      widthFactor={drawer.filledPages + drawer.itemsInLastPage / itemsToDisplay}
    >
      {items.map((item, index) => (
        <Property
          property={item}
          key={item.key}
          tw={{ state: getCardState(index) }}
          scale={0.125}
          scaleOnHover
          scaleUp={keyboardNavOn && activeItem === index}
          showDescription={br.current.width < br.br[1]}
          innerRef={drawer.addItemRef}
          renderLayout={() => (
            <PropertyCardLayout variant="large" data={item} />
          )}
        />
      ))}
      {showMoreItem && (
        <Property
          key="viewMore"
          tw={{ state: getCardState(drawer.itemCount - 1) }}
          scale={0.125}
          scaleOnHover
          scaleUp={keyboardNavOn && activeItem === items.length}
          renderLayout={() => <ViewMoreCardLayout />}
        />
      )}
    </StyledSliderDrawer>
  );
};

export default SliderDrawer;
