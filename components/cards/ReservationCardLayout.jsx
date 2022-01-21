import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';
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
  getMaxWidth,
  breakpoint,
} from 'themeweaver';
import { condition, getProp } from 'dataweaver';
import PhotoLayout from './PhotoLayout';

const StyledContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: stretch;
  width: 100%;

  flex: none;

  padding-top: ${getPaddingTop('property', '8px')};
  padding-right: ${getPaddingRight('property', '8px')};
  padding-bottom: ${getPaddingBottom('property', '8px')};
  padding-left: ${getPaddingLeft('property', '8px')};
  margin-top: ${getMarginTop('property', '8px')};
  margin-right: ${getMarginRight('property', '8px')};
  margin-bottom: ${getMarginBottom('property', '8px')};
  margin-left: ${getMarginLeft('property', '8px')};
  min-height: ${getMinHeight('property', '0')};
  min-width: ${getMinWidth('property', '0')};
  max-height: ${getMaxHeight('property', 'none')};
  max-width: ${getMaxWidth('property', '450px')};

  border-radius: 5px;
  cursor: pointer;

  &:focus {
    background-color: #cdf7f6;
    ${condition('scaleOnFocus')`
    transform: scale(${getProp('scale')});
    `}
  }

  &:hover {
    background-color: #cdf7f6;
  }

  ${condition('scaleOnFocus')`
    &:focus{
      transform: scale(${getProp('scale')});
    }
  `}
  ${condition('scaleOnHover')`  
    &:hover {
      transform: scale(${getProp('scale')});
    }
  `}  

  & > *:nth-child(1) {
    flex: 1 1 auto;
  }
  & > *:nth-child(2) {
    flex: 1 1 auto;
  }

  ${breakpoint(1)`
    height: 80em;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding-top: ${getPaddingTop('property', '8px')};
    padding-right: ${getPaddingRight('property', '8px')};
    padding-bottom: ${getPaddingBottom('property', '8px')};
    padding-left: ${getPaddingLeft('property', '8px')};
    margin-top: ${getMarginTop('property', '8px')};
    margin-right: ${getMarginRight('property', '0px')};
    margin-bottom: ${getMarginBottom('property', '8px')};
    margin-left: ${getMarginLeft('property', '0')};
    min-height: ${getMinHeight('property', '0')};
    min-width: ${getMinWidth('property', '0')};
    max-height: ${getMaxHeight('property', 'none')};
    max-width: ${getMaxWidth('property', 'none')};

    & > *:nth-child(1) {
      flex: 1 1 45%;
    }
    & > *:nth-child(2) {
      flex: 1 1 55%;
    }

    &:focus{
      ${condition('scaleOnFocus')`
        transform: scale(${getProp('scale')});
      `}
    }
    
    &:hover{
      ${condition('scaleOnHover')`
        transform: scale(${getProp('scale')});
      `}
    }
  `}
  ${breakpoint(2)`
    flex-direction: row;
    flex: 1 1 100%; 

    padding-top: ${getPaddingTop('property', '8px')};
    padding-right: ${getPaddingRight('property', '16px')};
    padding-bottom: ${getPaddingBottom('property', '8px')};
    padding-left: ${getPaddingLeft('property', '16px')};
    margin-top: ${getMarginTop('property', '8px')};
    margin-right: ${getMarginRight('property', '0px')};
    margin-bottom: ${getMarginBottom('property', '8px')};
    margin-left: ${getMarginLeft('property', '0')};
    min-height: ${getMinHeight('property', '0')};
    min-width: ${getMinWidth('property', '0')};
    max-height: ${getMaxHeight('property', 'none')};
    max-width: ${getMaxWidth('property', 'none')};


    & > *:nth-child(1) {
      flex: 1 1 auto;
    }
    & > *:nth-child(2) {
      flex: 1 1 auto;
    }

    &:focus{
      ${condition('scaleOnFocus')`
        transform: scale(${getProp('scale')});
      `}
    }
    
    &:hover{
      ${condition('scaleOnHover')`
        transform: scale(${getProp('scale')});
      `}
    }
  `}
`;

const ReservationCardLayout = (props) => {
  const {
    property,
    reservation,
    scaleOnHover,
    scaleOnFocus,
    scale,
    innerRef,
    cardRef,
  } = props;
  const { avgPrice, currSymbol, unit } = reservation;

  return (
    <StyledContainer
      tabIndex={0}
      ref={innerRef}
      scale={scale}
      scaleOnHover={scaleOnHover}
      scaleOnFocus={scaleOnFocus}
    >
      <PhotoLayout
        property={property}
        currSymbol={currSymbol}
        price={avgPrice}
        unit={unit}
        innerRef={cardRef}
        variant="large"
      />
    </StyledContainer>
  );
};

export default ReservationCardLayout;
