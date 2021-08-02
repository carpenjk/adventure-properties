import styled from 'styled-components';
import { condition } from 'dataweaver';
import {
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

const StyledDescription = styled.div`
  width: 100%;
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
`;

const PropertyDescription = ({ description, hide }) => (
  <StyledDescription hide={hide}>{description}</StyledDescription>
);

export default PropertyDescription;
