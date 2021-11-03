import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import Spacer from '../base/Spacer';
import LineItem from './LineItem';
import InvoiceTotal from './InvoiceTotal';

const Invoice = ({ price, unit, unitAmount }) => (
  <>
    <LineItem
      description={`$${price} x ${unitAmount} ${unit}${
        unitAmount > 1 ? 's' : ''
      }`}
      amount={105 * 9}
    />
    <Spacer vertical space={['16px', '32px']} />
    <LineItem description="Occupancy taxes and fees" amount={0} />
    <Spacer vertical space={['16px', '32px']} />
    <InvoiceTotal total={105 * 9} />
  </>
);

export default Invoice;
