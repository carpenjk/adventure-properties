import Link from 'next/link';
import { colors } from '../global/base';

const NavMenu = props => {
  const { position, height, maxWidth, itemMinWidth, items } = props;

  return (
    <nav className="navmenu">
      <ul className="navmenu__list">
        {items.map(item => {
          return (
            <li key={item.text}>
              <Link href={item.ref}>
                <a>{item.text}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          .navmenu {
            grid-column: 3 / 4;
            display: flex;
            justify-content: flex-end;
            align-items: stretch;

            align-self: stretch;
          }
          .navmenu__list {
            max-width: ${maxWidth};
            width: 100%;

            margin: 0 10px;
            margin-block-start: 0;
            margin-block-end: 0;
            padding-inline-start: 0;

            display: flex;
            justify-content: center;
            align-items: stretch;

            list-style: none;

            font-family: Poppins;
            font-weight: bold;
            font-size: 1.8rem;
            text-align: center;
          }
          .navmenu__list > li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            min-width: ${itemMinWidth};

            font: inherit;
            cursor: pointer;
          }

          .navmenu__list > li > a {
            flex: 1;
            padding: 0 5px;
            font: inherit;
            text-decoration: none;
            color: ${colors.menuColor.primary};
          }
          .navmenu__list > li:hover {
            background: ${colors.menuColor.hover};
          }
        `}
      </style>
    </nav>
  );
};

const getFlexLayout = position => {
  switch (position) {
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'left':
      return 'flex-start';
    default:
      return '';
  }
};

export default NavMenu;
