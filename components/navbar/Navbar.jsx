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
} from 'themeweaver';
import { TwMobileMenu } from 'tw-mobile-menu';
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
  width: 100%;
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
`;
const Navbar = (props) => (
  <StyledNavbar>
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

export default Navbar;