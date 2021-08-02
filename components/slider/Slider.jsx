import styled, { ThemeContext } from 'styled-components';

import { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { useBreakpoints, breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';
import { Media } from '../../Media';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';

import useSlide from '../hooks/UseSlide';
import SliderHeader from './SliderHeader';
import SliderDrawer from './SliderDrawer';
import SliderFooter from './SliderFooter';
import SliderNavContainer from './SliderNavContainer';
import SliderNavButton from './SliderNavButton';

const StyledSlider = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  overflow-x: hidden;
`;

const StyledMain = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: visible;
`;

const StyledContent = styled.div`
  flex: 1 1 auto;
  min-width: 1px;
  position: relative;
  display: flex;
  flex-wrap: nowrap;

  padding-top: 16px;
  padding-bottom: 16px;

  overflow-x: visible;
  ${condition('hideOverflow')`
  overflow-x: hidden;
  `}
  ${breakpoint(2)`
    width: 100%;
  `}
`;

const Slider = (props) => {
  // const NUM_COMPARTMENTS = 3;
  const {
    properties,
    items,
    itemsToDisplay,
    itemsToScroll,
    numIncrItems,
    showMoreItem,
    keyboardSelectSlot,
    hideOverflow,
  } = props;

  const theme = useContext(ThemeContext);
  const br = useBreakpoints(theme);
  // const windowSize = useWindowSize();
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardNavOn, setIsKeyboardNavOn] = useState(false);
  const [hasLeftScroll, setHasScrollLeft] = useState(true);
  const [hasRightScroll, setHasScrollRight] = useState(false);
  const sliderRef = useRef(null);
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const moreRef = useRef(null);

  const drawer = useSlide({
    items,
    itemsToDisplay,
    showMoreItem,
    keyboardSelectSlot,
    parentRef: contentRef,
  });

  const topic = 'skiing';

  const getIncrementalData = () => {};

  const getScrollSize = useCallback(
    () => slideRef.current.getBoundingClientRect().width / drawer.itemCount,
    [slideRef, drawer.itemCount, drawer.viewWidth]
  );
  // const calcScrollPos = useCallback(
  //   () => getScrollSize() * drawer.currentPos * -1,
  //   [getScrollSize, drawer.currentPos]
  // );

  const calcScrollPos = useCallback(
    () => -(drawer.currentPos / drawer.itemCount) * 100,
    [getScrollSize, drawer.currentPos]
  );

  const calcScrollPos2 = useCallback(() => -325 * drawer.currentPos);

  // event handlers ***************************************************************

  const handleScrollRight = () => drawer.pageRight();
  const handleScrollLeft = () => drawer.pageLeft();

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        drawer.scrollLeft(1);
        setIsKeyboardNavOn(true);
        break;
      case 'ArrowRight':
        drawer.scrollRight(1);
        setIsKeyboardNavOn(true);
        break;
      default:
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (e.target === sliderRef.current) {
      setIsKeyboardNavOn(true);
    }
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    setIsKeyboardNavOn(false);
  };

  // lifecycle functions *******************************************************
  // translate slide
  useIsoLayoutEffect(() => {
    console.log(
      'slideRef width: ',
      slideRef.current.getBoundingClientRect().width
    );
    if (br.current.width < br.br[0]) {
      slideRef.current.style.transform = 'none';
    } else {
      // slideRef.current.style.transform = `translate3D(${calcScrollPos()}%,0,0)`;
      slideRef.current.style.transform = `translate3D(${calcScrollPos()}%,0,0)`;
    }
  }, [calcScrollPos, br]);

  // toggle keyboard nav
  useEffect(() => {
    if (isFocused) {
      setIsKeyboardNavOn(true);
    }
    setIsKeyboardNavOn(false);
  }, [isFocused]);

  // hide and show nav buttons
  useEffect(() => {
    const hasMultiple = drawer.pageCount > 1;
    if (isKeyboardNavOn) {
      setHasScrollLeft(!drawer.isStart);
      setHasScrollRight(!drawer.isEnd && hasMultiple);
      sliderRef.current.focus();
    } else {
      setHasScrollLeft(!drawer.isPageStart);
      setHasScrollRight(!drawer.isPageEnd && hasMultiple);
      if (drawer.isPageStart && rightButtonRef && rightButtonRef.current)
        rightButtonRef.current.focus();
      if (drawer.isPageEnd && leftButtonRef && leftButtonRef.current)
        leftButtonRef.current.focus();
    }
  }, [
    drawer.isPageStart,
    drawer.isPageEnd,
    drawer.isStart,
    drawer.isEnd,
    drawer.itemRefs,
    isKeyboardNavOn,
  ]);

  const [showNavContainer, setShowNavContainer] = useState(
    br.current.width > br.br[1]
  );

  useEffect(() => {
    setShowNavContainer(br.current.width > br.br[2]);
  }, [br.current.width, br.br]);

  // const showNavContainer = false;
  // jsx return ***************************************************************
  return (
    <StyledSlider
      key={`slider_${topic}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      ref={sliderRef}
    >
      <SliderHeader prefix="Because you like" topic={topic} />
      <StyledMain key="main">
        <Media greaterThanOrEqual="2">
          <SliderNavContainer
            tw={{ state: showNavContainer ? 'hide' : '' }}
            key="left"
            direction="left"
            hide={hasLeftScroll}
            innerRef={leftButtonRef}
            onClick={handleScrollLeft}
          />
        </Media>
        <StyledContent
          key="sliderContent"
          // hideOverflow={hideOverflow}
          ref={contentRef}
        >
          <SliderDrawer
            key="sliderDrawer"
            properties={properties}
            items={items}
            drawer={drawer}
            itemsToDisplay={itemsToDisplay}
            showMoreItem
            activeItem={drawer.keyboardItem}
            keyboardNavOn={isKeyboardNavOn}
            slideRef={slideRef}
            parentRef={contentRef}
          />
        </StyledContent>
        <Media greaterThanOrEqual="2">
          <SliderNavContainer
            tw={{ state: showNavContainer ? 'hide' : '' }}
            key="right"
            direction="right"
            hide={hasRightScroll}
            innerRef={rightButtonRef}
            onClick={handleScrollRight}
          />
        </Media>
      </StyledMain>
      <SliderFooter topic={topic} moreRef={moreRef} />
    </StyledSlider>
  );
};

export default Slider;
