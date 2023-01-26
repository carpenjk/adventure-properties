import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchBarProvider } from '@carpenjk/searchbar';
import { ContentContainer, Spacer } from '@carpenjk/base/layout';
import { Section } from '@carpenjk/base/semantic';
import NXBackButton from '../../components/buttons/NXBackButton';
import { theme } from '../../theme/theme';
import { endDateProps, startDateProps } from '../../data/input';
import {
  getInitialCheckFilters,
  prepValues,
  SearchSchema,
} from '../../data/validation/search';
import { mediaStyles } from '../../Media';
import { search } from '../../utils/search/search';
import { getSortBy } from '../../utils/search/utils';
import { processParams } from '../../utils/search/params';
import SearchResultLayout from '../../components/searchResults/SearchResultLayout';

const blankParams = {
  destination: '',
  guests: '',
  [startDateProps.id]: '',
  [endDateProps.id]: '',
  nearbyActivities: '',
  ...getInitialCheckFilters(),
};

const Search = ({ response }) => {
  const router = useRouter();
  const { page: pageParam, ...parsedParams } = processParams(router.query);
  const page = pageParam || 1;
  const initialParamValues = { ...blankParams, ...parsedParams };
  const { message, ignoredLocation, results, error } = response;

  async function handleSearch(values, pg = 1) {
    router.push({
      pathname: '/properties/search',
      query: {
        ...prepValues({ ...values, ...getSortBy(values), page: pg }),
      },
    });
  }

  return (
    <>
      <Head>
        <title>Search</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NXBackButton />
      <main style={{ position: 'relative' }}>
        <Spacer vertical space="60px" />
        <Section tw={{ variant: 'search' }} position="relative">
          <ContentContainer>
            <SearchBarProvider
              options={{
                allOpenMode: true,
                hideOnMount: true,
                hideOnSearch: true,
                searchOnExit: true,
              }}
              initialValues={initialParamValues}
              validationSchema={SearchSchema}
              search={handleSearch}
              onExit={(searchbar) => searchbar.searchState.setIsHidden(true)}
              theme={theme}
            >
              <SearchResultLayout
                page={page}
                itemsPerPage={10}
                results={results}
                message={message}
                ignoredLocation={ignoredLocation}
                error={error}
              />
            </SearchBarProvider>
          </ContentContainer>
        </Section>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const response = await search(query);

  return {
    props: {
      response: JSON.parse(JSON.stringify(response)),
    },
  };
}

export default Search;
