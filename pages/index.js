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
import { getSortBy } from '../utils/search/utils';
import useSearch from '../utils/search/useSearch';

// static variables
const HERO_IMAGE = '/static/assets/lofoten-2220461.png';

export async function getServerSideProps() {
  const features = await fetchFeaturedProperties(['skiing'], 3);
  return {
    props: {
      features: JSON.parse(JSON.stringify(features)),
    },
  };
}

const Index = (props) => {
  const { features } = props;
  const router = useRouter();
  const search = useSearch();
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
      <Section tw={{ variant: 'hero' }} position="relative">
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
          search={search}
        />
      </Section>
      <Section tw={{ variant: 'features' }}>
        <FeaturesContainer
          items={features[0].results.items}
          topic={{ header: 'being awesome', footer: 'popularity' }}
        />
        <FeaturesContainer
          items={features[1].results.items}
          topic="skiing"
          isPersonalized
          query={prepValues({
            feature: true,
            nearbyActivities: ['skiing'],
            ...getSortBy(),
          })}
        />
      </Section>
    </>
  );
};
export default Index;
