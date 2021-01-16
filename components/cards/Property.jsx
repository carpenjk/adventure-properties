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
import useHasMounted from '../hooks/UseHasMounted';
import CardContainer from './CardContainer';
import PropertyDescription from './PropertyDescription';
import PropertyCardLayout from './PropertyCardLayout';

const StyledProperty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;

  flex: none;

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
  
    flex: none;
    display: grid;
    grid-template-columns: 380px auto;
    grid-template-rows: auto;
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
  ${breakpoint(2)`
    display: flex;
    flex-direction: row;
    flex: 1 1 285px;
    height: 100%;
  `}
`;
const StyledCardLayout = styled.div`
  grid-row: 1 / 2;
  grid-col: 1 / 2;
  display: flex;
  width: 375px;
  width: 100%;

  ${breakpoint(2)`
    height: 100%;
  `}
`;
const StyledDescLayout = styled.div`
  grid-row: 1 / 2;
  grid-col: 1 / 2;
  display: flex;
  height: 225px;
  ${breakpoint(1)`
    height:100%:
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
  const hasMounted = useHasMounted();
  return (
    <StyledProperty>
      <StyledCardLayout>
        <CardContainer
          tw={tw}
          scale={scale}
          scaleOnHover
          scaleUp={scaleUp}
          innerRef={innerRef}
          renderLayout={renderLayout}
        />
      </StyledCardLayout>
      <StyledDescLayout>
        {hasMounted && (
          <PropertyDescription
            description={
              property && property.description ? property.description : ''
            }
            hide={!showDescription}
          />
        )}
      </StyledDescLayout>
    </StyledProperty>
  );
};

export default Property;
