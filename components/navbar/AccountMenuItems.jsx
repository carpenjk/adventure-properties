import { signIn, signOut, useSession } from 'next-auth/client';
import NavLink from './NavLink';

const AccountMenuItems = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <li>
          <NavLink href="/" onClick={signIn} externalLink>
            Log In
          </NavLink>
        </li>
      )}
      {session && (
        <>
          <li>
            <NavLink href="/reservations">My Adventures</NavLink>
          </li>
          <li>
            <NavLink href="/" onClick={signOut} externalLink>
              Log Out
            </NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default AccountMenuItems;
