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
  align-items: stretch;

  height: 80px;
  padding: 0 20px 0 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);

  .logoContainer {
    grid-column: 1 / 2;
    display: flex;
    justify-content: flex-start;
  }
  & > :nth-child(2) {
    grid-column: 2 / 3;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  & > :nth-child(3) {
    grid-column: 3 / 4;
    align-self: stretch;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
  }
`;

const WideNavbarLayout = (props) => {
  const { mobileBreakpoint, logo, data, displayVertical } = props;
  const items = props.data.nav.items;
  return (
    <StyleWrapper mobileBreakpoint={mobileBreakpoint}>
      <Link href="/">
        <div className="logoContainer">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      {items.map((item) => {
        let { Component, key, props, ...rest } = item;
        if (Component) {
          return <Component key={key} data={{ nav: rest }} {...props} />;
        }
      })}
    </StyleWrapper>
  );
};

export default WideNavbarLayout;
