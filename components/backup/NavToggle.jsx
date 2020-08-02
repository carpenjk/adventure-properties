import { colors } from '../static/global/base';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/context';

//components
import styled from 'styled-components';
import ToggleButton from './ToggleButton';

const StyleWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: stretch;

  .navtoggle__list {
    max-width: ${(props) => props.maxWidth};
    width: 100%;

    margin: ${({ displayVertical }) => (displayVertical ? '0' : '0 10px')};
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    position: relative;
    display: flex;
    flex-direction: ${(props) => (props.displayVertical ? 'column' : 'row')};
    justify-content: center;
    align-items: stretch;

    list-style: none;
  }
  .navtoggle__list > li {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1;
    min-width: ${(props) => props.itemMinWidth};

    font: inherit;
  }
  .navtoggle__list > li:hover {
    background: ${colors.menuColor.hover};
  }
`;

const NavToggle = (props) => {
  let { appMode, handleAppModeToggle } = useContext(GlobalContext);
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
      <ul className="navtoggle__list">
        {items.map((item) => {
          return (
            <li key={item.text}>
              <ToggleButton
                selected={item.text.toLowerCase() === appMode}
                item={item}
                onClick={handleAppModeToggle}
                showIndicator={!displayVertical}
              />
            </li>
          );
        })}
      </ul>
    </StyleWrapper>
  );
};

export default NavToggle;
