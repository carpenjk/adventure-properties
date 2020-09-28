import styled from 'styled-components';
import { getProp } from 'dataweaver';

import NavLink from './NavLink';

const StyleWrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;

  .navmenu__list {
    max-width: ${getProp('maxWidth')};
    width: 100%;
    margin: 0 10px;
    ${condition('displayVertical')`
      margin: 0;
    `}
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    display: flex;
    flex-direction: row;
    ${condition('displayVertical')`
      flex-direction: column;
    `}
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
    min-width: ${getProp('itemMinWidth')};
    padding: '0 5px';
    font: inherit;
    cursor: pointer;
  }

  .navmenu__list > li > a {
    flex: 1;
    font: inherit;
    text-decoration: none;
  }
`;

const NavMenu = (props) => {
  const {
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
