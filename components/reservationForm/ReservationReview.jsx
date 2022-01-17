import { theme } from '../../theme';
import InvoiceContent from './InvoiceContent';
import Spacer from '../base/Spacer';
import ParamDisplay from './ParamDisplay';
import ReviewContainer from './ReviewContainer';

const ReservationReview = ({ reservation }) => {
  const { dateRangeString, guests, price, unit, unitAmount } = reservation;

  const reviewDateRangeString = dateRangeString;
  const reviewGuests = guests;
  const reviewAvgPrice = price.avg;
  const reviewTotalPrice = price.total;

  return (
    <ReviewContainer>
      <ParamDisplay title="Dates" displayString={reviewDateRangeString} />
      <Spacer vertical space="8px" />
      <Spacer vertical space="4px" background={theme.colors.tertiary} />
      <Spacer vertical space="8px" />
      <ParamDisplay title="Guests" displayString={`${reviewGuests} Guests`} />
      <Spacer vertical space="8px" />
      <Spacer vertical space="4px" background={theme.colors.tertiary} />
      <Spacer vertical space="8px" />
      <InvoiceContent
        price={reviewAvgPrice}
        unit={unit}
        unitAmount={unitAmount}
        total={reviewTotalPrice}
      />
      <Spacer vertical space="16px" />
    </ReviewContainer>
  );
};

export default ReservationReview;
