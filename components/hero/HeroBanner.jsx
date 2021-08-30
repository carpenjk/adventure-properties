import { useRef } from 'react';
import styled from 'styled-components';
import { getProp } from 'dataweaver';

import {
  breakpoint,
  getBorderRadius,
  getPaddingTop,
  getPaddingBottom,
  getPaddingRight,
  getPaddingLeft,
  getWidth,
  getMaxWidth,
  getZIndex,
} from 'themeweaver';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';
import useWindowSize from '../hooks/UseWindowSize';

const StyledBanner = styled.div`
  position: relative;
  top: ${getProp('offsetTop')};
  left: ${getProp('offsetleft')};
  bottom: ${getProp('offsetBottom')};
  right: ${getProp('offsetRight')};
  display: flex;
  flex-direction: column;
  padding-top: ${getPaddingTop('banner', '10px')};
  padding-right: ${getPaddingRight('banner', '10px')};
  padding-bottom: ${getPaddingBottom('banner', '10px')};
  padding-left: ${getPaddingLeft('banner', '10px')};
  margin: auto;
  width: ${getWidth('banner', '90%')};
  max-width: ${getMaxWidth('banner', '50.1rem')};
  z-index: ${getZIndex('banner', '999998')};

  &.banner H1 {
    margin: 0 0 10px 0;
  }
  &.banner H2 {
    margin: 0;
  }

  ${breakpoint(1)`
    position: absolute;
    top: 10rem;
    right: ${getProp('offsetRight', 1)};
    bottom: ${getProp('offsetBottom', 1)};
    left: ${getProp('offsetLeft', 1)};
    width: ${getWidth('banner', '90%')};
    max-width: ${getMaxWidth('banner', '50.1rem')};
    margin: 0;
  `}
`;

StyledBanner.defaultProps = {
  position: ['relative', 'absolute'],
  offsetTop: '10rem',
  offsetRight: 'auto',
  offsetBottom: 'auto',
  offsetLeft: ['auto', '2.5rem'],
};

const StyledBackground = styled.div`
  content: '';
  background: #ffffff;
  opacity: 0.85;
  border-radius: ${getBorderRadius('banner', '3px')};

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const StyledWrapper = styled.div`
  margin: 0;
`;

const HeroBanner = (props) => {
  const windowSize = useWindowSize();
  const bannerRef = useRef(null);

  useIsoLayoutEffect(() => {
    if (bannerRef)
      bannerRef.current.style.top = `${
        100 + 100 * Math.min(Math.pow(1850 / windowSize.width, 40), 1)
      }px`;
  });

  return (
    <StyledBanner className="heroBanner" {...props} ref={bannerRef}>
      <StyledBackground />
      <StyledWrapper>
        <h1>Live, Work, Play. Build Your Dream Adventure Today!</h1>
        <h2>
          We are a real estate company for people that love adventure and the
          outdoors. Buy or rent a new home for your adventure or creative
          studio.
        </h2>
      </StyledWrapper>
    </StyledBanner>
  );
};

export default HeroBanner;
