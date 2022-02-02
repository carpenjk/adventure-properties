import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { getMaxWidth, breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import NavLink from './NavLink';
import IconDropDown from './IconDropDown';
import AccountIcon from './AccountIcon';

const StyledNav = styled.nav`
  justify-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: ${getProp('maxWidth')};
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;

  li {
    flex: 1;
    height: 100%;
    max-width: ${getMaxWidth('button.nav', 'none')};
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  ${breakpoint(1)`
    justify-content: flex-end;
    flex-direction: row;
    li {
      flex: none;
      max-width: ${getMaxWidth('button.nav', 'none')};
    }
  `}
`;

const ACCOUNT_IMG = '/static/assets/navbar/account_circle.svg';
const NavList = () => {
  const [session, loading] = useSession();

  return (
    <StyledNav className="navlist">
      <StyledUl className="navlist__list">
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
          <li>
            <IconDropDown icon={AccountIcon}>
              <NavLink href="/reservations">My Adventures</NavLink>
              <NavLink href="/">Favorites</NavLink>
              <NavLink href="/" onClick={signOut} externalLink>
                Log Out
              </NavLink>
            </IconDropDown>
          </li>
        )}
      </StyledUl>
    </StyledNav>
  );
};

export default NavList;
