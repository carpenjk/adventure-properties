import styled from 'styled-components';
import Link from 'next/link';
import { breakpoint } from 'themeweaver';
import { condition, getProp } from 'dataweaver';

const StyledCard = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  background: #ffffff;
  border: 1px solid #cdf7f6;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;

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
  url,
}) => (
  <Link href={url}>
    <a tabIndex={-1}>
      <StyledCard
        inactive={inactive}
        scaleOnHover={scaleOnHover}
        scaleOnFocus={scaleOnFocus}
        scale={scale}
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
