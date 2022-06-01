import styled from 'styled-components';
import { getMaxHeight } from 'themeweaver';
// components
import Link from 'next/link';
import NavList from './NavList';

const StyledWideNavbar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: stretch;

  max-height: ${(getMaxHeight('nav.main'), '100px')};

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

const StyledLogo = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`;

const WideNavbarLayout = (props) => {
  const { logo } = props;
  return (
    <StyledWideNavbar>
      <Link href="/">
        <a>
          <StyledLogo>
            <img src={logo} alt="logo" />
          </StyledLogo>
        </a>
      </Link>
      <div />
      <NavList />
    </StyledWideNavbar>
  );
};

export default WideNavbarLayout;
