import { colors } from '../global/base';
import { useContext } from 'react';
import { GlobalContext } from '../context';

//components
import ToggleButton from './ToggleButton';

const NavToggle = props => {
  let { appMode, handleAppModeToggle } = useContext(GlobalContext);
  const { position, height, maxWidth, itemMinWidth, items } = props;

  return (
    <nav className="navtoggle">
      <ul className="navtoggle__list">
        {items.map(item => {
          return (
            <li key={item.text}>
              <ToggleButton
                selected={item.text.toLowerCase() === appMode}
                item={item}
                onClick={handleAppModeToggle}
              />
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          .navtoggle {
            grid-column: 2 / 3;
            display: flex;
            justify-content: center;
            align-items: stretch;

            align-self: stretch;
          }
          .navtoggle__list {
            max-width: ${maxWidth};
            width: 100%;

            margin: 0 10px;
            margin-block-start: 0;
            margin-block-end: 0;
            padding-inline-start: 0;

            position: relative;
            display: flex;
            justify-content: center;
            align-items: stretch;

            list-style: none;

            font-family: Poppins;
            font-weight: 700;

            font-size: 1.8rem;
          }
          .navtoggle__list > li {
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex: 1;
            min-width: ${itemMinWidth};

            font: inherit;
          }

          .navtoggle__list > li:hover {
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

export default NavToggle;
