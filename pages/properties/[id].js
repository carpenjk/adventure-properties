import Head from 'next/head';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { fetchProperty } from '../../components/adapters/property/property';
import useLightbox from '../../components/hooks/UseLightbox';
import useReservation from '../../components/reservationForm/UseReservation';
import { Media, mediaStyles } from '../../Media';
import cmsClient from '../../Contentful';

import Lightbox from '../../components/Lightbox/Lightbox';
import Section from '../../components/base/semantic/Section';
import PropertyDetailCategory from '../../components/property/PropertyDetailCategory';
import AttributeList from '../../components/property/AttributeList';
import AttributesSummary from '../../components/property/AttributesSummary';
import ReservationForm from '../../components/reservationForm/ReservationForm';
import BackButton from '../../components/base/BackButton';
import ClientOnly from '../../components/ClientOnly';
import usePictureTiles from '../../components/hooks/UsePictureTiles';
import Spacer from '../../components/base/Spacer';
import ReserveCTA from '../../components/reservationForm/ReserveCTA';
import Fixed from '../../components/base/layout/Fixed';
import PropertyTitle from '../../components/property/PropertyTitle';
import FullScreenReservation from '../../components/reservationForm/FullScreenReservation';
import PropertyContent from '../../components/property/PropertyContent';
import PropertyDetails from '../../components/property/PropertyDetails';
import PropertyDescription from '../../components/property/PropertyDescription';

const Location = dynamic(() => import('../../components/property/Location'), {
  ssr: false,
});

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

//* *********** data fetchers ****************************/
export async function getStaticProps(context) {
  const staticProps = await fetchProperty(context.params.id);
  return staticProps;
}

const SRC_SET_PARAMS = [
  { suffix: '?fit=fill&w=640&q=80', size: '640w' },
  { suffix: '?fit=fill&w=1000&q=80', size: '1000w' },
  { suffix: '?fit=fill&w=2000&q=80', size: '2000w' },
];

//* ********* Component *********************************/
const Property = ({ propertyData }) => {
  // property data
  const {
    beds,
    baths,
    title,
    description,
    guests,
    location,
    city,
    state,
    propertyType,
  } = propertyData.fields || {};

  const { availability, reservation, reservationControl } = useReservation();

  const { isInEditMode, setIsInEditMode } = reservationControl;

  const LIGHTBOX_PRELOAD_COUNT = 3;
  const POSITION_OFFSET = 0;

  const getImgUrls = () => {
    let urls = [];
    if (propertyData && propertyData.fields) {
      const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
      const addUrls = propertyData.fields.additionalPhotos.map(
        (photo) => `http:${photo.fields.file.url}`
      );
      urls = [mainUrl, ...addUrls];
    }
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

  //* ******* helpers ****************
  const getAttributeList = useCallback(
    (attribute) => {
      if (
        !propertyData ||
        !propertyData.fields ||
        !propertyData.fields[attribute]
      ) {
        return [];
      }
      return propertyData.fields[attribute].map((item) => (
        <li key={item}>{item}</li>
      ));
    },
    [propertyData]
  );

  const getNearbyActivities = useCallback(() => {
    if (
      !propertyData.dbData ||
      !propertyData.dbData.nearbyActivities ||
      propertyData.dbData.nearbyActivities.length === 0
    ) {
      return [];
    }
    return propertyData.dbData.nearbyActivities.map((item) => (
      <li key={item}>{item}</li>
    ));
  }, [propertyData.dbData]);

  const PictureTiles = usePictureTiles({
    images: getImgUrls(),
    onOverlayClick: handleLightboxOpen,
    onPhotoClick: handlePhotoClick,
  });

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
      {/* Loading placeholder */}
      {!propertyData.fields && (
        <div style={{ position: 'relative', height: '100vh' }}>loading</div>
      )}
      {propertyData.fields && (
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
            <PropertyContent>
              <PropertyDetails>
                <PropertyTitle title={title} />
                <AttributesSummary
                  guests={guests}
                  beds={beds}
                  baths={baths}
                  propertyType={propertyType}
                />
                <PropertyDescription>{description}</PropertyDescription>
                <PropertyDetailCategory title="Location">
                  <Location
                    location={location}
                    locationName={`${city}, ${state}`}
                  />
                </PropertyDetailCategory>
                <PropertyDetailCategory title="Amenities">
                  <AttributeList>{getAttributeList('amenities')}</AttributeList>
                </PropertyDetailCategory>
                <PropertyDetailCategory title="Experience">
                  <AttributeList>
                    {getAttributeList('experience')}
                  </AttributeList>
                </PropertyDetailCategory>
                <PropertyDetailCategory title="Nearby Activities">
                  <AttributeList>{getNearbyActivities()}</AttributeList>
                </PropertyDetailCategory>
                <PropertyDetailCategory title="Availability">
                  <AttributeList>
                    {getAttributeList('availability')}
                  </AttributeList>
                </PropertyDetailCategory>
              </PropertyDetails>
              <Media greaterThanOrEqual="1">
                <ReservationForm
                  availability={availability}
                  reservation={reservation}
                  control={reservationControl}
                  title={title}
                  maxGuests={guests}
                />
              </Media>
            </PropertyContent>
          </Section>
          {isInEditMode && (
            <FullScreenReservation
              availability={availability}
              reservation={reservation}
              control={reservationControl}
              isOpen={isInEditMode}
              onClose={() => setIsInEditMode(false)}
              title={title}
              showTitle
            />
          )}
          <Media lessThan="1">
            <Fixed bottom width="100%">
              <ReserveCTA title={title} maxGuests={guests} />
            </Fixed>
          </Media>
        </>
      )}
    </>
  );
};

export default Property;
