import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[3]}px;
  padding-bottom: ${({ theme }) => theme.space[3]}px;

  & > a {
    color: ${({ theme }) => theme.colors.link[0]};
    font-family: ${({ theme }) => theme.fonts.raleway};
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.5em;
    letter-spacing: 0.025em;
    text-decoration-line: underline;
  }
  & > a:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }
`;

const FeaturesFooter = ({ href, topic }) => (
  <StyledFooter>
    <Link href={href}>
      <a>More Properties based on {topic}</a>
    </Link>
  </StyledFooter>
);

export default FeaturesFooter;
