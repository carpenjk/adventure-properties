import { signIn, signOut, useSession } from 'next-auth/react';

const LogIn = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
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
