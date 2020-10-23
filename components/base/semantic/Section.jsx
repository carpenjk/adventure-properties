import styled from 'styled-components';
import { getProp } from 'dataweaver';
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
} from 'themeweaver';

const StyledSection = styled.section`
  position: ${getProp('position')};
  top: ${getProp('offsetTop')}px;
  width: 100%;
  padding-top: ${(props) => getPaddingTop(props.semKey, '0')(props)};
  padding-right: ${(props) => getPaddingRight(props.semKey, '0')(props)};
  padding-bottom: ${(props) => getPaddingBottom(props.semKey, '0')(props)};
  padding-left: ${(props) => getPaddingLeft(props.semKey, '0')(props)};
  margin-top: ${(props) => getMarginTop(props.semKey, '0')(props)};
  margin-right: ${(props) => getMarginRight(props.semKey, '0')(props)};
  margin-bottom: ${(props) => getMarginBottom(props.semKey, '0')(props)};
  margin-left: ${(props) => getMarginLeft(props.semKey, '0')(props)};
  min-height: ${(props) => getMinHeight(props.semKey, '0')(props)};
  max-height: ${(props) => getMaxHeight(props.semKey, 'none')(props)};

  ${breakpoint(1)`
    position: ${getProp('position')};
    top: ${getProp('offsetTop')}px;
    padding-top: ${(props) => getPaddingTop(props.semKey, '0')(props)};
    padding-right: ${(props) => getPaddingRight(props.semKey, '0')(props)};
    padding-bottom: ${(props) => getPaddingBottom(props.semKey, '0')(props)};
    padding-left: ${(props) => getPaddingLeft(props.semKey, '0')(props)};
    margin-top: ${(props) => getMarginTop(props.semKey, '0')(props)};
    margin-right: ${(props) => getMarginRight(props.semKey, '0')(props)};
    margin-bottom: ${(props) => getMarginBottom(props.semKey, '0')(props)};
    margin-left: ${(props) => getMarginLeft(props.semKey, '0')(props)};
    min-height: ${(props) => getMinHeight(props.semKey, '0')(props)};
    max-height: ${(props) => getMaxHeight(props.semKey, 'none')(props)};
  `}
`;
StyledSection.defaultProps = {
  position: 'relative',
  offsetTop: 0,
};
const Section = (props) => {
  const { semKey, position, offsetTop, children } = props;
  return (
    <StyledSection semKey={semKey} position={position} offsetTop={offsetTop}>
      {children}
    </StyledSection>
  );
};

export default Section;
