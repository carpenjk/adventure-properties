import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

const StyledTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  color: ${({ theme }) => theme.colors.mainText};

  ${condition(({ variant }) => variant === 'review')`
      font-size: ${({ theme }) => theme.fontSizes[3]}px;
  `}

  ${condition(({ variant }) => variant === 'card')`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.mainText};
    font-size: 16px;
    font-weight: bold;
    line-height: 150%;
    letter-spacing: 0.025em;
    text-align: left;
  `}
  ${condition('asLink')`
    color: ${({ theme }) => theme.colors.link[0]};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.link[1]};
    }
  `}
  

  ${breakpoint(1)`
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]}px;

    ${condition(({ variant }) => variant === 'review')`
      font-size: ${({ theme }) => theme.fontSizes[3]}px;
    `}

    ${condition(({ variant }) => variant === 'card')`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.mainText};
    font-size: 16px;
    font-weight: bold;
    line-height: 150%;
    letter-spacing: 0.025em;
    text-align: left;
  `}
  `}
`;
const PropertyTitle = ({ title, variant, asLink }) => (
  <StyledTitle asLink={asLink} variant={variant}>
    {title}
  </StyledTitle>
);

export default PropertyTitle;
