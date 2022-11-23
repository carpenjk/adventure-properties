import { Spacer } from '@carpenjk/base/layout';
import LineItem from './LineItem';
import InvoiceTotal from './InvoiceTotal';

const InvoiceContent = ({ price, unit, unitAmount, total }) => {
  const dPrice = price ? price.toLocaleString('en-US') : '0';
  const dUnitAmount = unitAmount ? unitAmount.toLocaleString('en-US') : '0';
  const dTotal = total ? total.toLocaleString('en-US') : '0';
  return (
    <>
      <LineItem
        description={`$${dPrice} x ${dUnitAmount} ${unit}`}
        amount={dTotal}
      />
      <Spacer vertical space={['16px', '32px']} />
      <LineItem description="Occupancy taxes and fees" amount={0} />
      <Spacer vertical space={['16px', '32px']} />
      <InvoiceTotal total={dTotal} />
    </>
  );
};

export default InvoiceContent;
