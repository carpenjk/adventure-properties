import { useContext } from 'react';
import { GlobalContext } from '../contexts/context';
import { breakpoint, getMaxWidth } from 'themeweaver';
import { getPropertyBr, inverseProps } from '../utils/themeweaver-utils';

//components
import styled from 'styled-components';
import ToggleButton from './ToggleButton';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: stretch;

  .navtoggle__list {
    position: relative;
    display: flex;
    flex-direction: ${({ displayVertical }) =>
      getPropertyBr(displayVertical, 0) ? 'column' : 'row'};
    justify-content: center;
    align-items: stretch;
    max-width: ${(props) => props.maxWidth};
    width: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    list-style: none;
  }
  .navtoggle__list > li {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    max-width: ${getMaxWidth('button.nav', 'none')}
    font: inherit;
  }

  ${breakpoint(1)`

      .navtoggle__list {
        flex-direction: ${({ displayVertical }) =>
          getPropertyBr(displayVertical, 1) ? 'column' : 'row'};
      }
      .navtoggle__list > li {
        max-width: ${getMaxWidth('button.nav', '116px')}
      }
  `}
`;

const NavToggle = (props) => {
  const { appMode, handleAppModeToggle } = useContext(GlobalContext);

  const { maxWidth, itemMinWidth, wrapperClass, displayVertical, data } = props;
  const items = data.nav.items;

  return (
    <StyledNav
      className={wrapperClass}
      maxWidth={maxWidth}
      itemMinWidth={itemMinWidth}
      displayVertical={displayVertical}
    >
      <ul className="navtoggle__list">
        {items.map((item) => {
          return (
            <li key={item.key}>
              <ToggleButton
                selected={item.text.toLowerCase() === appMode}
                text={item.text}
                onClick={handleAppModeToggle}
                showIndicator={inverseProps(displayVertical)}
              />
            </li>
          );
        })}
      </ul>
    </StyledNav>
  );
};

export default NavToggle;
