import Spacer from '../base/Spacer';
import LineItem from './LineItem';
import InvoiceTotal from './InvoiceTotal';

const InvoiceContent = ({ price, unit, unitAmount, total }) => (
  <>
    <LineItem
      description={`$${price} x ${unitAmount} ${unit}`}
      amount={total}
    />
    <Spacer vertical space={['16px', '32px']} />
    <LineItem description="Occupancy taxes and fees" amount={0} />
    <Spacer vertical space={['16px', '32px']} />
    <InvoiceTotal total={total} />
  </>
);

export default InvoiceContent;
