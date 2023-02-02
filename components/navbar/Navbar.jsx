import styled from 'styled-components';
import {
  getBackgroundColor,
  getHeight,
  getMaxHeight,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
} from '@carpenjk/themeweaver';
import { TwMobileMenu } from '@carpenjk/tw-mobile-menu';
import { useEffect, useRef } from 'react';
import { useScrollBarWidth } from '@carpenjk/hooks';
import { breakpoint } from '@carpenjk/prop-x/css';
import { Media } from '../../Media';
// components
import WideNavbarLayout from './WideNavbarLayout';

// data
import { navData } from '../../data/data';

// assets
const LOGO = '/static/assets/LogoMain.svg';

const StyledNavbar = styled.div`
  height: ${getHeight('nav.main', 'auto')};
  max-height: ${getMaxHeight('nav.main', 'none')};
  display: flex;
  background-color: ${getBackgroundColor('nav.main', 'none')};
  margin-top: ${getMarginTop('nav.main', '0')};
  margin-right: ${getMarginRight('nav.main', '0')};
  margin-bottom: ${getMarginBottom('nav.main', '0')};
  margin-left: ${getMarginLeft('nav.main', '0')};
  padding-top: ${getPaddingTop('nav.main', '0')};
  padding-right: ${getPaddingRight('nav.main', '20px')};
  padding-bottom: ${getPaddingBottom('nav.main', '0')};
  padding-left: ${getPaddingLeft('nav.main', '20px')};
  box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.15);
  > * {
    width: 100%;
  }
  ${breakpoint(1)`
      height: ${getHeight('nav.main', 'auto')};
      max-height: ${getMaxHeight('nav.main', 'none')};
      background-color: ${getBackgroundColor('nav.main', 'none')};
      margin-top: ${getMarginTop('nav.main', '0')};
      margin-right: ${getMarginRight('nav.main', '0')};
      margin-bottom: ${getMarginBottom('nav.main', '0')};
      margin-left: ${getMarginLeft('nav.main', '0')};
      padding-top: ${getPaddingTop('nav.main', '0')};
      padding-right: ${getPaddingRight('nav.main', '20px')};
      padding-bottom: ${getPaddingBottom('nav.main', '0')};
      padding-left: ${getPaddingLeft('nav.main', '20px')};
  `}
`;
const DEFAULT_TW = { semKey: 'nav', variant: 'main' };
const Navbar = () => {
  const scrollBarWidth = useScrollBarWidth();
  const navbarRef = useRef();
  useEffect(() => {
    if (navbarRef && navbarRef.current) {
      navbarRef.current.style.paddingRight = `${scrollBarWidth}px`;
    }
  }, [scrollBarWidth]);

  return (
    <StyledNavbar tw={DEFAULT_TW} ref={navbarRef}>
      <Media lessThan="1">
        <TwMobileMenu
          data={{ nav: navData.nav }}
          focusOnOpen
          key="twMobileMenu"
        />
      </Media>
      <Media greaterThanOrEqual="1">
        <WideNavbarLayout data={navData} logo={LOGO} />
      </Media>
    </StyledNavbar>
  );
};

export default Navbar;
