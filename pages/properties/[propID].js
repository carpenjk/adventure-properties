import Head from 'next/head';
import { useContext, useMemo } from 'react';
import { PictureTiles } from 'picture-tiles';
import { fetchProperty } from '../../components/adapters/property/property';
import useLightbox from '../../components/hooks/useLightbox';
import useReservation from '../../components/reservationForm/UseReservation';
import { Media, mediaStyles } from '../../Media';
import cmsClient from '../../Contentful';

import Lightbox from '../../components/lightbox/Lightbox';
import Section from '../../components/base/semantic/Section';
import BackButton from '../../components/base/BackButton';
import ClientOnly from '../../components/ClientOnly';
import Spacer from '../../components/base/Spacer';
import ReserveCTA from '../../components/reservationForm/ReserveCTA';
import Fixed from '../../components/base/layout/Fixed';
import FullScreenReservation from '../../components/reservationForm/FullScreenReservation';
import PropertyContent from '../../components/property/PropertyContent';
import { SpinnerContext } from '../../components/base/spinner/SpinnerContext';
import OverlayNavButton from '../../components/base/OverlayNavButton';
import createPictureTileImageProps from '../../utils/pictureTiles';
import { getImages } from '../../utils/property/property';
import { createImageSrcProps } from '../../utils/images/images';
import {
  LIGHTBOX_PRELOAD_COUNT,
  LIGHTBOX_SRCSET_PARAMS,
  LIGHTBOX_SRC_PARAMS,
  SHOW_NAV_ARROWS,
} from '../../utils/property/lightbox';

export const TOP_OFFSET = 0;

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

//* ********* Component *********************************/
const Property = ({ property }) => {
  // property data
  const { title, guests } = property || {};
  // reservation objects
  const { setLoadingMessage } = useContext(SpinnerContext);
  const { availability, reservation, reservationControl } = useReservation();
  const { isInEditMode, setIsInEditMode, reserveReview } = reservationControl;

  const propertyImages = useMemo(() => getImages(property), [property]);
  const ltboxImgs = propertyImages.map((img) => ({
    ...img,
    ...createImageSrcProps({
      urls: img.url,
      srcParams: LIGHTBOX_SRC_PARAMS,
      srcSetParams: LIGHTBOX_SRCSET_PARAMS,
    }),
  }));

  const { lightbox, lightboxControl } = useLightbox({
    images: ltboxImgs,
    // srcSetParams: SRC_SET_PARAMS,
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
          offsetTop={TOP_OFFSET}
        >
          <PictureTiles
            // {...pictureTileImgProps}
            {...createPictureTileImageProps(propertyImages)}
            minColWidth={['320px', '150px']}
            maxColWidth={['100%', '1fr']}
            rowHeight={['auto', '250px']}
            gridWidth={['100%']}
            maxGridWidth={['1300px']}
            imageFit={['contain', 'cover']}
            onPhotoClick={handlePhotoClick}
            overlayButton={{
              OverlayButton: (
                <OverlayNavButton onClick={handleLightboxOpen}>
                  More Photos
                </OverlayNavButton>
              ),
            }}
          />
          <ClientOnly>
            <Lightbox
              currIndex={photoIndex}
              isOpen={isLightboxOpen}
              images={images || []}
              imgCount={images.length}
              showNavArrows={SHOW_NAV_ARROWS}
              preloadCount={LIGHTBOX_PRELOAD_COUNT}
              onClose={handleLightboxClose}
              onMovePrev={handleMovePrev}
              onMoveNext={handleMoveNext}
            />
          </ClientOnly>
        </Section>
        <Section
          tw={{ variant: 'property_details' }}
          position="relative"
          offsetTop={TOP_OFFSET}
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
