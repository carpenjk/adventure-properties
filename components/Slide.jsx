import { useState } from 'react';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import useElementSize from './hooks/UseElementSize';
import CardContainer from './cards/CardContainer';
import PropertyCardLayout from './cards/PropertyCardLayout';

const StyledSlide = styled.div`
  position: relative;
  flex: none;
  display: flex;
  flex-direction: column;
  width: 100%;

  transition: transform 0.25s ease-in-out;
  transform: none;

  ${breakpoint(1)`
    flex-direction: row;
    width: calc(100% * ${getProp('numOfCompartments')});  
  `}
`;

const StyledCompartment = styled.div`
  flex: none;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
}

  ${breakpoint(1)`
    flex-direction: row;
    align-items: initial;
    width: calc(100% / ${getProp('numOfCompartments')});  
    > div {
      margin-left: 1.5%;
      margin-right:1.5%;
    }
    
  `}
`;

const Slide = (props) => {
  const { elementRef, size } = useElementSize();
  const {
    items,
    activeItem,
    keyboardNavOn,
    itemsToDisplay,
    slideRef,
    numOfCompartments,
  } = props;
  function getEndingIndex(compStart) {
    const compEnd = compStart + itemsToDisplay;
    return compEnd < items.length - 1 ? compEnd : items.length;
  }

  const compartment1 = items.slice(0, getEndingIndex(0));
  const comp2Start = items.length >= itemsToDisplay * 2 ? itemsToDisplay : -1;

  const compartment2 =
    comp2Start !== -1
      ? items.slice(comp2Start, getEndingIndex(comp2Start))
      : [];

  const comp3Start =
    compartment2.length !== -1 && items.length >= itemsToDisplay * 3
      ? itemsToDisplay * 2
      : -1;
  const compartment3 =
    comp3Start !== -1
      ? items.slice(comp3Start, getEndingIndex(comp3Start))
      : [];

  return (
    <StyledSlide ref={slideRef} numOfCompartments={numOfCompartments}>
      <StyledCompartment
        classname="sliderDrawer_comp1"
        numOfCompartments={numOfCompartments}
      >
        {compartment1.map((item, index) => (
          <CardContainer
            key={item.key}
            innerRef={elementRef}
            scale={0.125}
            scaleOnHover
            scaleUp={keyboardNavOn && activeItem === index}
            renderLayout={() => (
              <PropertyCardLayout variant="large" data={item} />
            )}
          />
        ))}
      </StyledCompartment>
      <StyledCompartment
        classname="sliderDrawer_comp2"
        numOfCompartments={numOfCompartments}
      >
        {compartment2.map((item, index) => (
          <CardContainer
            key={item.key}
            scale={0.125}
            scaleOnHover
            scaleUp={keyboardNavOn && activeItem === index + itemsToDisplay}
            renderLayout={() => (
              <PropertyCardLayout variant="large" data={item} />
            )}
          />
        ))}
      </StyledCompartment>
      <StyledCompartment
        classname="sliderDrawer_comp3"
        numOfCompartments={numOfCompartments}
      >
        {compartment3.map((item, index) => (
          <CardContainer
            key={item.key}
            scale={0.125}
            scaleOnHover
            scaleUp={keyboardNavOn && activeItem === index + itemsToDisplay * 2}
            renderLayout={() => (
              <PropertyCardLayout variant="large" data={item} />
            )}
          />
        ))}
      </StyledCompartment>
    </StyledSlide>
  );
};

Slide.defaultProps = {
  numOfCompartments: 3,
};

export default Slide;
