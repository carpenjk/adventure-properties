import styled from 'styled-components';

import { getMaxWidth, breakpoint } from 'themeweaver';
import { getProp } from 'dataweaver';
import NavLink from './NavLink';

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
  align-items: stretch;
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
      max-width: ${getMaxWidth('button.nav', '116px')};
    }
  `}
`;

const NavList = () => (
  <StyledNav className="navlist">
    <StyledUl className="navlist__list">
      <li>
        <NavLink href="/about" text="About" />
      </li>
      <li>
        <NavLink href="/owner" text="Owner" />
      </li>
      <li>
        <NavLink href="/logIn" text="Log In" />
      </li>
      <li>
        <NavLink href="/signUp" text="Sign Up" />
      </li>
    </StyledUl>
  </StyledNav>
);

export default NavList;
