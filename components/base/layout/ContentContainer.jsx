import styled from 'styled-components';
import {
  breakpoint,
  getMaxWidth,
  getMinWidth,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getPaddingTop,
} from 'themeweaver';

const StyledContent = styled.div`
  padding-top: ${getPaddingTop({}, '16px')};
  padding-right: ${getPaddingRight({}, '16px')};
  padding-bottom: ${getPaddingBottom({}, '16px')};
  padding-left: ${getPaddingLeft({}, '16px')};
  width: 100%;
  min-width: ${getMinWidth({}, '0')};
  max-width: ${getMaxWidth({}, '1200px')};
  margin: auto;

  ${breakpoint(1)`
    padding-top: ${getPaddingTop({}, '16px')};
    padding-right: ${getPaddingRight({}, '16px')};
    padding-bottom: ${getPaddingBottom({}, '16px')};
    padding-left: ${getPaddingLeft({}, '16px')};
    width: 100%;
    min-width: ${getMinWidth({}, 'none')};
    max-width: ${getMaxWidth({}, '1200px')};
    margin: auto;
  `}
  ${breakpoint(2)`
    padding-top: ${getPaddingTop({}, '16px')};
    padding-right: ${getPaddingRight({}, '16px')};
    padding-bottom: ${getPaddingBottom({}, '16px')};
    padding-left: ${getPaddingLeft({}, '16px')};
    width: 100%;
    min-width: ${getMinWidth({}, '0')};
    max-width: ${getMaxWidth({}, '1200px')};
    margin: auto;
  `}
`;

const DEFAULT_TW = {
  semKey: 'content',
};

const ContentContainer = ({ children, tw }) => {
  const mergedTw = { ...DEFAULT_TW, ...tw };
  return <StyledContent tw={mergedTw}>{children}</StyledContent>;
};

export default ContentContainer;
