import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { mediaStyles } from '../Media';

const Test = () => {
  const [session, loading] = useSession();

  console.log(process.env.AUTH0_DOMAIN);

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
      {!session && (
        <>
          Not signed in <br />
          <button type="button" onClick={signIn}>
            Sign In
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <div>You can now access our super secret pages </div>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </>
      )}
    </>
  );
};
export default Test;
