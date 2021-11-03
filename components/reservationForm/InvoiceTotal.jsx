import styled from 'styled-components';
import LineItem from './LineItem';

const StyledInvoiceTotal = styled.div`
  border-top: 1px solid #979797;
  > * {
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.025em;
  }
`;

const InvoiceTotal = ({ total }) => (
  <StyledInvoiceTotal>
    <LineItem description="Total" amount={total} />
  </StyledInvoiceTotal>
);

export default InvoiceTotal;
