import styled from 'styled-components';
import {
  getBackgroundColor,
  getColor,
  getWidth,
  getHeight,
  breakpoint,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getBorder,
  getBorderRadius,
  getFontFamily,
  getFontWeight,
  getFontSize,
  getLineHeight,
} from 'themeweaver';
import { condition } from 'dataweaver';

const StyledButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: ${(props) => getWidth(props.semKey, 'auto')};
  height: ${(props) => getHeight(props.semKey, 'auto')};
  color: ${(props) => getColor(props.semKey, 'white')};
  background-color: ${(props) => getBackgroundColor(props.semKey, '#E5707A')};
  padding-top: ${(props) => getPaddingTop(props.semKey, '1em')};
  padding-right: ${(props) => getPaddingRight(props.semKey, '2em')};
  padding-bottom: ${(props) => getPaddingBottom(props.semKey, '1em')};
  padding-left: ${(props) => getPaddingLeft(props.semKey, '2em')};
  border: ${(props) => getBorder(props.semKey, '2px solid #cdf7f6')};
  border-radius: ${(props) => getBorderRadius(props.semKey, '10px')};
  font-family: ${(props) => getFontFamily(props.semKey, 'inherit')};
  font-weight: ${(props) => getFontWeight(props.semKey, 'bold')};
  font-size: ${(props) => getFontSize(props.semKey, '18px')};
  line-height: ${(props) => getLineHeight(props.semKey, '21px')};

  &:hover {
    color: ${(props) => getColor(`${props.semKey}_hover`, '#E5707A')};
    background-color: ${(props) =>
      getBackgroundColor(`${props.semKey}_hover`, 'white')};
  }

  ${breakpoint(1)`
  width: ${(props) => getWidth(props.semKey, 'auto')(props, 1)};
  height: ${(props) => getHeight(props.semKey, 'auto')(props, 1)};
  color: ${(props) => getColor(props.semKey, 'white')(props, 1)};
  background-color: ${(props) =>
    getBackgroundColor(props.semKey, '#E5707A')(props, 1)};
  padding-top: ${(props) => getPaddingTop(props.semKey, '1em')(props, 1)};
  padding-right: ${(props) => getPaddingRight(props.semKey, '2em')(props, 1)};
  padding-bottom: ${(props) => getPaddingBottom(props.semKey, '1em')(props, 1)};
  padding-left: ${(props) => getPaddingLeft(props.semKey, '2em')(props, 1)};
  border: ${(props) => getBorder(props.semKey, '2px solid #cdf7f6')(props, 1)};
  border-radius: ${(props) => getBorderRadius(props.semKey, '10px')(props, 1)};
  font-family: ${(props) => getFontFamily(props.semKey, 'inherit')(props, 1)};
  font-weight: ${(props) => getFontWeight(props.semKey, 'bold')(props, 1)};
  font-size: ${(props) => getFontSize(props.semKey, '18px')(props, 1)};
  line-height: ${(props) => getLineHeight(props.semKey, '21px')(props, 1)};

  &:hover {
    color: ${(props) => getColor(`${props.semKey}_hover`, '#E5707A')};
    background-color: ${(props) =>
      getBackgroundColor(`${props.semKey}_hover`, 'white')};
  }
  ${condition('disabled')`
    &:hover {
      color: ${(props) => getColor(props.semKey, 'white')(props, 1)};
    background-color: ${(props) =>
      getBackgroundColor(props.semKey, '#E5707A')(props, 1)};
    }
  `}
  `}
`;

const ActionButton = ({ variant, children, ...rest }) => (
  <StyledButton {...rest} semKey={`button.${variant}`}>
    {children}
  </StyledButton>
);

ActionButton.defaultProps = {
  variant: 'action',
};
export default ActionButton;
