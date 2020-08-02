import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font: inherit;
  text-decoration: none;
  color: ${({ color }) => color};
`;

const NavLink = (props) => {
  //const { href, text, color, tabIndex } = props;
  const {
    href, //start of next/link props
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    getStaticProps,
    getServerSideProps,
    getInitialProps, //end next/link props
    text,
    ...restProps //inner coponent props
  } = props;

  return (
    <Link
      href={href}
      as={as}
      passHref={true}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <StyledLink {...restProps}>{text}</StyledLink>
    </Link>
  );
};

export default NavLink;
