import styled from 'styled-components';
import Head from 'next/head';
import { fetchProperty } from '../../../components/adapters/property/property';
import cmsClient from '../../../Contentful';
import { Media, mediaStyles } from '../../../Media';
import useReservation from '../../../components/reservationForm/UseReservation';
import InvoiceContent from '../../../components/reservationForm/InvoiceContent';
import InvoiceHeader from '../../../components/reservationForm/InvoiceHeader';
import HiddenReservationForm from '../../../components/reservationForm/HiddenReservationForm';
import ParamDisplay from '../../../components/reservationForm/ParamDisplay';
import PropertyTitle from '../../../components/property/PropertyTitle';
import Spacer from '../../../components/base/Spacer';
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

//* *********** static data ****************************/
export async function getStaticPaths() {
  const properties = await cmsClient.getEntries({
    content_type: 'property',
  });

  const paths = properties.items.map((p) => ({
    params: { id: p.sys.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const staticProps = await fetchProperty(context.params.id);
  return staticProps;
}

const Reserve = ({ propertyData }) => {
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
  const { reservation } = useReservation();
  console.log(
    '🚀 ~ file: reserve.js ~ line 87 ~ Reserve ~ reservation',
    reservation
  );
  const {
    arriveDate,
    departDate,
    guests,
    price,
    currSymbol,
    total,
    unit,
    unitAmount,
  } = reservation;

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit reservation');
  }

  const mediumModifiers = '?fit=fill&w=500&q=80';
  const smallModifiers = '?fit=fill&w=350&q=80';

  const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
  const img = {
    srcSet: `
      ${mainUrl}${smallModifiers} 350w,
      ${mainUrl}${mediumModifiers} 500w,
        `,
    src: `${mainUrl}${smallModifiers}`,
  };

  return (
    <>
      <Head>
        <title>Property</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main style={{ width: '100%' }}>
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
            <ParamDisplay
              title="Dates"
              displayString={`${arriveDate} - ${departDate}`}
            />
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
            <div className="inputData">
              <HiddenReservationForm onSubmit={handleSubmit} propID={id} />
            </div>
          </StyledInvoiceWrapper>
        </StyledContent>
      </main>
    </>
  );
};

export default Reserve;
