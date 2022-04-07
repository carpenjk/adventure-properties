import Head from 'next/head';
import { mediaStyles } from '../../Media';
import { search } from '../../utils/search';

const Search = ({ response, test }) => {
  console.log('🚀 ~ file: search.js ~ line 6 ~ Search ~ response', response);
  const a = 1;

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
        <div>results go here</div>
        <input type="input" name="inp1" />
        <input type="input" name="inp2" />
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
