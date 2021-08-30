import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import { useState, useEffect, useCallback } from 'react';
import { breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import { Media, mediaStyles } from '../Media';
import client from '../Contentful';
import { GlobalStyles } from '../static/global/base';
import { theme } from '../theme';

import Header from '../components/base/semantic/Header';
import Section from '../components/base/semantic/Section';
import Navbar from '../components/navbar/Navbar';
import PageFooter from '../components/footer/PageFooter';
import PictureTiles from '../components/property/PictureTiles';
import PropertyDetailCategory from '../components/property/PropertyDetailCategory';
import Location from '../components/property/Location';
import AttributeList from '../components/property/AttributeList';
import AttributesSummary from '../components/property/AttributesSummary';
import ReservationForm from '../components/reservationForm/ReservationForm';
import BackButton from '../components/base/BackButton';

import { footerNavData } from '../data/data';

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
  const propID = '3RcXEiv8ook0DOHBrNniCA';

  const positionOffset = 0;

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

  useEffect(() => {
    if (propertyData && propertyData.fields) {
      console.log('propertyData:', propertyData);
      const mainUrl = `http:${propertyData.fields.mainPhoto.fields.file.url}`;
      const addUrls = propertyData.fields.additionalPhotos.map(
        (photo) => `http:${photo.fields.file.url}`
      );

      const firstFour = addUrls.slice(0, 4);
      const mainModifiers = `?fit=fill&w=800&h=533`;
      const modifiers = `?fit=fill&w=500&h=333`;

      setImages([mainUrl, ...addUrls]);
    }
  }, [propertyData]);

  function getUrls() {
    const firstFive = images.slice(0, 5);
    const mainModifiers = `?fit=fill&w=800&h=533`;
    const modifiers = `?fit=fill&w=500&h=333`;

    function buildModifiedUrls(photo, i) {
      if (i === 1) {
        return `${photo}${mainModifiers}`;
      }
      return `${photo}${modifiers}`;
    }
    return firstFive.map((photo, i) => buildModifiedUrls(photo, i));
  }

  const tileImageUrls = getUrls();
  const getAttributeList = useCallback(
    (title) =>
      propertyData.fields[title].map((item) => <li key={item}>{item}</li>),
    [propertyData]
  );

  if (!propertyData || !propertyData.fields) {
    return '';
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
          <PictureTiles>
            {tileImageUrls.map((img, i) => (
              <img key={i} src={img} alt="property" />
            ))}
          </PictureTiles>
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
                guests={propertyData.fields.guests}
                beds={propertyData.fields.beds}
                baths={propertyData.fields.baths}
                homeStyle="Cabin"
              />
              <StyledDescription>
                {propertyData.fields.description}
              </StyledDescription>
              <PropertyDetailCategory title="Location">
                <Location location="Sugarloaf, ME" />
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
              <PropertyDetailCategory title="Amenities">
                <AttributeList>{getAttributeList('amenities')}</AttributeList>
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
