import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledWrapper = styled.div`
  margin: 0;
  padding: 10px;

  > h1 {
    margin: 0 0 10px 0;
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.mainText};
  }
  > h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    color: ${({ theme }) => theme.colors.bannerText};
    letter-spacing: 0.05em;
  }
`;

const HomeBannerLayout = () => (
  <StyledWrapper>
    <h1>Live, Work, Play. Build Your Dream Adventure Today!</h1>
    <h2>
      Find rental properties near the things that make living most enjoyable.
    </h2>
  </StyledWrapper>
);

export default HomeBannerLayout;
