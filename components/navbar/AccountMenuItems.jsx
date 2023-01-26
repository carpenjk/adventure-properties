import { signIn, signOut, useSession } from 'next-auth/react';
import NavLink from './NavLink';

const AccountMenuItems = () => {
  const { data: session } = useSession();
  return (
    <ul>
      {!session && (
        <li key="login">
          <NavLink href="/" onClick={signIn} externalLink>
            Log In
          </NavLink>
        </li>
      )}
      {session && (
        <>
          <li key="reservations">
            <NavLink href="/reservations">My Adventures</NavLink>
          </li>
          <li key="signout">
            <NavLink href="/" onClick={signOut} externalLink>
              Log Out
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default AccountMenuItems;
