import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { theme } from '../theme';
import { mediaStyles } from '../Media';
import Header from '../components/base/semantic/Header';
import Section from '../components/base/semantic/Section';
import Navbar from '../components/Navbar';
import SearchBar from '../components/searchbar/SearchBar';
import HeroContainer from '../components/HeroContainer';

//* configs
import { GlobalStyles } from '../static/global/base';
import Slider from '../components/slider/Slider';
import { slider1Data } from '../data/data';

// static variables
const HERO_IMAGE = '../static/assets/lofoten-2220461.png';

const Index = () => (
  <ThemeProvider theme={theme}>
    <>
      <Head>
        <title>Adventure Properties</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header position="fixed">
        <Navbar />
      </Header>
      <Section semKey="hero" position="relative">
        <HeroContainer backgroundImage={HERO_IMAGE} />
        <SearchBar key="searchbar" openMaxWidth={['none', '1000px']} />
      </Section>
      <Section semKey="features" className="features">
        <Slider
          items={slider1Data.items}
          showMoreItem={[false, true]}
          itemsToDisplay={3}
          keyboardSelectSlot={2}
          hideOverflow
        />
      </Section>
      <GlobalStyles />
    </>
  </ThemeProvider>
);
export default Index;
