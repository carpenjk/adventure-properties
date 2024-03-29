import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import {
  Spacer,
  ContentContainer,
  CenterWithContent,
} from '@carpenjk/base/layout';
import { SpinnerContext } from '../../../components/spinner/SpinnerContext';
import { fetchProperty } from '../../../controllers/property/property';
import cmsClient from '../../../Contentful';
import { mediaStyles } from '../../../Media';
import useReservation from '../../../components/reservationForm/UseReservation';
import PropertyTitle from '../../../components/property/PropertyTitle';
import ReserveButtons from '../../../components/reservationForm/ReserveButtons';
import ReservationReview from '../../../components/reservationForm/ReservationReview';
import ReservationResponse from '../../../components/reservationForm/ReservationResponse';
import ReservationError from '../../../components/reservationForm/ReservationError';
import ReservationPicture from '../../../components/reservation/ReservationPicture';

//* *********** static data ****************************/
export async function getStaticPaths() {
  const properties = await cmsClient.getEntries({
    content_type: 'property',
  });

  const paths = properties.items.map((p) => ({
    params: { propID: p.sys.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const property = await fetchProperty(context.params.propID);
  return {
    props: {
      property: JSON.parse(JSON.stringify(property)),
    },
  };
}

const Reserve = ({ property }) => {
  const router = useRouter();
  const { propID } = router.query;
  const { setLoadingMessage } = useContext(SpinnerContext);
  const { reservation, reservationControl } = useReservation();
  const { error, response, isBlank } = reservation;
  const { reserve, setIsInEditMode, validate } = reservationControl;
  const { title, guests: maxGuests } = property || {};

  const isReservationError =
    (response && response.error && true) || (error && true);
  const isComplete = response && response.message && true;

  const mainUrl = `https:${property.mainPhoto.fields.file.url}`;

  function handleReserve() {
    setLoadingMessage('Completing Reservation');
    reserve(maxGuests);
  }

  function handleGoBack() {
    router.push({
      pathname: '/properties/[propID]',
      query: { propID },
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
        <title>{title}</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <ContentContainer tw={{ variant: 'reserve' }}>
        <CenterWithContent>
          <ReservationPicture url={mainUrl} alt={title} />
          <Spacer vertical space="8px" />
          <Link href={`/properties/${propID}`} passHref>
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
        </CenterWithContent>
      </ContentContainer>
    </>
  );
};

export default Reserve;
