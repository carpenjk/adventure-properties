import styled from 'styled-components';
import { Media } from './Media';
//components
// import MobileNavbar from './MobileNavbar';
import WideNavbarLayout from './WideNavbarLayout';
import { TwMobileMenu } from 'tw-mobile-menu';

//data
import { navData } from '../data/data';

//assets
const logo = '../static/assets/LogoMain.svg';

const StyledNavbar = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  background-color: var(--globalWhite);

  > * {
    width: 100%;
  }
`;
const Navbar = (props) => {
  const { mobileBreakpoint } = props;
  return (
    <StyledNavbar>
      <Media lessThan="lg">
        <TwMobileMenu
          data={{ nav: navData.nav }}
          focusOnOpen={true}
          key="twMobileMenu"
        />
      </Media>
      <Media greaterThanOrEqual="lg">
        <WideNavbarLayout
          data={navData}
          logo={logo}
          mobileBreakpoint={mobileBreakpoint}
        />
      </Media>
    </StyledNavbar>
  );
};

export default Navbar;
