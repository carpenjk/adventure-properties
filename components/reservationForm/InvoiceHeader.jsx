import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import ReservationPrice from './ReservationPrice';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const StyledInvoiceTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.OpenSans};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  font-weight: bold;

  ${breakpoint(1)`
  font-size: 20px;
  `}
`;

const InvoiceHeader = ({ showTitle, title, price, unit }) => (
  <StyledHeader>
    {showTitle && <StyledInvoiceTitle>{title}</StyledInvoiceTitle>}
    <ReservationPrice variant="standard" price={price} unit={unit} />
  </StyledHeader>
);

export default InvoiceHeader;
