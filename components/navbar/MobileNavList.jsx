import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';
import { navData } from '../../data/data';
import NavLink from './NavLink';

const StyledNav = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }
`;

const MobileNavList = ({ data }) => {
  const [session, loading] = useSession();
  const { items } = data.nav;

  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink href="/about">About</NavLink>
        </li>
        {!session && (
          <>
            <li>
              <NavLink href="/" onClick={signIn} externalLink>
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink href="/signUp">Sign Up</NavLink>
            </li>
          </>
        )}
        {session && (
          <>
            <li>
              <NavLink href="/reservations">My Adventures</NavLink>
            </li>
            <li>
              <NavLink href="/">Favorites</NavLink>
            </li>
            <li>
              <NavLink href="/" onClick={signOut} externalLink>
                Log Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </StyledNav>
  );
};

export default MobileNavList;
