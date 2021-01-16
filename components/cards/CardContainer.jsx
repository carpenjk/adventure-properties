import { useState } from 'react';
import styled from 'styled-components';
import {
  getHeight,
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
import { condition, getProp } from 'dataweaver';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';
import PropertyDescription from './PropertyDescription';

const Box = styled.div`
  display: inline-block;
  position: relative;
  background: #ffffff;
  border: 1px solid #cdf7f6;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  padding: 15px;
  cursor: pointer;
`;
const StyledCard = styled.div`
  flex: 1 1 auto;
  position: relative;
  background: #ffffff;
  border: 1px solid #cdf7f6;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  padding-top: ${getPaddingTop('card.container', '8px')};
  padding-right: ${getPaddingRight('card.container', '8px')};
  padding-bottom: ${getPaddingBottom('card.container', '8px')};
  padding-left: ${getPaddingLeft('card.container', '8px')};
  margin-top: ${getMarginTop('card.container', '8px')};
  margin-right: ${getMarginRight('card.container', '8px')};
  margin-bottom: ${getMarginBottom('card.container', '8px')};
  margin-left: ${getMarginLeft('card.container', '8px')};
  height: ${getHeight('card.container', '390px')};
  min-height: ${getMinHeight('card.container', '0')};
  min-width: ${getMinWidth('card.container', '0')};
  max-height: ${getMaxHeight('card.container', 'none')};
  max-width: ${getMaxWidth('card.container', '450px')};

  ${condition(({ tw }) => tw && tw.state === 'inactive')`
    opacity: 0.4;
  `}

  ${breakpoint(1)`
    flex: 1 1 285px;
    padding-top: ${getPaddingTop('card.container', '8px')};
    padding-right: ${getPaddingRight('card.container', '8px')};
    padding-bottom: ${getPaddingBottom('card.container', '8px')};
    padding-left: ${getPaddingLeft('card.container', '8px')};
    margin-top: ${getMarginTop('card.container', '8px')};
    margin-right: ${getMarginRight('card.container', '0px')};
    margin-bottom: ${getMarginBottom('card.container', '8px')};
    margin-left: ${getMarginLeft('card.container', '0')};
    height: ${getHeight('card.container', '390px')};
    min-height: ${getMinHeight('card.container', '0')};
    min-width: ${getMinWidth('card.container', '0')};
    max-height: ${getMaxHeight('card.container', 'none')};
    max-width: ${getMaxWidth('card.container', 'none')};
    ${condition(({ currScale }) => currScale && currScale !== 1)`
      transform: scale(${getProp('currScale')})
    `}
  `}
`;

const CardContainer = ({
  tw,
  renderLayout,
  innerRef,
  scale,
  scaleOnHover,
  scaleUp,
}) => {
  const [currScale, setCurrScale] = useState(1);
  const handleMouseEnter = (e) => {
    if (scaleOnHover) setCurrScale(1 + scale);
  };
  const handleMouseLeave = (e) => {
    if (!scaleUp && scaleOnHover) setCurrScale(1);
  };

  useIsoLayoutEffect(() => {
    if (scaleUp) {
      setCurrScale(1 + scale);
    } else {
      setCurrScale(1);
    }
  }, [scaleUp]);

  if (scaleUp === undefined) debugger;
  return (
    <StyledCard
      tw={tw}
      currScale={currScale}
      ref={innerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderLayout()}
    </StyledCard>
  );
};
CardContainer.defaultProps = {
  scale: 0.25,
};

export default CardContainer;
