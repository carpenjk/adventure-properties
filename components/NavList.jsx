import styled from 'styled-components';
import NavLink from './NavLink';

import { getMaxWidth, breakpoint } from 'themeweaver';

const StyledNav = styled.nav`
  justify-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
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

const NavList = (props) => {
  const { maxWidth, itemMinWidth } = props;
  const items = props.data.nav.items;
  return (
    <StyledNav className="navlist" maxWidth={maxWidth}>
      <StyledUl className="navlist__list" itemMinWidth={itemMinWidth}>
        {items.map((item) => {
          return (
            <li key={item.key}>
              <NavLink href={item.link} text={item.text} />
            </li>
          );
        })}
      </StyledUl>
    </StyledNav>
  );
};

export default NavList;
