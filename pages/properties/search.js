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
import { parseParams } from '../../utils/search/params';
import SearchBarProvider from '../../components/searchbar/SearchBarProvider';
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
  const parsedParams = parseParams(router.query);
  const initialParamValues = { ...blankParams, ...parsedParams };
  console.log('🚀 ~ file: search.js ~ line 6 ~ Search ~ response', response);

  const { message } = response;
  const { results, error } = response;
  console.log('🚀 ~ file: search.js ~ line 54 ~ Search ~ results', results);

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
      <main style={{ position: 'relative' }}>
        <ContentContainer>
          <SearchBarProvider
            allOpenMode
            hideOnOpen
            initialValues={initialParamValues}
            schema={SearchSchema}
            onSubmit={async (values) => {
              router.push({
                pathname: '/properties/search',
                query: { ...prepValues(values) },
              });
            }}
          >
            <SearchResultLayout
              results={results}
              message={message}
              error={error}
            />
          </SearchBarProvider>
        </ContentContainer>
      </main>
    </>
  );
};

// const search = async (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps(context) {
  const { query } = context;
  const response = await search(query);

  return {
    props: {
      test: 'test',
      response,
    },
  };
}

export default Search;
