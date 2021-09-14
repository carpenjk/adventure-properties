import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import { useState, useEffect, useCallback } from 'react';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import dynamic from 'next/dynamic';
import Lightbox from '../components/Lightbox';
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
  max-width: 1200px;
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex 0 1 770px;
  
  
  > h1 {
    margin: 0;
  }
  > * {
    padding-bottom: ${({ theme }) => theme.space[6]}px;
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
  function handlePhotoClick(i) {
    setPhotoIndex(i);
    setOpenLightbox(true);
  }

  function handleLightboxClose() {
    setOpenLightbox(false);
    setPhotoIndex(0);
  }

  function handleOverlayClick() {
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
      <PictureTiles onOverlayClick={handleOverlayClick}>
        {tileImageUrls.map((img, i) => (
          <img
            loading="lazy"
            key={i}
            src={img}
            alt="property"
            onClick={() => handlePhotoClick(i).bind(this)}
          />
        ))}
      </PictureTiles>
    );
  }, [images]);

  // property data
  const { beds, baths, description, guests, location, propertyType } =
    propertyData.fields || {};

  const prevPhotoIndex = (photoIndex + images.length - 1) % images.length;
  const nextPhotoIndex = (photoIndex + images.length + 1) % images.length;
  const largeModifiers = '?fit=fill&w=2000&q=80';
  const mediumModifiers = '?fit=fill&w=1000&q=80';
  const smallModifiers = '?fit=fill&w=640&q=80';

  // lightbox image urls
  const currSrcSet = `
  ${images[photoIndex]}${smallModifiers} 640w,
  ${images[photoIndex]}${mediumModifiers} 1000w,
  ${images[photoIndex]}${largeModifiers} 2000w
  `;
  const prevSrcSet = `
  ${images[prevPhotoIndex]}${smallModifiers} 640w,
  ${images[prevPhotoIndex]}${mediumModifiers} 1000w,
  ${images[prevPhotoIndex]}${largeModifiers} 2000w
  `;
  const nextSrcSet = `
  ${images[nextPhotoIndex]}${smallModifiers} 640w,
  ${images[nextPhotoIndex]}${mediumModifiers} 1000w,
  ${images[nextPhotoIndex]}${largeModifiers} 2000w
  `;

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
              openInPlace
              showNavArrows={false}
              isOpen={openLightbox}
              prevSrc={images[prevPhotoIndex]}
              prevSrcSet={prevSrcSet}
              currSrc={images[photoIndex]}
              currSrcSet={currSrcSet}
              nextSrc={images[nextPhotoIndex]}
              nextSrcSet={nextSrcSet}
              onClose={handleLightboxClose}
              onMovePrev={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNext={() =>
                setPhotoIndex((photoIndex + images.length + 1) % images.length)
              }
              currIndex={photoIndex}
              imgCount={images.length}
            />
          </Media>
          <Media greaterThanOrEqual="1">
            <Lightbox
              PictureTile={LightboxTiles}
              images={images}
              isOpen={openLightbox}
              prevSrc={images[prevPhotoIndex]}
              prevSrcSet={prevSrcSet}
              currSrc={images[photoIndex]}
              currSrcSet={currSrcSet}
              nextSrc={images[nextPhotoIndex]}
              nextSrcSet={nextSrcSet}
              onClose={handleLightboxClose}
              onMovePrev={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNext={() =>
                setPhotoIndex((photoIndex + images.length + 1) % images.length)
              }
              currIndex={photoIndex}
              imgCount={images.length}
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
