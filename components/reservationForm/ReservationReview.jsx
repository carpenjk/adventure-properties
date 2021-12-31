import styled from 'styled-components';
import { signIn, useSession } from 'next-auth/client';
import InvoiceContent from '../../../components/reservationForm/InvoiceContent';
import HiddenReservationForm from '../../../components/reservationForm/HiddenReservationForm';
import ParamDisplay from '../../../components/reservationForm/ParamDisplay';
import PropertyTitle from '../../../components/property/PropertyTitle';
import Spacer from '../base/Spacer';
import { theme } from '../../../theme';

const StyledContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  align-items: center;
  justify-content: center;
`;
const StyledImgWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width 500px;

  img {
    touch-action: pinch-zoom;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledInvoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 16px;
  max-width: 500px;
  > .inputData {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const ReservationReview = ({ propertyData, reservation }) => {
  const [session, loading] = useSession();
  const { id } = propertyData;
  const {
    beds,
    baths,
    title,
    description,
    guests: maxGuests,
    location,
    city,
    state,
    propertyType,
  } = propertyData.fields || {};

  const {
    arriveDate,
    departDate,
    dateRangeString,
    guests,
    price,
    currSymbol,
    total,
    unit,
    unitAmount,
  } = reservation;

  const mediumModifiers = '?fit=fill&w=500&q=80';
  const smallModifiers = '?fit=fill&w=350&q=80';

  // image helpers
  const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
  const img = {
    srcSet: `
      ${mainUrl}${smallModifiers} 350w,
      ${mainUrl}${mediumModifiers} 500w,
        `,
    src: `${mainUrl}${smallModifiers}`,
  };
  return (
    <StyledContent>
      <StyledImgWrapper key={img.src}>
        <picture>
          <source srcSet={img.srcSet} />
          <img src={img.src} alt="description" />
        </picture>
      </StyledImgWrapper>
      <StyledInvoiceWrapper>
        <PropertyTitle title={title} variant="review" />
        <Spacer vertical space="8px" />
        <Spacer vertical space="4px" background={theme.colors.tertiary} />
        <Spacer vertical space="8px" />
        <ParamDisplay title="Dates" displayString={dateRangeString} />
        <Spacer vertical space="8px" />
        <Spacer vertical space="4px" background={theme.colors.tertiary} />
        <Spacer vertical space="8px" />
        <ParamDisplay title="Guests" displayString={`${guests} Guests`} />
        <Spacer vertical space="8px" />
        <Spacer vertical space="4px" background={theme.colors.tertiary} />
        <Spacer vertical space="8px" />
        <InvoiceContent
          price={price.avg}
          unit={unit}
          unitAmount={unitAmount}
          total={total}
        />
        <Spacer vertical space="16px" />
        {/* <div className="inputData">
          <HiddenReservationForm onSubmit={handleSubmit} propID={id} />
        </div> */}
      </StyledInvoiceWrapper>
    </StyledContent>
  );
};

export default ReservationReview;
