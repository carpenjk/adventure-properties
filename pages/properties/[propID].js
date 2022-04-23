import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Head from 'next/head';
import { useState } from 'react';
import { fetchProperty } from '../../components/adapters/property/property';
import useLightbox from '../../components/hooks/UseLightbox';
import useReservation from '../../components/reservationForm/UseReservation';
import { Media, mediaStyles } from '../../Media';
import cmsClient from '../../Contentful';

import Lightbox from '../../components/lightbox/Lightbox';
import Section from '../../components/base/semantic/Section';
import BackButton from '../../components/base/BackButton';
import ClientOnly from '../../components/ClientOnly';
import usePictureTiles from '../../components/hooks/UsePictureTiles';
import Spacer from '../../components/base/Spacer';
import ReserveCTA from '../../components/reservationForm/ReserveCTA';
import Fixed from '../../components/base/layout/Fixed';
import FullScreenReservation from '../../components/reservationForm/FullScreenReservation';
import PropertyContent from '../../components/property/PropertyContent';
import Spinner from '../../components/base/Spinner';

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

//* *********** data fetchers ****************************/
export async function getStaticProps(context) {
  const property = await fetchProperty(context.params.propID);
  return {
    props: {
      property,
    },
  };
}

const SRC_SET_PARAMS = [
  { suffix: '?fit=fill&w=640&q=80', size: '640w' },
  { suffix: '?fit=fill&w=1000&q=80', size: '1000w' },
  { suffix: '?fit=fill&w=2000&q=80', size: '2000w' },
];

const LIGHTBOX_PRELOAD_COUNT = 3;
const POSITION_OFFSET = 0;

//* ********* Component *********************************/
const Property = ({ property }) => {
  // property data
  const { title, guests } = property || {};
  // reservation objects
  const { availability, reservation, reservationControl } = useReservation();
  const { error } = reservation;
  const { isInEditMode, setIsInEditMode, reserveReview } = reservationControl;
  const [showSpinner, setShowSpinner] = useState(false);

  // build array of lightbox images
  const getImgUrls = () => {
    let urls = [];
    const mainUrl = `http:${property.mainPhoto.fields.file.url}`;
    const addUrls = property.additionalPhotos.map(
      (photo) => `http:${photo.fields.file.url}`
    );
    urls = [mainUrl, ...addUrls];
    return urls;
  };

  const { lightbox, lightboxControl } = useLightbox({
    images: getImgUrls(),
    srcSetParams: SRC_SET_PARAMS,
    photoIndex: 0,
    isOpen: false,
  });

  const { images, photoIndex, isOpen: isLightboxOpen } = lightbox;
  const {
    handleLightboxClose,
    handleLightboxOpen,
    handleMoveNext,
    handleMovePrev,
    handlePhotoClick,
  } = lightboxControl;

  const PictureTiles = usePictureTiles({
    images: getImgUrls(),
    onOverlayClick: handleLightboxOpen,
    onPhotoClick: handlePhotoClick,
  });

  function handleReservationReview() {
    setShowSpinner(true);
    setIsInEditMode(false);
    reserveReview();
    if (error) {
      setShowSpinner(false);
    }
  }

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
      <>
        <BackButton path="/" />
        <Spacer vertical space="70px" />
        <Section
          semKey="property_images"
          position="relative"
          offsetTop={POSITION_OFFSET}
        >
          <Media lessThan="1">
            <ClientOnly>
              <Lightbox
                currIndex={photoIndex}
                isOpen={isLightboxOpen}
                images={images || []}
                imgCount={images.length}
                preloadCount={LIGHTBOX_PRELOAD_COUNT}
                showNavArrows={false}
                onOpen={handleLightboxOpen}
                onClose={handleLightboxClose}
                onMoveNext={handleMoveNext}
                onMovePrev={handleMovePrev}
              />
            </ClientOnly>
          </Media>
          <Media greaterThanOrEqual="1">
            <ClientOnly>
              <Lightbox
                currIndex={photoIndex}
                isOpen={isLightboxOpen}
                images={images || []}
                imgCount={images.length}
                preloadCount={LIGHTBOX_PRELOAD_COUNT}
                PictureTile={PictureTiles}
                onClose={handleLightboxClose}
                onMovePrev={handleMovePrev}
                onMoveNext={handleMoveNext}
              />
            </ClientOnly>
          </Media>
        </Section>
        <Section
          semKey="property_details"
          position="relative"
          offsetTop={POSITION_OFFSET}
        >
          <PropertyContent
            attributes={property}
            availability={availability}
            reservation={reservation}
            reservationControl={reservationControl}
            onReservationReview={handleReservationReview}
          />
        </Section>
        {isInEditMode && (
          <FullScreenReservation
            availability={availability}
            reservation={reservation}
            maxGuests={guests}
            control={reservationControl}
            isOpen={isInEditMode}
            onClose={() => setIsInEditMode(false)}
            onReview={handleReservationReview}
            showTitle
            title={title}
          />
        )}
        <Media lessThan="1">
          <Fixed bottom width="100%">
            <ReserveCTA
              title={title}
              maxGuests={guests}
              onReview={handleReservationReview}
            />
          </Fixed>
        </Media>
      </>
      {showSpinner && <Spinner message="Preparing Reservation" />}
    </>
  );
};

export default Property;
