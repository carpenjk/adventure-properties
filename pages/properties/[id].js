import styled from 'styled-components';
import Head from 'next/head';
import useSWR from 'swr';
import { Portal } from 'react-portal';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import dynamic from 'next/dynamic';
import useLightbox from '../../components/hooks/UseLightbox';
import clientPromise from '../../utils/mongodb';
import Lightbox from '../../components/Lightbox/Lightbox';
import { Media, mediaStyles } from '../../Media';
import cmsClient from '../../Contentful';

import Section from '../../components/base/semantic/Section';
import PictureTiles from '../../components/property/PictureTiles';
import PropertyDetailCategory from '../../components/property/PropertyDetailCategory';
import AttributeList from '../../components/property/AttributeList';
import AttributesSummary from '../../components/property/AttributesSummary';
import ReservationForm from '../../components/reservationForm/ReservationForm';
import BackButton from '../../components/base/BackButton';
import ClientOnly from '../../components/ClientOnly';

const PROP_ID = '3RcXEiv8ook0DOHBrNniCA';

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

const StyledSpacer = styled.div`
  height: ${getProp('space')};
  width: 100%;
`;

async function fetchProperty(id) {
  const property = await cmsClient.getEntry(id);
  return property;
}

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
  const cmsProperties = await fetchProperty(context.params.id);
  // const session = await getSession({ req: context.req });
  // console.log(context);

  const dbClient = await clientPromise;

  const dbProperties = await dbClient
    .db()
    .collection('properties')
    .findOne({ cmsID: context.params.id });

  return {
    props: {
      propertyData: {
        ...cmsProperties,
        id: context.params.id,
        dbData: JSON.parse(JSON.stringify(dbProperties)),
      },
    },
  };
}

const fetchClientSideData = (url) => fetch(url).then((r) => r.json());

//* ********* Component *********************************/
const Property = ({ propertyData }) => {
  const LIGHTBOX_PRELOAD_COUNT = 3;

  // const { data: availability, error } = useSWR(
  //   `/api/properties/${propertyData.id}/availability`,
  //   fetchClientSideData
  // );
  const lightbox = useLightbox({ images: [], photoIndex: 0, isOpen: false });

  // ! Remove and add to props

  const positionOffset = 0;

  // Build list of image urls for Lightbox
  useEffect(() => {
    if (propertyData && propertyData.fields) {
      const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
      const addUrls = propertyData.fields.additionalPhotos.map(
        (photo) => `http:${photo.fields.file.url}`
      );
      // setImages([mainUrl, ...addUrls]);
      lightbox.setImages([mainUrl, ...addUrls]);
    }
  }, [propertyData, lightbox.setImages]);

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

  const LightboxTiles = useCallback(() => {
    const displayCount = {
      1: 1,
      2: 1,
      3: 3,
      4: 3,
      5: 5,
    };
    function getUrls() {
      const pCountLookup =
        images.length > displayCount.length
          ? displayCount.length
          : images.length;
      const pCount = displayCount[pCountLookup];
      const displayImgs = images.slice(0, pCount);
      const mainModifiers = '?fit=fill&w=800&h=533';
      const modifiers = '?fit=fill&w=500&h=333';

      function buildModifiedUrls(photo, i) {
        if (i === 1) {
          return `${photo}${mainModifiers}`;
        }
        return `${photo}${modifiers}`;
      }
      return displayImgs.map((photo, i) => buildModifiedUrls(photo, i));
    }
    const tileImageUrls = getUrls();
    return (
      <PictureTiles onOverlayClick={handleLightboxOpen}>
        {tileImageUrls.map((img, i) => (
          <img
            loading="lazy"
            key={i}
            src={img}
            alt="property"
            onClick={() => handlePhotoClick(i)}
          />
        ))}
      </PictureTiles>
    );
  }, [images]);

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
          <StyledSpacer space="70px" />
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
                  PictureTile={LightboxTiles}
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
                <h1>{title}</h1>
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
                <ReservationForm />
              </Media>
            </StyledContent>
          </Section>
          <Media lessThan="1">
            <Portal isOpen>
              <StyledSpacer space="90px" />
              <ReservationForm />
            </Portal>
          </Media>
        </>
      )}
    </>
  );
};

export default Property;
