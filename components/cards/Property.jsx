import styled from 'styled-components';
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
} from 'themeweaver';
import CardContainer from './CardContainer';
import PropertyDescription from './PropertyDescription';
import PropertyCardLayout from './PropertyCardLayout';

const StyledProperty = styled.div`
  display: flex;
  max-width: 450px;
  flex-direction: column;

  padding-top: ${getPaddingTop('card.container', '8px')};
  padding-right: ${getPaddingRight('card.container', '8px')};
  padding-bottom: ${getPaddingBottom('card.container', '8px')};
  padding-left: ${getPaddingLeft('card.container', '8px')};
  margin-top: ${getMarginTop('card.container', '8px')};
  margin-right: ${getMarginRight('card.container', '8px')};
  margin-bottom: ${getMarginBottom('card.container', '8px')};
  margin-left: ${getMarginLeft('card.container', '8px')};
  min-height: ${getMinHeight('card.container', '0')};
  min-width: ${getMinWidth('card.container', '0')};
  max-height: ${getMaxHeight('card.container', 'none')};
  max-width: ${getMaxWidth('card.container', '450px')};

  ${breakpoint(1)`
    flex-direction: row;
    flex: 1 1 285px;
    padding-top: ${getPaddingTop('card.container', '8px')};
    padding-right: ${getPaddingRight('card.container', '8px')};
    padding-bottom: ${getPaddingBottom('card.container', '8px')};
    padding-left: ${getPaddingLeft('card.container', '8px')};
    margin-top: ${getMarginTop('card.container', '8px')};
    margin-right: ${getMarginRight('card.container', '0px')};
    margin-bottom: ${getMarginBottom('card.container', '8px')};
    margin-left: ${getMarginLeft('card.container', '0')};
    min-height: ${getMinHeight('card.container', '0')};
    min-width: ${getMinWidth('card.container', '0')};
    max-height: ${getMaxHeight('card.container', 'none')};
    max-width: ${getMaxWidth('card.container', 'none')};
  `}
`;

const Property = (props) => {
  const {
    property,
    tw,
    inactive,
    showDescription,
    scaleUp,
    scaleOnHover,
    scale,
    innerRef,
    renderLayout,
  } = props;
  const getCardState = (c) => (inactive ? 'inactive' : '');

  return (
    <StyledProperty>
      <CardContainer
        tw={tw}
        scale={scale}
        scaleOnHover
        scaleUp={scaleUp}
        innerRef={innerRef}
        renderLayout={renderLayout}
      />
      {showDescription && (
        <PropertyDescription description={property.description} />
      )}
    </StyledProperty>
  );
};

export default Property;
