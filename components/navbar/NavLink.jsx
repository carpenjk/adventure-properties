import React from 'react';
import Link from 'next/link';
import {
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getMinWidth,
  getMaxWidth,
  getMinHeight,
  getMaxHeight,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  breakpoint,
} from 'themeweaver';
import styled from 'styled-components';

const StyledLink = styled.a`
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  text-decoration: none;
  color: ${getColor('button.nav', 'black')};
  font-family: ${getFontFamily('button.nav', 'inherit')};
  font-size: ${getFontSize('button.nav', 'inherit')};
  font-weight: ${getFontWeight('button.nav', 'inherit')};
  margin-top: ${getMarginTop('button.nav', '10px')};
  margin-right: ${getMarginRight('button.nav', '10px')};
  margin-bottom: ${getMarginBottom('button.nav', '10px')};
  margin-left: ${getMarginLeft('button.nav', '10px')};
  padding-top: ${getPaddingTop('button.nav', '8px')};
  padding-right: ${getPaddingRight('button.nav', '8px')};
  padding-bottom: ${getPaddingBottom('button.nav', '8px')};
  padding-left: ${getPaddingLeft('button.nav', '8px')};
  min-width: ${getMinWidth('button.nav', '75px')};
  max-width: ${getMaxWidth('button.nav', 'none')};
  min-height: ${getMinHeight('button.nav', '0')};
  max-height: ${getMaxHeight('button.nav', 'none')};
  &:hover {
    background: ${getColor('nav.hover')};
  }

  ${breakpoint(1)`
    color: ${getColor('button.nav', 'black')};
    font-family: ${getFontFamily('button.nav', 'inherit')};
    font-size: ${getFontSize('button.nav', 'inherit')};
    font-weight: ${getFontWeight('button.nav', 'inherit')};
    margin-top: ${getMarginTop('button.nav', '10px')};
    margin-right: ${getMarginRight('button.nav', '10px')};
    margin-bottom: ${getMarginBottom('button.nav', '10px')};
    margin-left: ${getMarginLeft('button.nav', '10px')};
    padding-top: ${getPaddingTop('button.nav', '8px')};
    padding-right: ${getPaddingRight('button.nav', '8px')};
    padding-bottom: ${getPaddingBottom('button.nav', '8px')};
    padding-left: ${getPaddingLeft('button.nav', '8px')};
    min-width: ${getMinWidth('button.nav', '50px')};
    max-width: ${getMaxWidth('button.nav', 'none')};
    min-height: ${getMinHeight('button.nav', '0')};
    max-height: ${getMaxHeight('button.nav', 'none')};
  `}
`;

const NavLink = (props) => {
  const {
    href, // start of next/link props
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    getStaticProps,
    getServerSideProps,
    getInitialProps, // end next/link props
    text,
    children,
    externalLink,
    ...restProps // inner coponent props
  } = props;

  if (externalLink) {
    return (
      <StyledLink tabIndex="0" {...restProps}>
        {children}
      </StyledLink>
    );
  }

  return (
    <Link
      href={href}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <StyledLink tabIndex="0" {...restProps}>
        {children}
      </StyledLink>
    </Link>
  );
};

export default NavLink;
