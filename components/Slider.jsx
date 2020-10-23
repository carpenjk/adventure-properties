import styled, { ThemeContext } from 'styled-components';

import { useState, useRef, useContext, useEffect } from 'react';
import { condition } from 'dataweaver';
import { breakpoint, useBreakpoints, ww } from 'themeweaver';

import useWindowSize from './hooks/UseWindowSize';
import SliderHeader from './SliderHeader';
import SliderDrawer from './SliderDrawer';
import SliderFooter from './SliderFooter';

const StyledSlider = styled.div`
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1350px;
  padding-left: 50px;
  padding-right: 50px;
  overflow-x: hidden;
`;

const StyledContent = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: visible;
`;

const StyledSliderNavButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  width: 65px;
  height: 65px;

  border-radius: 30px;
  ${condition(({ direction }) => direction === 'left')`
    background-color: grey;
    color: white;
    left: calc(-65px / 1.5);
  `}
  ${condition(({ direction }) => direction === 'right')`
    background-color: grey;
    color: white;
    right: calc(-65px / 1.5);
  `}
  ${breakpoint(1)`
    display: block;
  `}
`;

const Slider = (props) => {
  const NUM_COMPARTMENTS = 3;
  const { items, itemsToDisplay, itemsToScroll, keyboardSelectSlot } = props;
  const theme = useContext(ThemeContext);
  const br = useBreakpoints(theme);
  const windowSize = useWindowSize();
  // const [scrollPos, setScrollPos] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [activeItem, setActiveItem] = useState(keyboardSelectSlot);
  const [inFocus, setInFocus] = useState(false);
  const [isKeyboardNavOn, setIsKeyboardNavOn] = useState(false);
  const [hasLeftScroll, setHasScrollLeft] = useState(true);
  const [hasRightScroll, setHasScrollRight] = useState(true);
  const sliderRef = useRef(null);
  const slideRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const calcItemsToScroll = itemsToScroll || itemsToDisplay;
  const topic = 'skiing';

  const getScrollSize = () => {
    const slideWidth = slideRef.current.offsetWidth;
    const numSlots = itemsToDisplay * NUM_COMPARTMENTS;
    return slideWidth / numSlots;
  };

  const calcScrollPos = () => getScrollSize() * scrollPos * -1;

  const trimPos = (pos, allowScrollToEnd) => {
    const leftOffset = allowScrollToEnd ? keyboardSelectSlot : 0;
    const rightOffset = allowScrollToEnd ? itemsToDisplay : 0;
    const lastLeftSlot = 0 - leftOffset;
    const lastRightSlot = items.length + leftOffset - itemsToDisplay;

    if (pos <= lastLeftSlot) {
      return lastLeftSlot;
    }
    if (pos >= lastRightSlot) {
      return lastRightSlot;
    }
    return pos;
  };

  const scrollLeft = (n) => {
    let newPos = 0;
    if (n) {
      setScrollPos((prevValue) => {
        newPos = trimPos(prevValue - 1, true);
        return newPos;
      });
      setActiveItem(newPos + keyboardSelectSlot);
    } else {
      setScrollPos((prevValue) => {
        newPos = trimPos(getNextScrollLock('left', prevValue), false);
        return newPos;
      });
      setActiveItem(newPos + keyboardSelectSlot);
    }
  };

  const scrollRight = (n) => {
    let newPos = 0;
    if (n) {
      setScrollPos((prevValue) => {
        newPos = trimPos(prevValue + 1, true);
        return newPos;
      });
    } else {
      setScrollPos((prevValue) => {
        newPos = trimPos(getNextScrollLock('right', prevValue), false);
        return newPos;
      });
    }
  };

  const getNextScrollLock = (dir, currentSlot) => {
    let lockOffset = 0;
    const currMinusScroll = currentSlot - calcItemsToScroll;
    const currPlusScroll = currentSlot + calcItemsToScroll;
    switch (dir) {
      case 'left':
        if (currMinusScroll <= 0) {
          return 0;
        }
        lockOffset =
          currMinusScroll < calcItemsToScroll - 1
            ? calcItemsToScroll - currMinusScroll
            : currMinusScroll % calcItemsToScroll;
        return currMinusScroll + lockOffset;
      case 'right':
        lockOffset = currPlusScroll % calcItemsToScroll;
        return currPlusScroll - lockOffset;
      default:
    }
  };

  const handleScrollRight = (e) => scrollRight();
  const handleScrollLeft = (e) => scrollLeft();

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        scrollLeft(1);
        setIsKeyboardNavOn(true);
        break;
      case 'ArrowRight':
        scrollRight(1);
        setIsKeyboardNavOn(true);
        break;
      default:
    }
  };

  const handleFocus = (e) => {
    setInFocus(true);
    console.log('focus target: ', e.target);
    console.log('handleFocus -> sliderRef.current', sliderRef.current);
    if (e.target === sliderRef.current) {
      setIsKeyboardNavOn(true);
    }
  };
  const handleBlur = (e) => {
    console.log('blur');
    setInFocus(false);
    setIsKeyboardNavOn(false);
  };

  useEffect(() => {
    if (br.current.width < br.br[0]) {
      slideRef.current.style.transform = 'none';
    } else {
      slideRef.current.style.transform = `translate3D(${calcScrollPos()}px,0,0)`;
    }
  }, [windowSize.width, itemsToDisplay, scrollPos, br]);

  useEffect(() => {
    setActiveItem(scrollPos + keyboardSelectSlot);
  }, [scrollPos, keyboardSelectSlot]);

  return (
    <StyledSlider
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      ref={sliderRef}
    >
      <SliderHeader prefix="Because you like" topic={topic} />
      <StyledContent>
        <SliderDrawer
          items={items}
          itemsToDisplay={itemsToDisplay}
          activeItem={activeItem}
          numOfCompartments={NUM_COMPARTMENTS}
          slideRef={slideRef}
          keyboardNavOn={isKeyboardNavOn}
        />
        {hasLeftScroll && (
          <StyledSliderNavButton
            tabIndex={-1}
            direction="left"
            ref={leftButtonRef}
            onClick={handleScrollLeft}
          >
            {'<'}
          </StyledSliderNavButton>
        )}
        {hasRightScroll && (
          <StyledSliderNavButton
            tabIndex={-1}
            direction="right"
            ref={rightButtonRef}
            onClick={handleScrollRight}
          >
            {'>'}
          </StyledSliderNavButton>
        )}
      </StyledContent>
      <SliderFooter topic={topic} />
    </StyledSlider>
  );
};

Slider.defaultProps = {
  itemsToDisplay: 3,
  keyboardSelectSlot: 1,
};

export default Slider;
