import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import SearchBar from './searchbar/SearchBar';
// import withPortalBackground from './searchbar/PortalBackground';
import { breakpoints, size } from '../static/global/breakpoints';

//! refactor to pass in header height offset ***********************************************
const StyleWrapper = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 81.5vh;
  background: url(../static/assets/lofoten-2220461.png) no-repeat center / cover;
  .hero {
    width: 100%;
    object-fit: cover;
  }
`;

const HeroContainer = () => {
  return (
    <StyleWrapper>
      <HeroBanner mobileBreakpoint={breakpoints.mobileM} />
      <SearchBar
        mobileBreakpoint={breakpoints.mobileM}
        mobileMaxWidth={'500px'}
        popupMaxScreenWidth={size.mobileM}
      />
    </StyleWrapper>
  );
};

export default HeroContainer;
