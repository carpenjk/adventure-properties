import styled from 'styled-components';
import Link from 'next/link';
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

const StyledCard = styled.div`
  display: flex;
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
  height: ${getHeight('card.container', 'auto')};
  min-height: ${getMinHeight('card.container', '0')};
  min-width: ${getMinWidth('card.container', '0')};
  max-height: ${getMaxHeight('card.container', 'none')};
  max-width: ${getMaxWidth('card.container', '450px')};

  ${condition('inactive')`
    opacity: 0.4;
  `}

  &:focus {
    ${condition('scaleOnFocus')`
      transform: scale(${getProp('scale')});
    `}
  }

  &:hover {
    ${condition('scaleOnHover')`
      transform: scale(${getProp('scale')});
    `}
  }

  ${breakpoint(1)`
    flex: 1 1 auto;
    padding-top: ${getPaddingTop('card.container', '0')};
    padding-right: ${getPaddingRight('card.container', '0')};
    padding-bottom: ${getPaddingBottom('card.container', '0')};
    padding-left: ${getPaddingLeft('card.container', '0')};
    margin-top: ${getMarginTop('card.container', '8px')};
    margin-right: ${getMarginRight('card.container', '8px')};
    margin-bottom: ${getMarginBottom('card.container', '8px')};
    margin-left: ${getMarginLeft('card.container', '8px')};
    height: ${getHeight('card.container', 'auto')};
    min-height: ${getMinHeight('card.container', '0')};
    min-width: ${getMinWidth('card.container', '0')};
    max-height: ${getMaxHeight('card.container', 'none')};
    max-width: ${getMaxWidth('card.container', '450px')};

    &:focus {
      ${condition('scaleOnFocus')`
        transform: scale(${getProp('scale')});
      `}
    }
  
    &:hover {
      ${condition('scaleOnHover')`
        transform: scale(${getProp('scale')});
      `}
    }
  `}

  ${breakpoint(2)`
    flex: 1 1 auto;

    padding-top: ${getPaddingTop('card.container', '0')};
    padding-right: ${getPaddingRight('card.container', '0')};
    padding-bottom: ${getPaddingBottom('card.container', '0')};
    padding-left: ${getPaddingLeft('card.container', '0')};
    margin-top: ${getMarginTop('card.container', '8px')};
    margin-right: ${getMarginRight('card.container', '8px')};
    margin-bottom: ${getMarginBottom('card.container', '8px')};
    margin-left: ${getMarginLeft('card.container', '8px')};
    height: ${getHeight('card.container', 'auto')};
    min-height: ${getMinHeight('card.container', '0')};
    min-width: ${getMinWidth('card.container', '0')};
    max-height: ${getMaxHeight('card.container', 'none')};
    max-width: ${getMaxWidth('card.container', '450px')};

    &:focus {
      ${condition('scaleOnFocus')`
        transform: scale(${getProp('scale')});
      `}
    }
  
    &:hover {
      ${condition('scaleOnHover')`
        transform: scale(${getProp('scale')});
      `}
    }
  `}
`;

const Card = ({
  children,
  innerRef,
  scale,
  scaleOnHover,
  scaleOnFocus,
  inactive,
  scaleUp,
  url,
}) => (
  <Link href={url}>
    <a tabIndex={-1}>
      <StyledCard
        inactive={inactive}
        scaleUp={scaleUp}
        scaleOnHover={scaleOnHover}
        scaleOnFocus={scaleOnFocus}
        currScale={scale}
        ref={innerRef}
      >
        {children}
      </StyledCard>
    </a>
  </Link>
);
Card.defaultProps = {
  scale: 1.25,
};

export default Card;
