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
  SearchSchema,
} from '../../data/validation/search';
import { mediaStyles } from '../../Media';
import { search } from '../../utils/search/search';
import { processParams } from '../../utils/search/params';
import SearchResultLayout from '../../components/searchResults/SearchResultLayout';
import useSearch from '../../utils/search/UseSearch';

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
  const searchAndSetSession = useSearch();
  const { page: pageParam, ...parsedParams } = processParams(router.query);
  const page = pageParam || 1;
  const initialParamValues = { ...blankParams, ...parsedParams };
  const { message, ignoredLocation, results, error } = response;

  return (
    <>
      <Head>
        <title>Search</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <NXBackButton />
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
            search={searchAndSetSession}
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
