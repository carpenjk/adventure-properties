import styled from 'styled-components';
import {
  getMaxWidth,
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
  max-width: ${getMaxWidth({}, '1200px')};
  margin: auto;
`;

const DEFAULT_TW = {
  semKey: 'content',
};

const ContentContainer = ({ children, tw }) => {
  const mergedTw = { ...DEFAULT_TW, ...tw };
  return <StyledContent tw={mergedTw}>{children}</StyledContent>;
};

export default ContentContainer;
