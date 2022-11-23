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
  getBackgroundColor,
  getBorder,
  getBorderColor,
} from '@carpenjk/themeweaver';
import { breakpoint } from '@carpenjk/prop-x/css';
import styled from 'styled-components';

const StyledLink = styled.a`
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  text-decoration: none;
  background-color: ${getBackgroundColor({}, '')};
  color: ${getColor({}, 'black')};
  font-family: ${getFontFamily({}, 'inherit')};
  font-size: ${getFontSize({}, 'inherit')};
  font-weight: ${getFontWeight({}, 'inherit')};
  margin-top: ${getMarginTop({}, '10px')};
  margin-right: ${getMarginRight({}, '10px')};
  margin-bottom: ${getMarginBottom({}, '10px')};
  margin-left: ${getMarginLeft({}, '10px')};
  padding-top: ${getPaddingTop({}, '8px')};
  padding-right: ${getPaddingRight({}, '8px')};
  padding-bottom: ${getPaddingBottom({}, '8px')};
  padding-left: ${getPaddingLeft({}, '8px')};
  min-width: ${getMinWidth({}, '75px')};
  max-width: ${getMaxWidth({}, 'none')};
  min-height: ${getMinHeight({}, '0')};
  max-height: ${getMaxHeight({}, 'none')};
  border: ${getBorder({}, 'none')};
  border-color: ${getBorderColor({}, 'none')};

  &:hover {
    color: ${getColor({ suffix: '_hover' }, '')};
    background-color: ${getBackgroundColor({ suffix: '_hover' }, '')};
    border: ${(getBorder({ suffix: '_hover' }), '')};
    border-color: ${getBorderColor({ suffix: '_hover' }, '')};
  }
  &:focus {
    color: ${getColor({ suffix: '_focus' }, '')};
    background-color: ${getBackgroundColor({ suffix: '_focus' }, '')};
    border: ${(getBorder({ suffix: '_focus' }), '')};
    border-color: ${getBorderColor({ suffix: '_focus' }, '')};
  }

  ${breakpoint(1)`
    color: ${getColor({}, 'black')};
    font-family: ${getFontFamily({}, 'inherit')};
    font-size: ${getFontSize({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'inherit')};
    margin-top: ${getMarginTop({}, '8px')};
    margin-right: ${getMarginRight({}, '8px')};
    margin-bottom: ${getMarginBottom({}, '8px')};
    margin-left: ${getMarginLeft({}, '8px')};
    padding-top: ${getPaddingTop({}, '8px')};
    padding-right: ${getPaddingRight({}, '8px')};
    padding-bottom: ${getPaddingBottom({}, '8px')};
    padding-left: ${getPaddingLeft({}, '8px')};
    min-width: ${getMinWidth({}, '50px')};
    max-width: ${getMaxWidth({}, 'none')};
    min-height: ${getMinHeight({}, '0')};
    max-height: ${getMaxHeight({}, 'none')};
    border: ${getBorder({}, '')};
    border-color: ${getBorderColor({}, '')};
    
    &:hover {
      color: ${getColor({ suffix: '_hover' }, '')};
      background-color: ${getBackgroundColor({ suffix: '_hover' }, '')};
      border: ${getBorder({ suffix: '_hover' }, '')};
      border-color: ${getBorderColor({ suffix: '_hover' }, '')};
    }
    &:focus {
      color: ${getColor({ suffix: '_focus' }, '')};
      background-color: ${getBackgroundColor({ suffix: '_focus' }, '')};
      border: ${getBorder({ suffix: '_focus' }, '')};
      border-color: ${getBorderColor({ suffix: '_focus' }, '')};
    }
  `}
`;

const DEFAULT_TW = { semKey: 'button', variant: 'nav' };

const NavLink = (props) => {
  const {
    tw,
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
  const mergedTW = { ...DEFAULT_TW, ...tw };

  if (externalLink) {
    return (
      <StyledLink tw={mergedTW} tabIndex="0" {...restProps}>
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
      <StyledLink tw={mergedTW} tabIndex="0" {...restProps}>
        {children}
      </StyledLink>
    </Link>
  );
};

export default NavLink;
