import styled from 'styled-components';
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getMarginBottom,
  getMarginLeft,
  getMarginRight,
  getMarginTop,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getPaddingTop,
} from 'themeweaver';

const StyledHeader = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;

  h2 {
    font-family: ${getFontFamily('results_header', 'inherit')};
    font-weight: ${getFontWeight('results_header', 'initial')};
    font-size: ${getFontSize('results_header', '20px')};
    letter-spacing: ${getLetterSpacing('results_header', '0.05em')};
    color: ${getColor('results_header', 'initial')};
    padding-top: ${getPaddingTop('results_header', '1.5em')};
    padding-right: ${getPaddingRight('results_header', '0')};
    padding-bottom: ${getPaddingBottom('results_header', '1.5em')};
    padding-left: ${getPaddingLeft('results_header', '0')};
    margin-top: ${getMarginTop('results_header', '0')};
    margin-right: ${getMarginRight('results_header', '0')};
    margin-bottom: ${getMarginBottom('results_header', '0')};
    margin-left: ${getMarginLeft('results_header', '0')};
  }
`;
const StyledTopic = styled.span`
  color: ${getColor('results_topic', 'initial')};
`;
const ResultHeader = (props) => {
  const { prefix, topic } = props;
  return (
    <StyledHeader>
      <h2>
        <span>{prefix}</span>
        <span> </span>
        <StyledTopic>{topic}</StyledTopic>
      </h2>
    </StyledHeader>
  );
};

export default ResultHeader;
