import { useRef } from 'react';
import styled from 'styled-components';
import { getProp } from 'dataweaver';

import { breakpoint } from 'themeweaver';
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
  padding: 10px;
  margin: auto;
  width: 90%;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  max-width: 21em;
  z-index: 999;

  ${breakpoint(1)`
    position: absolute;
    right: ${getProp('offsetRight', 1)};
    bottom: ${getProp('offsetBottom', 1)};
    left: ${getProp('offsetLeft', 1)};
    width: 90%;
    margin: 0;
  `}
`;

StyledBanner.defaultProps = {
  position: ['relative', 'absolute'],
  offsetTop: '10rem',
  offsetRight: 'auto',
  offsetBottom: 'auto',
  offsetLeft: ['auto', '1.05em'],
};

const StyledBackground = styled.div`
  content: '';
  background: #ffffff;
  opacity: 0.85;
  border-radius: 3px;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const StyledWrapper = styled.div`
  margin: 0;

  > h1 {
    margin: 0 0 10px 0;
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainText};
  }
  > h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    color: ${({ theme }) => theme.colors.bannerText};
    letter-spacing: 0.05em;
  }
`;

const HeroBanner = (props) => {
  const windowSize = useWindowSize();
  const bannerRef = useRef(null);

  useIsoLayoutEffect(() => {
    if (bannerRef)
      bannerRef.current.style.top = `${
        100 + 100 * Math.min((1850 / windowSize.width) ** 40, 1)
      }px`;
  }, [windowSize.width]);

  return (
    <StyledBanner className="heroBanner" {...props} ref={bannerRef}>
      <StyledBackground />
      <StyledWrapper>
        <h1>Live, Work, Play. Build Your Dream Adventure Today!</h1>
        <h2>
          Find rental properties near the things that make living most
          enjoyable.
        </h2>
      </StyledWrapper>
    </StyledBanner>
  );
};

export default HeroBanner;
