import { useContext } from 'react';
import { GlobalContext } from '../contexts/context';
import { breakpoint, getMaxWidth } from 'themeweaver';
import {
  getProp,
  getConditionalProp,
  inverseProps,
} from '../utils/themeweaver-utils';

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
    flex-direction: ${getConditionalProp(
      'displayVertical',
      ({ displayVertical }) => (displayVertical ? 'column' : 'row')
    )};
    justify-content: center;
    align-items: stretch;
    max-width: ${getProp('maxWidth')};
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
    font: inherit;
  }

  ${breakpoint(1)`
      .navtoggle__list {
        flex-direction: ${getConditionalProp(
          'displayVertical',
          ({ displayVertical }) => (displayVertical ? 'column' : 'row'),
          1
        )};
      }
      .navtoggle__list > li {
        max-width: ${getMaxWidth('button.nav', '116px')}
      }
  `}
`;

StyledNav.defaultProps = {
  displayVertical: [true, false],
  maxWidth: 'none',
};

const NavToggle = (props) => {
  const { appMode, handleAppModeToggle } = useContext(GlobalContext);

  const { maxWidth, wrapperClass, displayVertical } = props;

  return (
    <StyledNav
      className={wrapperClass}
      maxWidth={maxWidth}
      displayVertical={displayVertical}
    >
      <ul className="navtoggle__list">
        <ToggleButton
          key="buy"
          selected={'buy' === appMode}
          text={'Buy'}
          onClick={handleAppModeToggle}
          showIndicator={inverseProps(displayVertical)}
        />
        <ToggleButton
          key="rent"
          selected={'rent' === appMode}
          text={'Rent'}
          onClick={handleAppModeToggle}
          showIndicator={inverseProps(displayVertical)}
        />
        <ToggleButton
          key="longTerm"
          selected={'long term' === appMode}
          text={'Long Term'}
          onClick={handleAppModeToggle}
          showIndicator={inverseProps(displayVertical)}
        />
      </ul>
    </StyledNav>
  );
};

export default NavToggle;
