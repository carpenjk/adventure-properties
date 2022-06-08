import styled from 'styled-components';
import { condition, getProp } from 'dataweaver';
import {
  getMaxHeight,
  getMinHeight,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  breakpoint,
  getBackgroundColor,
  getWidth,
  getHeight,
} from 'themeweaver';
import { useMemo, useRef } from 'react';
import useAdjustForScrollBar from '../../hooks/UseAdjustForScrollBar';

const StyledSection = styled.section`
  position: ${getProp('position')};
  top: ${getProp('offsetTop')}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  width: ${getWidth({}, '100%')};
  height: ${getHeight({}, '')};
  padding-top: ${getPaddingTop({}, '0')};
  padding-right: ${getPaddingRight({}, '0')};
  padding-bottom: ${getPaddingBottom({}, '0')};
  padding-left: ${getPaddingLeft({}, '0')};
  margin-top: ${getMarginTop({}, '0')};
  margin-right: ${getMarginRight({}, '0')};
  margin-bottom: ${getMarginBottom({}, '0')};
  margin-left: ${getMarginLeft({}, '0')};
  min-height: ${getMinHeight({}, '0')};
  max-height: ${getMaxHeight({}, 'none')};
  background-color: ${getBackgroundColor({}, 'none')};

  ${breakpoint(1)`
    position: ${getProp('position')};
    top: ${getProp('offsetTop')}px;
    width: ${getWidth({}, '100%')};
    height: ${getHeight({}, '')};
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    padding-left: ${getPaddingLeft({}, '0')};
    margin-top: ${getMarginTop({}, '0')};
    margin-right: ${getMarginRight({}, '0')};
    margin-bottom: ${getMarginBottom({}, '0')};
    margin-left: ${getMarginLeft({}, '0')};
    min-height: ${getMinHeight({}, '0')};
    max-height: ${getMaxHeight({}, 'none')};
    background-color: ${getBackgroundColor({}, 'none')};
  `}
`;
StyledSection.defaultProps = {
  position: 'relative',
  offsetTop: 0,
};
const DEFAULT_TW = { semKey: 'section' };
const Section = (props) => {
  const { tw, position, offsetTop, children, adjustForScrollBar } = props;
  const mergedTW = useMemo(() => ({ ...DEFAULT_TW, ...tw }), []);
  const sectionRef = useRef();
  const _useAdjustForScrollBar = adjustForScrollBar
    ? useAdjustForScrollBar
    : () => undefined;
  _useAdjustForScrollBar(sectionRef);

  return (
    <StyledSection
      adjustForScrollBar
      tw={mergedTW}
      position={position}
      offsetTop={offsetTop}
      ref={sectionRef}
    >
      {children}
    </StyledSection>
  );
};

export default Section;
