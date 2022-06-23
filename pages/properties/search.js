import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentContainer from '../../components/base/layout/ContentContainer';
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
import SearchBarProvider from '../../components/searchbar/SearchBarProvider';
import SearchResultLayout from '../../components/searchResults/SearchResultLayout';
import BackButton from '../../components/base/BackButton';
import Spacer from '../../components/base/Spacer';

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

  // const message =
  //   'No results found in the destination provided. Here are some available listings in other locations.';

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
      <BackButton />
      <Spacer vertical space="60px" />
      <main style={{ position: 'relative' }}>
        <ContentContainer>
          <SearchBarProvider
            allOpenMode
            hideOnOpen
            initialValues={initialParamValues}
            schema={SearchSchema}
            search={handleSearch}
            onSubmit={async (values) => {
              router.push({
                pathname: '/properties/search',
                query: {
                  ...prepValues({ ...values, ...getSortBy(values) }),
                },
              });
            }}
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
