import styled from 'styled-components';
import NavLink from './NavLink';

const StyledNav = styled.ul`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }
`;

const MobileNavList = ({ data }) => {
  const { items } = data.nav;

  return (
    <StyledNav key="test1">
      {items.map((item) => (
        <li key={item.key}>
          <NavLink key="test2" href={item.link}>
            {item.text}
          </NavLink>
        </li>
      ))}
    </StyledNav>
  );
};

export default MobileNavList;
