import styled from 'styled-components';

const StyledReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const StyledHeading = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  line-height: 2em;
  margin: 0;
`;
const StyledParam = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: Open Sans;
  font-size: 16px;
  color: #444649;
  line-height: 2em;
`;
const ParamDisplay = ({ displayString, title }) => (
  <StyledReviewWrapper>
    <StyledHeading>{title}</StyledHeading>
    <StyledParam>{displayString}</StyledParam>
  </StyledReviewWrapper>
);

export default ParamDisplay;
