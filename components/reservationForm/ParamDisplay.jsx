import styled from 'styled-components';
import { condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;

  ${breakpoint(1)`
    width: unset;
    
    ${condition(({ variant }) => variant === 'card')` 
      width: 220px;
      font-size: ${({ theme }) => theme.fontSizes[3]}px;
      padding-left: ${({ theme }) => theme.space[3]}px;
      padding-right: ${({ theme }) => theme.space[3]}px;
    `}
  `}
`;

const StyledHeading = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.heading[2]};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  line-height: 2em;
  margin: 0;

  ${condition(({ variant }) => variant === 'card')`
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    font-size: 16px;
  `}
`;
const StyledParam = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mainText};
  line-height: 2em;

  ${condition(({ variant }) => variant === 'card')`
    display: block;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
`}
`;
const ParamDisplay = ({ displayString, title, variant }) => (
  <StyledWrapper variant={variant}>
    <StyledHeading variant={variant}>{title}</StyledHeading>
    <StyledParam variant={variant}>{displayString}</StyledParam>
  </StyledWrapper>
);

export default ParamDisplay;
