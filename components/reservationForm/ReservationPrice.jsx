import { condition } from 'dataweaver';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledPrice = styled.div`
  display: block;
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  color: ${({ theme }) => theme.colors.mainText};
  line-height: 3em;

  ${condition(({ variant }) => variant === 'link')`
    font-size: ${({ theme }) => theme.fontSizes[1]}px;
    line-height: 1.5em;
    color: inherit;
    text-decoration: underline;
  `}
`;

const StyledAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.05em;

  ${breakpoint(1)`
    font-size: 20px;
    font-size: 1.25em;
  `}
`;

const StyledUnit = styled.span`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0.025em;
`;

const ReservationPrice = ({ price, unit, variant }) => (
  <StyledPrice variant={variant}>
    <StyledAmount>${price}</StyledAmount>
    <StyledUnit> / {unit}</StyledUnit>
  </StyledPrice>
);

export default ReservationPrice;
