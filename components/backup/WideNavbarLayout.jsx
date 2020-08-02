import styled from 'styled-components';
import Link from 'next/link';
import NavMenu from './NavMenu';
import NavToggle from './NavToggle';

import { NavMenu_config } from '../compConfig';
import { NavToggle_config } from '../compConfig';

const StyleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: center;

  height: 80px;
  width: 100%;
  padding: 0 20px 0 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);

  .logoContainer {
    grid-column: 1 / 2;
    display: flex;
    justify-content: flex-start;
  }
  .navToggle {
    display: flex;
    grid-column: 2 / 3;
    align-self: stretch;
  }

  .navMenu {
    display: flex;
    grid-column: 3 / 4;
    align-self: stretch;
  }
`;

const WideNavbarLayout = (props) => {
  const { mobileBreakpoint, logo } = props;

  return (
    <StyleWrapper mobileBreakpoint={mobileBreakpoint} className="navbar">
      <Link href="/">
        <div className="logoContainer">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <NavToggle
        wrapperClass="navToggle"
        height="80px"
        maxWidth="350px"
        itemMinWidth="80px"
        items={NavToggle_config.items}
        mobileBreakpoint={mobileBreakpoint}
      />
      <NavMenu
        wrapperClass="navMenu"
        position={NavMenu_config.position}
        height="80px"
        maxWidth="400px"
        itemMinWidth="75px"
        items={NavMenu_config.items}
        mobileBreakpoint={mobileBreakpoint}
      />
    </StyleWrapper>
  );
};

export default WideNavbarLayout;
