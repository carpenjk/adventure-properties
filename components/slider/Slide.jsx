import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import useElementSize from '../hooks/UseElementSize';
import CardContainer from '../cards/CardContainer';
import PropertyCardLayout from '../cards/PropertyCardLayout';
import SliderCompartment from './SliderCompartment';
import ViewMoreCardLayout from '../cards/ViewMoreCardLayout';

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
  const {
    items,
    showMoreItem,
    activeItem,
    keyboardNavOn,
    itemsToDisplay,
    slideRef,
  } = props;

  function getEndingIndex(compStart) {
    const compEnd = compStart + itemsToDisplay;
    return compEnd < items.length - 1 ? compEnd : items.length;
  }

  const getNumOfCompartments = () => {
    const atLeastOne = items.length > itemsToDisplay;
    const filledCompartments = atLeastOne ? items.length / itemsToDisplay : 0;
    // const remainder = atLeastOne ? items.length % itemsToDisplay : 0;
    return filledCompartments + 1;
  };

  const numOfCompartments = getNumOfCompartments();

  const getInitialCompartments = () => {
    const compartments = [];
    for (let comp = 0, i = 0; comp < numOfCompartments; comp++) {
      compartments[comp] = items.slice(i, i + itemsToDisplay);
      i += itemsToDisplay;
    }
    return compartments;
  };

  const getIncrementalData = () => {};
  const [sliderCompartments, setSliderCopartments] = useState(
    getInitialCompartments()
  );

  return (
    <StyledSlide ref={slideRef} numOfCompartments={numOfCompartments}>
      {sliderCompartments.map((comp, compIndex) => (
        <SliderCompartment
          key={compIndex}
          numOfCompartments={numOfCompartments}
          renderLayout={() => {
            const itemArray = comp.map((item, index) => (
              <CardContainer
                key={item.key}
                scale={0.125}
                scaleOnHover
                scaleUp={
                  keyboardNavOn &&
                  activeItem === compIndex * itemsToDisplay + index
                }
                renderLayout={() => (
                  <PropertyCardLayout variant="large" data={item} />
                )}
              />
            ));
            const isLastCompartment =
              compIndex === sliderCompartments.length - 1;
            const lastCompIndex =
              itemArray.length > 0 ? itemArray.length - 1 : 0;
            const lengthOfComp = itemArray.length;
            const moreCard = (
              <CardContainer
                key="viewMore"
                scale={0.125}
                scaleOnHover
                scaleUp={
                  keyboardNavOn &&
                  activeItem === compIndex * itemsToDisplay + lengthOfComp
                }
                renderLayout={() => <ViewMoreCardLayout />}
              />
            );

            if (showMoreItem && isLastCompartment) {
              return { ...itemArray, ...moreCard };
            }
            return itemArray;
          }}
        />
      ))}
    </StyledSlide>
  );
};

export default Slide;
