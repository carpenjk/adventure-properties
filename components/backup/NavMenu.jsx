import Link from 'next/link';
import { colors } from '../static/global/base';
import styled from 'styled-components';

import NavLink from './NavLink';

const StyleWrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;

  .navmenu__list {
    max-width: ${(props) => props.maxWidth};
    width: 100%;

    margin: ${({ displayVertical }) => (displayVertical ? '0' : '0 10px')};
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    display: flex;
    flex-direction: ${({ displayVertical }) =>
      displayVertical ? 'column' : 'row'};
    justify-content: center;
    align-items: stretch;

    list-style: none;

    font-family: var(--menuFont);
    font-weight: bold;
    font-size: 1.8rem;
    text-align: center;
  }
  .navmenu__list > li {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    min-width: ${(props) => props.itemMinWidth};
    padding: '0 5px';
    font: inherit;
    cursor: pointer;
  }

  .navmenu__list > li > a {
    flex: 1;
    font: inherit;
    text-decoration: none;
    color: ${colors.menuColor.primary};
  }
  .navmenu__list > li:hover {
    background: ${colors.menuColor.hover};
  }
`;

const NavMenu = (props) => {
  const {
    position,
    height,
    maxWidth,
    itemMinWidth,
    items,
    mobileBreakpoint,
    wrapperClass,
    displayVertical,
  } = props;

  return (
    <StyleWrapper
      className={wrapperClass}
      maxWidth={maxWidth}
      itemMinWidth={itemMinWidth}
      mobileBreakpoint={mobileBreakpoint}
      displayVertical={displayVertical}
    >
      <ul className="navmenu__list">
        {items.map((item) => {
          return (
            <li key={item.text}>
              <NavLink
                href={item.ref}
                tabIndex="0"
                text={item.text}
                color="var(--primary)"
              />
            </li>
          );
        })}
      </ul>
    </StyleWrapper>
  );
};

export default NavMenu;
