import Head from 'next/head';
import { useRouter } from 'next/router';
import { mediaStyles } from '../Media';
import Section from '../components/base/semantic/Section';
import SearchBar from '../components/searchbar/SearchBar';
import HeroContainer from '../components/hero/HeroContainer';
import FeaturesContainer from '../components/features/FeaturesContainer';
import Filters from '../components/searchbar/Filters';

//* configs
import { fetchFeaturedProperties } from '../components/adapters/property/property';
import PrimarySearchFields from '../components/searchbar/PrimarySearchFields';
import SecondarySearchFields from '../components/searchbar/SecondarySearchFields';
import {
  checkFiltersData as checkFilters,
  endDateProps,
  startDateProps,
} from '../data/input';
import { getInitialCheckFilters, prepValues } from '../data/validation/search';

// static variables
const HERO_IMAGE = '/static/assets/lofoten-2220461.png';

function getSortBy(values) {
  if (values && values.destination) {
    return { sortBy: JSON.stringify({ destination: -1 }) };
  }
}

export async function getServerSideProps() {
  const features = await fetchFeaturedProperties();
  return {
    props: {
      features: JSON.parse(JSON.stringify(features)),
    },
  };
}

const Index = (props) => {
  const { features } = props;
  const router = useRouter();
  return (
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
        <SearchBar
          PrimarySearchFields={PrimarySearchFields}
          SecondarySearchFields={SecondarySearchFields}
          FilterFields={Filters}
          checkFilters={checkFilters}
          openMaxWidth={['none', '1000px']}
          initialValues={{
            destination: '',
            guests: '',
            [startDateProps.id]: '',
            [endDateProps.id]: '',
            nearbyActivities: '',
            ...getInitialCheckFilters(),
          }}
          onSubmit={async (values) => {
            router.push({
              pathname: '/properties/search',
              query: { ...prepValues(values), ...getSortBy(values) },
            });
          }}
        />
      </Section>
      <Section semKey="features" className="features">
        <FeaturesContainer items={features} />
        <FeaturesContainer items={features} />
      </Section>
    </>
  );
};
export default Index;
