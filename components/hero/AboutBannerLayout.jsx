import React from 'react'
import styled from 'styled-components'
import { breakpoint } from '@carpenjk/prop-x/css'

const StyledWrapper = styled.div`
  margin: 0;
  padding: 10px;

  p {
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.bannerText};
  }
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

  ${breakpoint(1)`
    width: 90%;
  `}
`

const AboutBannerLayout = () => (
  <StyledWrapper>
    <p>
      We find properties for people who wish to live life to the fullest. We
      provide listings by your favorite hobby or activities so that you can do
      more time living and less time searching.
    </p>
  </StyledWrapper>
)

export default AboutBannerLayout
