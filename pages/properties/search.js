import Head from 'next/head';
import ContentContainer from '../../components/base/layout/ContentContainer';
import Dashboard from '../../components/searchResults/Dashboard';
import { mediaStyles } from '../../Media';
import { search } from '../../utils/search';

const Search = ({ response, test }) => {
  console.log('🚀 ~ file: search.js ~ line 6 ~ Search ~ response', response);

  // const { message } = response;
  const message =
    'No results found in the destination provided. Here are some available listings in other locations.';

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
      <main>
        <ContentContainer>
          <Dashboard message={message || ''} />
        </ContentContainer>
      </main>
    </>
  );
};

// const search = async (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps(context) {
  const { query } = context;
  const error = null;
  let results = null;

  results = await search(query);
  console.log(
    '🚀 ~ file: search.js ~ line 62 ~ getServerSideProps ~ results',
    results
  );

  return {
    props: {
      test: 'test',
      response: results,
    },
  };
}

export default Search;
