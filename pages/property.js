import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import { useState, useEffect, useCallback } from 'react';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import dynamic from 'next/dynamic';
import Lightbox from '../components/Lightbox/Lightbox';
import { Media, mediaStyles } from '../Media';
import client from '../Contentful';
import { GlobalStyles } from '../styles/global/base';
import { theme } from '../theme';

import Header from '../components/base/semantic/Header';
import Section from '../components/base/semantic/Section';
import Navbar from '../components/navbar/Navbar';
import PageFooter from '../components/footer/PageFooter';
import PictureTiles from '../components/property/PictureTiles';
import PropertyDetailCategory from '../components/property/PropertyDetailCategory';
// import Location from '../components/property/Location';
import AttributeList from '../components/property/AttributeList';
import AttributesSummary from '../components/property/AttributesSummary';
import ReservationForm from '../components/reservationForm/ReservationForm';
import BackButton from '../components/base/BackButton';

import { footerNavData } from '../data/data';

const Location = dynamic(() => import('../components/property/Location'), {
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

const Property = (props) => {
  const [propertyData, setPropertyData] = useState({});
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);

  const LIGHTBOX_PRELOAD_COUNT = 3;

  // ! Remove and add to props
  const propID = '3RcXEiv8ook0DOHBrNniCA';

  const positionOffset = 0;

  // retrieve data
  async function fetchProperty() {
    const property = await client.getEntry(propID);
    return property;
  }

  useEffect(() => {
    async function getProperty() {
      const property = await fetchProperty();
      setPropertyData(property);
    }
    getProperty();
  }, []);

  // Build list of image urls for Lightbox
  useEffect(() => {
    if (propertyData && propertyData.fields) {
      console.log('propertyData:', propertyData);
      const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
      const addUrls = propertyData.fields.additionalPhotos.map(
        (photo) => `http:${photo.fields.file.url}`
      );

      setImages([mainUrl, ...addUrls]);
    }
  }, [propertyData]);

  // helpers
  function getUrls() {
    const firstFive = images.slice(0, 5);
    const mainModifiers = '?fit=fill&w=800&h=533';
    const modifiers = '?fit=fill&w=500&h=333';

    function buildModifiedUrls(photo, i) {
      if (i === 1) {
        return `${photo}${mainModifiers}`;
      }
      return `${photo}${modifiers}`;
    }
    return firstFive.map((photo, i) => buildModifiedUrls(photo, i));
  }

  // event handlers
  function handleMoveNext() {
    setPhotoIndex((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  }

  function handleMovePrev() {
    setPhotoIndex((prevIndex) => {
      if (prevIndex !== 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  }

  function handlePhotoClick(i) {
    setPhotoIndex(i);
    setOpenLightbox(true);
  }

  function handleLightboxClose(e) {
    setOpenLightbox(false);
    setPhotoIndex(0);
    e.stopPropagation();
  }

  function handleLightboxOpen() {
    setOpenLightbox(true);
  }

  const getAttributeList = useCallback(
    (title) => {
      if (
        !propertyData ||
        !propertyData.fields ||
        !propertyData.fields[title]
      ) {
        return [];
      }
      return propertyData.fields[title].map((item) => (
        <li key={item}>{item}</li>
      ));
    },
    [propertyData.fields]
  );

  const LightboxTiles = useCallback(() => {
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
  const { beds, baths, description, guests, location, propertyType } =
    propertyData.fields || {};

  const largeModifiers = '?fit=fill&w=2000&q=80';
  const mediumModifiers = '?fit=fill&w=1000&q=80';
  const smallModifiers = '?fit=fill&w=640&q=80';

  const testSrcSets = images.map((url) => ({
    srcSet: `
      ${url}${smallModifiers} 640w,
      ${url}${mediumModifiers} 1000w,
      ${url}${largeModifiers} 2000w
        `,
    src: url,
  }));

  if (!propertyData.fields) {
    return <div>loading</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Adventure Properties</title>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header position="fixed">
          <Navbar />
        </Header>
        <BackButton path="/" />
        <StyledSpacer space="70px" />
        <Section
          semKey="property_images"
          position="relative"
          offsetTop={positionOffset}
        >
          <Media lessThan="1">
            <Lightbox
              currIndex={photoIndex}
              isOpen={openLightbox}
              images={testSrcSets}
              imgCount={images.length}
              preloadCount={LIGHTBOX_PRELOAD_COUNT}
              showNavArrows={false}
              onOpen={handleLightboxOpen}
              onClose={handleLightboxClose}
              onMoveNext={handleMoveNext}
              onMovePrev={handleMovePrev}
            />
          </Media>
          <Media greaterThanOrEqual="1">
            <Lightbox
              currIndex={photoIndex}
              isOpen={openLightbox}
              images={testSrcSets}
              imgCount={images.length}
              preloadCount={LIGHTBOX_PRELOAD_COUNT}
              PictureTile={LightboxTiles}
              onClose={handleLightboxClose}
              onMovePrev={handleMovePrev}
              onMoveNext={handleMoveNext}
            />
          </Media>
        </Section>
        <Section
          semKey="property_details"
          position="relative"
          offsetTop={positionOffset}
        >
          <StyledContent>
            <StyledDetails>
              <h1>3 Bedroom With Amazing Views</h1>
              <AttributesSummary
                guests={guests}
                beds={beds}
                baths={baths}
                propertyType={propertyType}
              />
              <StyledDescription>{description}</StyledDescription>
              <PropertyDetailCategory title="Location">
                <Location location={location} locationName="Stowe, VT" />
              </PropertyDetailCategory>
              <PropertyDetailCategory title="Amenities">
                <AttributeList>{getAttributeList('amenities')}</AttributeList>
              </PropertyDetailCategory>
              <PropertyDetailCategory title="Experience">
                <AttributeList>{getAttributeList('experience')}</AttributeList>
              </PropertyDetailCategory>
              <PropertyDetailCategory title="Nearby Activities">
                <AttributeList>
                  <li>Hiking</li>
                  <li>Ski/Snowboard</li>
                  <li>Snowshoeing</li>
                </AttributeList>
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
        <Section semKey="footer" position="relative" offsetTop={positionOffset}>
          <PageFooter navData={footerNavData} />
        </Section>
        <Media lessThan="1">
          <StyledSpacer space="100px" />
          <ReservationForm />
        </Media>
        <GlobalStyles />
      </>
    </ThemeProvider>
  );
};

export default Property;
