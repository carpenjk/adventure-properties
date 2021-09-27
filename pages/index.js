import Head from 'next/head';
import { mediaStyles } from '../Media';
import Section from '../components/base/semantic/Section';
import SearchBar from '../components/searchbar/SearchBar';
import HeroContainer from '../components/hero/HeroContainer';
import ResultsContainer from '../components/searchResults/ResultsContainer';

//* configs
import { slider1Data } from '../data/data';

// static variables
const HERO_IMAGE = '/static/assets/lofoten-2220461.png';

const Index = () => (
  <>
    <Head>
      <title>Adventure Properties</title>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: mediaStyles }}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Section semKey="hero" position="relative">
      <HeroContainer backgroundImage={HERO_IMAGE} />
      <SearchBar key="searchbar" openMaxWidth={['none', '1000px']} />
    </Section>
    <Section semKey="features" className="features">
      <ResultsContainer items={slider1Data.items} />
      <ResultsContainer items={slider1Data.items} />
    </Section>
  </>
);
export default Index;
