import styled from 'styled-components';
import {
  breakpoint,
  getColor,
  getFontFamily,
  getFontSize,
  getLetterSpacing,
  getLineHeight,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getPaddingTop,
} from 'themeweaver';
import { condition } from 'dataweaver';

const StyledDescription = styled.div`
  width: 100%;
  height: 20em;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${getColor('property_description', 'inherit')};
  font-family: ${getFontFamily('property_description', 'inherit')};
  font-size: ${getFontSize('property_description', 'inherit')};
  line-height: ${getLineHeight('property_description', 'initial')};
  letter-spacing: ${getLetterSpacing('property_description', 'initial')};
  padding-top: ${getPaddingTop('property_description', '32px')};
  padding-right: ${getPaddingRight('property_description', '320x')};
  padding-bottom: ${getPaddingBottom('property_description', '32px')};
  padding-left: ${getPaddingLeft('property_description', '32px')};

  ${condition('hide')`
    display: none;
  `}

  ${breakpoint(1)`
    width: unset;
  `}
`;

const PropertyDescription = ({ description, hide }) => (
  <StyledDescription hide={hide}>{description}</StyledDescription>
);

export default PropertyDescription;
