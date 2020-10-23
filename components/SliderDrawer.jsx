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

import Slide from './Slide';

const StyledSliderDrawer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  ${breakpoint(1)`
    flex-direction: row;
    justify-content: space-between;
    flex: none;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: visible;
    overflow-y: visible;
  `}
`;

const SliderDrawer = (props) => (
  <StyledSliderDrawer>
    <Slide {...props} />
  </StyledSliderDrawer>
);

export default SliderDrawer;
