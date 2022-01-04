import styled from 'styled-components';
import { signIn, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchProperty } from '../../../components/adapters/property/property';
import cmsClient from '../../../Contentful';
import { Media, mediaStyles } from '../../../Media';
import useReservation from '../../../components/reservationForm/UseReservation';
import InvoiceContent from '../../../components/reservationForm/InvoiceContent';
import ParamDisplay from '../../../components/reservationForm/ParamDisplay';
import PropertyTitle from '../../../components/property/PropertyTitle';
import Spacer from '../../../components/base/Spacer';
import { theme } from '../../../theme';
import ActionButton from '../../../components/base/ActionButton';
import LinkButton from '../../../components/base/LinkButton';

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

const StyledResponse = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: 2px solid ${({ theme }) => theme.colors.action[0]};
  border-radius: 5px;
  padding: 16px;

  font-family: ${({ theme }) => theme.fonts.openSans};
  color: ${({ theme, isError }) =>
    !isError ? theme.colors.primary : theme.colors.action[1]};
  font-size: 18px;
  font-weight: bold;
`;

const StyledEditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;

  > button {
    font-family: ${({ theme }) => theme.fonts.openSans};
    letter-spacing: 0.08em;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.link[0]};
  }
  > button:hover {
    color: ${({ theme }) => theme.colors.link[1]};
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
  const [session, loading] = useSession();
  const { id } = propertyData;
  const { title, guests: maxGuests } = propertyData.fields || {};
  const { reservation, reservationControl } = useReservation();
  const router = useRouter();

  const {
    dateRangeString,
    guests,
    price,
    isCompleted,
    unit,
    unitAmount,
    response,
  } = reservation;

  const { reserve, setIsInEditMode } = reservationControl;

  const isReservationError = response && response.error;

  function handleReserve() {
    // event.preventDefault();
    reserve(maxGuests);
  }

  function handleGoBack() {
    router.push({
      pathname: '/properties/[id]',
      query: { id },
    });
  }

  function handleEdit() {
    setIsInEditMode(true);
    handleGoBack();
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
              total={price.total}
            />
            <Spacer vertical space="16px" />
            {response && (
              <>
                <StyledResponse isError={response && response.error}>
                  {response.message ? response.message : response.error}
                </StyledResponse>
                <Spacer vertical space="8px" />
              </>
            )}
            {!isCompleted && (
              <>
                <StyledEditWrapper>
                  <LinkButton onClick={handleEdit}>edit reservation</LinkButton>
                </StyledEditWrapper>
                <Spacer vertical space="20px" />
                <div className="inputData">
                  <ActionButton
                    type="submit"
                    variant="reserve"
                    onClick={!isReservationError ? handleReserve : handleGoBack}
                  >
                    {!isReservationError ? 'Reserve' : 'Go Back'}
                  </ActionButton>
                </div>
              </>
            )}
          </StyledInvoiceWrapper>
        </StyledContent>
      </main>
    </>
  );
};

export default Reserve;
