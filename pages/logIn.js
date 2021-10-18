import { signIn, signOut, useSession } from 'next-auth/client';

const LogIn = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button type="button" onClick={signIn}>
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </>
      )}
    </>
  );
};

export default LogIn;
