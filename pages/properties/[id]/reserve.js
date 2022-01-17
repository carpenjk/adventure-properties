import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useEffect } from 'react';
import { fetchProperty } from '../../../components/adapters/property/property';
import cmsClient from '../../../Contentful';
import { mediaStyles } from '../../../Media';
import useReservation from '../../../components/reservationForm/UseReservation';
import PropertyTitle from '../../../components/property/PropertyTitle';
import ReserveButtons from '../../../components/reservationForm/ReserveButtons';
import ReservationReview from '../../../components/reservationForm/ReservationReview';
import ReservationResponse from '../../../components/reservationForm/ReservationResponse';
import ReservationError from '../../../components/reservationForm/ReservationError';
import Spacer from '../../../components/base/Spacer';

const StyledContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
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
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();
  const { reservation, reservationControl } = useReservation();
  const { error, response, isBlank } = reservation;
  const { reserve, setIsInEditMode, validate } = reservationControl;
  const { title, guests: maxGuests } = propertyData || {};

  const isReservationError =
    (response && response.error && true) || (error && true);
  const isComplete = response && response.message && true;

  const mediumModifiers = '?fit=fill&w=500&q=80';
  const smallModifiers = '?fit=fill&w=350&q=80';

  const mainUrl = `http:${propertyData.mainPhoto.fields.file.url}`;
  const img = {
    srcSet: `
      ${mainUrl}${smallModifiers} 350w,
      ${mainUrl}${mediumModifiers} 500w,
        `,
    src: `${mainUrl}${smallModifiers}`,
  };

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

  useEffect(() => {
    validate();
  }, [validate]);

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
          <Spacer vertical space="8px" />
          <Link href={`/properties/${id}`} passHref>
            <a>
              <PropertyTitle title={title} variant="review" asLink />
            </a>
          </Link>
          {/* reservation being reviewed */}
          {!response && !error && (
            <ReservationReview
              reservation={reservation}
              control={reservationControl}
              maxGuests={maxGuests}
              title={title}
            />
          )}
          {/* reservation attempted */}
          {response && <ReservationResponse response={response} />}
          {/* reservation refreshed */}
          {!response && error && (
            <ReservationError error={error} userRefresh={isBlank} />
          )}
          <ReserveButtons
            reserveDisabled={isReservationError}
            showEdit={!isComplete}
            showReserve={!isComplete}
            isError={isReservationError}
            onEdit={handleEdit}
            onReserve={handleReserve}
            onBack={handleGoBack}
          />
        </StyledContent>
      </main>
    </>
  );
};

export default Reserve;
