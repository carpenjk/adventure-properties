import Link from 'next/link';
import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Poppins;

  ${breakpoint(1)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  min-width: 800px;
  max-width: 1200px;
`}
`;
const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;

  padding: 16px;

  > h1 {
    /* text/H3 */
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;

    letter-spacing: 0.025em;

    /* tertiary */
    color: #cdf7f6;
  }

  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    margin: 0;
  }

  > ul > li {
    margin-bottom: 16px;
    /* text/input */

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height */
    letter-spacing: 0.025em;
  }
  > ul > li > a {
    color: #cdf7f6;
  }
`;

const FooterNav = ({ navData }) => (
  <StyledNav>
    {navData.map((group) => (
      <StyledGroup key={group.name}>
        <h1>{group.name}</h1>
        <ul>
          {group.items.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <a>{item.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </StyledGroup>
    ))}
  </StyledNav>
);

export default FooterNav;
