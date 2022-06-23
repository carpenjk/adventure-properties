import Head from 'next/head';
import { useContext, useMemo } from 'react';
import { fetchProperty } from '../../components/adapters/property/property';
import useLightbox from '../../components/hooks/UseLightbox';
import useReservation from '../../components/reservationForm/UseReservation';
import { Media, mediaStyles } from '../../Media';
import cmsClient from '../../Contentful';

import Lightbox from '../../components/lightbox/Lightbox';
import Section from '../../components/base/semantic/Section';
import BackButton from '../../components/base/BackButton';
import ClientOnly from '../../components/ClientOnly';
import PictureTiles from '../../components/pictureTiles/PictureTiles';
import Spacer from '../../components/base/Spacer';
import ReserveCTA from '../../components/reservationForm/ReserveCTA';
import Fixed from '../../components/base/layout/Fixed';
import FullScreenReservation from '../../components/reservationForm/FullScreenReservation';
import PropertyContent from '../../components/property/PropertyContent';
import { SpinnerContext } from '../../components/base/spinner/SpinnerContext';

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
      property: JSON.parse(JSON.stringify(property)),
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

const getImgUrls = (property) => {
  let urls = [];
  const mainUrl = `http:${property.mainPhoto.fields.file.url}`;
  const addUrls = property.additionalPhotos.map(
    (photo) => `http:${photo.fields.file.url}`
  );
  urls = [mainUrl, ...addUrls];
  return urls;
};

// build array of lightbox images
const getImgProps = (urls) =>
  urls.map((url) => ({
    src: url,
  }));

//* ********* Component *********************************/
const Property = ({ property }) => {
  // property data
  const { title, guests } = property || {};
  // reservation objects
  const { setLoadingMessage } = useContext(SpinnerContext);
  const { availability, reservation, reservationControl } = useReservation();
  const { isInEditMode, setIsInEditMode, reserveReview } = reservationControl;

  const imgUrls = useMemo(() => getImgUrls(property), [property]);
  const lightboxImages = useMemo(() => getImgProps(imgUrls), [imgUrls]);
  const { lightbox, lightboxControl } = useLightbox({
    images: lightboxImages,
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

  // const PictureTiles = PictureTiles({
  //   images: imgUrls,
  //   onOverlayClick: handleLightboxOpen,
  //   onPhotoClick: handlePhotoClick,
  // });

  function handleReservationReview() {
    setIsInEditMode(false);
    setLoadingMessage('Preparing Reservation');
    reserveReview();
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
        <BackButton />
        <Spacer vertical space="60px" />
        <Section
          tw={{ variant: 'property_images' }}
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
                showNavArrows="hover"
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
                pictureTile={
                  <PictureTiles
                    images={imgUrls}
                    onOverlayClick={handleLightboxOpen}
                    onPhotoClick={handlePhotoClick}
                  />
                }
                onClose={handleLightboxClose}
                onMovePrev={handleMovePrev}
                onMoveNext={handleMoveNext}
              />
            </ClientOnly>
          </Media>
        </Section>
        <Section
          tw={{ variant: 'property_details' }}
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
          <Fixed bottom offset="55px" useFillerElement width="100%">
            <ReserveCTA
              title={title}
              maxGuests={guests}
              onReview={handleReservationReview}
            />
          </Fixed>
        </Media>
      </>
    </>
  );
};

export default Property;
