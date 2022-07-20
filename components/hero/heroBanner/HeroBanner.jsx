import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { getProp, getNonStaticPosProps, unwindProps } from 'dataweaver';

import {
  breakpoint,
  getHeight,
  getMaxHeight,
  getMaxWidth,
  getMinHeight,
  getMinWidth,
  getWidth,
} from 'themeweaver';
import useIsoLayoutEffect from '../../hooks/UseIsoLayoutEffect';
import useWindowSize from '../../hooks/UseWindowSize';
import BannerBackground from './BannerBackground';

const StyledBanner = styled.div`
  position: absolute;
  top: ${getProp('top')};
  right: ${getProp('right')};
  bottom: ${getProp('bottom')};
  left: ${getProp('left')};
  transform: ${getProp('transform')};
  width: ${getWidth({}, 'auto')};
  min-width: ${getMinWidth({}, '0')};
  max-width: ${getMaxWidth({}, 'none')};
  height: ${getHeight({}, 'auto')};
  min-height: ${getMinHeight({}, '0')};
  max-height: ${getMaxHeight({}, 'none')};
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  z-index: 999;

  ${breakpoint(1)`
    top: ${getProp('top')};
    right: ${getProp('right')};
    bottom: ${getProp('bottom')};
    left: ${getProp('left')};
    transform: ${getProp('transform')};
    width: ${getWidth({}, 'auto')};
    min-width: ${getMinWidth({}, '0')};
    max-width: ${getMaxWidth({}, '600px')};
    height: ${getHeight({}, 'auto')};
    min-height: ${getMinHeight({}, '0')};
    max-height: ${getMaxHeight({}, 'none')};
  `}
`;

StyledBanner.defaultProps = {
  position: ['relative', 'absolute'],
  top: '10rem',
  right: ['1.05em', '1.05em'],
  bottom: 'auto',
  left: ['1.05em', '1.05em'],
  transform: 'unset',
  marginTop: ['auto', '0'],
  marginRight: ['auto', '0'],
  marginBottom: ['auto', '0'],
  marginLeft: ['auto', '0'],
};

const DEFAULT_TW = {
  semKey: 'heroBanner',
  variant: 'default',
};
// @param bannerPos = {
// top: <value>,
// right: <value>,
// bottom: <value>,
// left: <value>,
// vertical: "center",
// horizontal: "center"
// }
//  vertical and horizontal voids top/bottom and left/right positions respectively
const HeroBanner = (props) => {
  const { tw, children, backgroundComponent, bannerPos, ...remProps } = props;
  const mergedTw = useMemo(() => ({ ...DEFAULT_TW, ...tw }), [tw]);
  const staticPosProps = unwindProps({ bannerPos }).map((val) =>
    getNonStaticPosProps(val.bannerPos)
  );

  const windowSize = useWindowSize();
  const bannerRef = useRef(null);
  const Background = useMemo(() => backgroundComponent || BannerBackground, [
    backgroundComponent,
  ]);

  useIsoLayoutEffect(() => {
    if (!bannerRef || !bannerRef.current) {
      return;
    }
    const { top, right, bottom, left } = bannerPos || {};
    function getPos(fn) {
      return fn({
        windowWidth: windowSize.width,
        windowHeight: windowSize.height,
      });
    }
    if (top && typeof top === 'function') {
      bannerRef.current.style.top = `${getPos(top)}px`;
    }
    if (right && typeof top === 'function') {
      bannerRef.current.style.right = `${getPos(right)}px`;
    }
    if (bottom && typeof top === 'function') {
      bannerRef.current.style.bottom = `${getPos(bottom)}px`;
    }
    if (left && typeof top === 'function') {
      bannerRef.current.style.left = `${getPos(left)}px`;
    }
  }, [windowSize.width, windowSize.height, bannerPos]);

  return (
    <StyledBanner
      tw={mergedTw}
      className="heroBanner"
      {...staticPosProps}
      {...remProps}
      ref={bannerRef}
    >
      <Background />
      {children}
    </StyledBanner>
  );
};

export default HeroBanner;
