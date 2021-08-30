import Link from 'next/link';
import styled from 'styled-components';
import {
  breakpoint,
  getBackgroundColor,
  getColor,
  getFontFamily,
  getFontSize,
  getLetterSpacing,
  getLineHeight,
  getMaxWidth,
  getMinWidth,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getPaddingTop,
  getWidth,
} from 'themeweaver';

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${getFontFamily('footerNav', 'inherit')};
  font-family: Poppins;
  width: ${getWidth('footerNav', 'auto')};

  ${breakpoint(1)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: ${getWidth('footerNav', 'auto')};
  min-width: ${getMinWidth('footerNav', '0')};
  max-width: ${getMaxWidth('footerNav', 'none')};
`}
`;
const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;

  padding-top: ${getPaddingTop('footerNav', '16px')};
  padding-right: ${getPaddingRight('footerNav', '16px')};
  padding-bottom: ${getPaddingBottom('footerNav', '16px')};
  padding-left: ${getPaddingLeft('footerNav', '16px')};

  > h1 {
    padding-top: ${getPaddingTop('footerNav_header', '8px')};
    padding-right: ${getPaddingRight('footerNav_header', '8px')};
    padding-bottom: ${getPaddingBottom('footerNav_header', '8px')};
    padding-left: ${getPaddingLeft('footerNav_header', '8px')};

    font-family: ${getFontFamily('footerNav_header', 'inherit')};
    font-weight: bold;
    font-size: ${getFontSize('footerNav_header', '24px')};
    line-height: ${getLineHeight('footerNav_header', '30px')};
    letter-spacing: ${getLetterSpacing('footerNav_header', '0.025em')};
    color: ${getColor('footerNav_header', 'initial')};
  }

  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    margin: 0;
  }

  > ul > li > a > div {
    padding-top: ${getPaddingTop('footerNav_item', '8px')};
    padding-right: ${getPaddingRight('footerNav_item', '8px')};
    padding-bottom: ${getPaddingBottom('footerNav_item', '8px')};
    padding-left: ${getPaddingLeft('footerNav_item', '8px')};

    font-family: ${getFontFamily('footerNav_item', 'inherit')};
    font-size: ${getFontSize('footerNav_item', 'initial')};
    line-height: ${getLineHeight('footerNav_item', '24px')};
    letter-spacing: ${getLetterSpacing('footerNav_item', '0.025em')};
    color: ${getColor('footerNav_item', 'initial')};
  }
  > ul > li > a {
    text-decoration: none;
    color: inherit;

    &:hover > div {
      background-color: ${getBackgroundColor('footerNav_item.hover', 'black')};
      color: ${getColor('footerNav_item.hover', 'inherit')};
    }
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
                <a>
                  <div>{item.text}</div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </StyledGroup>
    ))}
  </StyledNav>
);

export default FooterNav;
