import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition, getProp } from 'dataweaver';

import PhotoLayout from './PhotoLayout';
import PropertyDescription from './PropertyDescription';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: ${getProp('layoutDirection')};
  align-items: center;
  width: 100%;
  flex: none;
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: 5px;
  max-width: 341px;
  max-width: ${getProp('maxWidth')};

  ${breakpoint(1)`
    height: auto;
    max-width: none;
    flex-direction: row;
    flex-direction: ${getProp('layoutDirection')};
    max-width: ${getProp('maxWidth')};

  `}
  ${breakpoint(2)`
    flex-direction: ${getProp('layoutDirection')};
    align-items: stretch;
    max-width: 341px;
    max-width: ${getProp('maxWidth')};
  `}
`;

const StyledDescWrapper = styled.div`
  display: ${getProp('display')};

  ${breakpoint(1)`
    display: ${getProp('display')};
    align-items: center;
    justify-content: center;    
  `}
  ${breakpoint(2)`
    display: ${getProp('display')};
  `}
`;

StyledContainer.defaultProps = {
  layoutDirection: ['column', 'row', 'row'],
};

StyledDescWrapper.defaultProps = {
  display: ['none', 'flex', 'none'],
};

function getDescDisplay(showDescription) {
  const getDisplay = (val) => (val === true ? 'flex' : 'none');
  if (showDescription) {
    if (Array.isArray(showDescription)) {
      return showDescription.map((val) => getDisplay(val));
    }
    return getDisplay(showDescription);
  }
}
function getMaxWidth(layoutDirection, showDescription) {
  const getValue = (val, i) => {
    if (val === 'row' && condition('showDescription')(showDescription, i)) {
      return 'unset';
    }
    return '341px';
  };
  const getAryValues = (values) => values.map((val, i) => getValue(val, i));
  if (layoutDirection) {
    if (Array.isArray(layoutDirection)) {
      return getAryValues(layoutDirection);
    }
    return getValue(layoutDirection);
  }
  return getAryValues(StyledContainer.defaultProps.layoutDirection);
}

// @param showDescription: array of 1-3 values || string value applied to all breakpoints
// @param layoutDirectionn: array of 1-3 values || string value applied to all breakpoints
const PropertyCardLayout = (props) => {
  const { property, scale, innerRef, showDescription, layoutDirection } = props;

  return (
    <StyledContainer
      layoutDirection={layoutDirection}
      maxWidth={getMaxWidth(
        layoutDirection,
        showDescription || StyledDescWrapper.defaultProps.showDescription
      )}
      ref={innerRef}
      scale={scale}
    >
      <PhotoLayout
        property={property}
        currSymbol={property.currSymbol}
        price={property.displayPrice}
        unit={property.unit}
      />
      <StyledDescWrapper display={getDescDisplay(showDescription)}>
        <PropertyDescription description={property.description} />
      </StyledDescWrapper>
    </StyledContainer>
  );
};

export default PropertyCardLayout;
