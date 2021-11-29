import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import InvoiceContent from './InvoiceContent';
import InvoiceHeader from './InvoiceHeader';

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;

  ${breakpoint(1)`
    padding: 1px;
  `}
`;

const ReservePreview = (props) => {
  const { unit, price, showTitle, title, total, unitAmount } = props;

  return (
    <StyledPreview>
      {showTitle && (
        <InvoiceHeader unit={unit} price={price} title={title} showTitle />
      )}
      <InvoiceContent
        price={price}
        unit={unit}
        unitAmount={unitAmount}
        total={total}
      />
    </StyledPreview>
  );
};

export default ReservePreview;
