import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getMaxWidth } from '@carpenjk/themeweaver';
import { breakpoint } from '@carpenjk/prop-x/css';
import { getProp } from '@carpenjk/prop-x/lib/css/getProp';
// import { getProp } from '@carpenjk/prop-x/css';
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

const NavList = () => {
  const { data: session, status } = useSession();

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
          </>
        )}
        {session && (
          <li>
            <IconDropDown icon={AccountIcon}>
              <NavLink tw={{ variant: 'user' }} href="/reservations">
                My Adventures
              </NavLink>
              <NavLink tw={{ variant: 'user' }} href="/">
                Favorites
              </NavLink>
              <NavLink
                tw={{ variant: 'user' }}
                href="/"
                onClick={signOut}
                externalLink
              >
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
