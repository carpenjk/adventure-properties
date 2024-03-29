import Head from 'next/head';
import ClientOnly from '@carpenjk/client-only';
import { Hero } from '@carpenjk/hero';
import { SearchBar } from '@carpenjk/searchbar';
import { Section } from '@carpenjk/base/semantic';
import { mediaStyles } from '../Media';
import { theme } from '../theme/theme';

import FeaturesContainer from '../components/features/FeaturesContainer';
import Filters from '../components/searchbar/Filters';
import {
  SearchSchema,
  getInitialCheckFilters,
  prepValues,
} from '../data/validation/search';

//* configs
import { fetchFeaturedProperties } from '../controllers/property/property';
import PrimarySearchFields from '../components/searchbar/PrimarySearchFields';
import SecondarySearchFields from '../components/searchbar/SecondarySearchFields';
import { endDateProps, startDateProps } from '../data/input';

import { getSortByValue } from '../controllers/search/utils';
import useSearch from '../controllers/search/UseSearch';
import HomeBannerLayout from '../components/hero/HomeBannerLayout';
import CustomDatePickerStyles from '../components/datepicker/CustomDatePickerStyles';

// static variables
const HERO_IMAGE =
  'https://images.ctfassets.net/dvpo5m3mti9a/lU3zhGUMwsEutCPROotKc/33aff93cfa0ec5387c3b2ce240e6a48a/andreea-chidu-VKPcxvSdvVs-unsplash.jpg';

export async function getServerSideProps() {
  const features = await fetchFeaturedProperties(['Skiing'], 3);
  return {
    props: {
      features: JSON.parse(JSON.stringify(features)),
    },
  };
}

function bannerTop({ windowWidth }) {
  return 100 + 100 * Math.min((1850 / windowWidth) ** 40, 1);
}

const Index = (props) => {
  const { features } = props;
  const searchAndSetSession = useSearch();
  return (
    <>
      <Head>
        <title>Adventure Properties</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Section id="hero" tw={{ variant: 'hero' }} position="relative">
        <Hero
          tw={{ variant: 'home' }}
          image={{
            src: `${HERO_IMAGE}?w=2048&fit=fill`,
            srcSet: `${HERO_IMAGE}?w=380&fit=fill 380w, ${HERO_IMAGE}?w=460&fit=fill 460w, ${HERO_IMAGE}?w=560&fit=fill 560w, ${HERO_IMAGE}?w=640&fit=fill 640w, ${HERO_IMAGE}?w=1000&fit=fill 1000w, ${HERO_IMAGE}?w=2048&fit=fill 2048w`,
            alt: 'Mountain lake house',
          }}
          bannerPos={{ top: bannerTop }}
          bannerLayout={<HomeBannerLayout />}
          backgroundImage={HERO_IMAGE}
        />
        <ClientOnly>
          <CustomDatePickerStyles>
            <SearchBar
              searchBarId="searchbar"
              PrimarySearchFields={PrimarySearchFields}
              SecondarySearchFields={SecondarySearchFields}
              FilterFields={Filters}
              openMaxWidth={['none', '833px']}
              initialValues={{
                destination: '',
                guests: '',
                minPrice: '',
                maxPrice: '',
                beds: '',
                baths: '',
                [startDateProps.id]: '',
                [endDateProps.id]: '',
                nearbyActivities: '',
                ...getInitialCheckFilters(),
              }}
              search={searchAndSetSession}
              validationSchema={SearchSchema}
              options={{
                secondaryOpenBreakpoint: 1,
                alwaysShowButtons: [false, true],
                useIsStartedState: true,
              }}
              theme={theme}
            />
          </CustomDatePickerStyles>
        </ClientOnly>
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
            page: 1,
            sortBy: getSortByValue(),
          })}
        />
      </Section>
    </>
  );
};
export default Index;
