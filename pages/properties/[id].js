import styled from 'styled-components';
import Head from 'next/head';

import { useEffect, useCallback, useMemo } from 'react';
import { breakpoint } from 'themeweaver';
import dynamic from 'next/dynamic';
import { fetchProperty } from '../../components/adapters/property/property';
import useLightbox from '../../components/hooks/UseLightbox';
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

const Location = dynamic(() => import('../../components/property/Location'), {
  ssr: false,
});

const StyledContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.space[3]}px;
  width: 100%;
  max-width: 1200px;
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex 0 1 770px;
  width: 100%;
  
  
  > h1 {
    margin: 0;
    font-family: Poppins;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    color: ${({ theme }) => theme.colors.mainText};

  }
  > * {
    padding-bottom: ${({ theme }) => theme.space[5]}px;
  }

  ${breakpoint(1)`
    min-width: 400px;
    padding: ${({ theme }) => theme.space[5]}px;
  `}
`;

const StyledDescription = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;

  font-family: Open Sans;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 150%;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.mainText};
`;

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

//* ********* Component *********************************/
const Property = ({ propertyData }) => {
  console.log(
    '🚀 ~ file: [id].js ~ line 105 ~ Property ~ propertyData',
    propertyData
  );
  const reservationData = {
    price: 104,
    unit: 'night',
    unitAmount: 8,
    availability: undefined,
  };

  const { price, unit, unitAmount, availability } = reservationData;
  // property data
  const { id } = propertyData;
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

  const LIGHTBOX_PRELOAD_COUNT = 3;

  const lightbox = useLightbox({ images: [], photoIndex: 0, isOpen: false });
  const {
    images,
    photoIndex,
    isOpen: isLightboxOpen,
    handleLightboxClose,
    handleLightboxOpen,
    handleMoveNext,
    handleMovePrev,
    handlePhotoClick,
  } = lightbox;

  // const { data: availability, error } = useSWR(
  //   `/api/properties/${propertyData.id}/availability`,
  //   fetchClientSideData
  // );

  // ! Remove and add to props
  const positionOffset = 0;

  // Build list of image urls for Lightbox
  useEffect(() => {
    if (propertyData && propertyData.fields) {
      const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
      const addUrls = propertyData.fields.additionalPhotos.map(
        (photo) => `http:${photo.fields.file.url}`
      );
      lightbox.setImages([mainUrl, ...addUrls]);
    }
  }, [propertyData, lightbox.setImages]);

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
    images,
    onOverlayClick: handleLightboxOpen,
    onPhotoClick: handlePhotoClick,
  });

  const largeModifiers = '?fit=fill&w=2000&q=80';
  const mediumModifiers = '?fit=fill&w=1000&q=80';
  const smallModifiers = '?fit=fill&w=640&q=80';

  const imgObj = useMemo(
    () =>
      images.map((url) => ({
        srcSet: `
          ${url}${smallModifiers} 640w,
          ${url}${mediumModifiers} 1000w,
          ${url}${largeModifiers} 2000w
            `,
        src: url,
      })),
    [images]
  );

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
            offsetTop={positionOffset}
          >
            <Media lessThan="1">
              <ClientOnly>
                <Lightbox
                  currIndex={photoIndex}
                  isOpen={isLightboxOpen}
                  images={imgObj || []}
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
                  images={imgObj || []}
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
            offsetTop={positionOffset}
          >
            <StyledContent>
              <StyledDetails>
                <PropertyTitle title={title} />
                <AttributesSummary
                  guests={guests}
                  beds={beds}
                  baths={baths}
                  propertyType={propertyType}
                />
                <StyledDescription>{description}</StyledDescription>
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
              </StyledDetails>
              <Media greaterThanOrEqual="1">
                <ReservationForm title={title} />
              </Media>
            </StyledContent>
          </Section>
          <Media lessThan="1">
            <Fixed bottom width="100%">
              <ReserveCTA
                price={price}
                unit={unit}
                unitAmount={unitAmount}
                title={title}
                availability={availability}
              />
            </Fixed>
          </Media>
        </>
      )}
    </>
  );
};

export default Property;
