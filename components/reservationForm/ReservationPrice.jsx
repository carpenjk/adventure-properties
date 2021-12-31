import { condition, getProp } from 'dataweaver';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledPrice = styled.div`
  display: block;
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;

  line-height: 3em;

  ${condition(({ variant }) => variant === 'small')`
    font-size: ${({ theme }) => theme.fontSizes[1]}px;
    line-height: 1.5em;
  `}
`;

const StyledAmount = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.05em;

  color: #000000;

  ${breakpoint(1)`
    font-size: 20px;
    font-size: 1.25em;
  `}
`;

const StyledUnit = styled.span`
  font-family: Open Sans;
  font-weight: normal;
  line-height: 150%;
  letter-spacing: 0.025em;
  color: #000000;
`;

const ReservationPrice = ({ price, unit, variant }) => (
  <StyledPrice variant={variant}>
    <StyledAmount>${price}</StyledAmount>
    <StyledUnit> / {unit}</StyledUnit>
  </StyledPrice>
);

export default ReservationPrice;
