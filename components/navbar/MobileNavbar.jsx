import styled from 'styled-components';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import MobileMenuLayout from './MobileMenuLayout';

const StyledMobileNavbar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: center;

  height: ${({ isOpen }) => (isOpen ? 'auto' : '80px')};
  width: 100%;
  padding: 0 1rem 0 0.5rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);

  .logoContainer {
    grid-column: 2/3;
    display: flex;
  }
  .hamburger {
    grid-column: 1/2;
  }
`;

const MobileNavbar = (props) => {
  const { mobileBreakpoint, logo, isOpen } = props;
  return (
    <StyledMobileNavbar
      mobileBreakpoint={mobileBreakpoint}
      className="navbar"
      isOpen={isOpen}
    >
      <HamburgerMenu
        mobileBreakpoint={mobileBreakpoint}
        isOpen={isOpen}
        buttonClass="hamburger"
        topHeight="80px"
        renderMenu={() => (
          <MobileMenuLayout
            isOpen={isOpen}
            mobileBreakpoint={mobileBreakpoint}
          />
        )}
      />
      <Link href="/">
        <div className="logoContainer">
          <img src={logo} alt="logo" />
        </div>
      </Link>
    </StyledMobileNavbar>
  );
};

export default MobileNavbar;
