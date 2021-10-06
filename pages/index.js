import Head from 'next/head';
import cmsClient from '../Contentful';
import { mediaStyles } from '../Media';
import Section from '../components/base/semantic/Section';
import SearchBar from '../components/searchbar/SearchBar';
import HeroContainer from '../components/hero/HeroContainer';
import ResultsContainer from '../components/searchResults/ResultsContainer';

//* configs
import { slider1Data } from '../data/data';

// static variables
const HERO_IMAGE = '/static/assets/lofoten-2220461.png';

const Index = ({ features }) => (
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
      <ResultsContainer items={slider1Data.items} features={features.items} />
      <ResultsContainer items={slider1Data.items} features={features.items} />
    </Section>
  </>
);
export default Index;

export async function getStaticProps(context) {
  // const session = await getSession({ req: context.req });
  // console.log(context);

  const featureProps = await cmsClient.getEntries({
    content_type: 'property',
  });
  console.log(
    '🚀 ~ file: index.js ~ line 44 ~ getServerSideProps ~ featureProps',
    featureProps.items
  );

  return {
    props: {
      features: {
        ...featureProps,
      },
    },
  };
}
