import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

const StyledTitle = styled.h1`
  margin: 0;
  font-family: Poppins;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
  color: ${({ theme }) => theme.colors.mainText};

  ${condition(({ variant }) => variant === 'review')`
      font-size: ${({ theme }) => theme.fontSizes[3]}px;
  `}

  ${condition(({ variant }) => variant === 'card')`
    display: flex;
    align-items: center;
    color: #444649;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0.025em;
    text-align: left;
  `}
  

  ${breakpoint(1)`
    margin: 0;
    font-family: Poppins;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    color: ${({ theme }) => theme.colors.mainText};

    ${condition(({ variant }) => variant === 'review')`
      font-size: ${({ theme }) => theme.fontSizes[3]}px;
    `}
  `}
`;
const PropertyTitle = ({ title, variant }) => (
  <StyledTitle variant={variant}>{title}</StyledTitle>
);

export default PropertyTitle;
