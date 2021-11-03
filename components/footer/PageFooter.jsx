import Link from 'next/link';
import styled from 'styled-components';
import {
  breakpoint,
  getBackgroundColor,
  getBorder,
  getBorderColor,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getLineHeight,
  getMinWidth,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getPaddingTop,
  getWidth,
} from 'themeweaver';
import { getProp, condition } from 'dataweaver';
import ActionLink from '../base/ActionLink';
import FooterNav from './FooterNav';
import Spacer from '../base/Spacer';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${getWidth('footer', '100%')};
  padding-top: ${getPaddingTop('footer', '64px')};
  padding-right: ${getPaddingRight('footer', '64px')};
  padding-bottom: ${getPaddingBottom('footer', '32px')};

  padding-left: ${getPaddingLeft('footer', '64px')};
  background-color: ${getBackgroundColor('footer', 'unset')};

  ${condition('padBottomOverride')`
    padding-bottom: ${getProp('padBottomOverride')};
  `}
`;

const StyledSignUp = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: ${getPaddingTop('CTA.signUp', '20px')};
  padding-right: ${getPaddingRight('CTA.signUp', '20px')};
  padding-bottom: ${getPaddingBottom('CTA.signUp', '20px')};
  padding-left: ${getPaddingLeft('CTA.signUp', '20px')};
  border: ${getBorder('CTA.signUp', '1 solid white')};
  border-color: ${getBorderColor('CTA.signUp', 'white')};

  > h2 {
    display: flex;
    align-items: center;

    font-family: ${getFontFamily('CTA.signUp', 'inherit')};
    font-weight: ${getFontWeight('CTA.signUp', 'bold')};
    font-size: ${getFontSize('CTA.signUp', '20px')};
    line-height: ${getLineHeight('CTA.signUp', '30px')};
    letter-spacing: ${getLetterSpacing('CTA.signup', '0.05em')};
    color: ${getColor('CTA.signUp', 'white')};
  }
`;
const StyledCopyright = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  min-width: ${getMinWidth('content', '0')};
  border-top: ${getBorder('copyright', '1px solid')};
  border-top-color: ${getBorderColor('copyright', 'white')};

  > p {
    font-family: ${getFontFamily('copyright', 'inherit')};
    font-size: ${getFontSize('copyright', 'initial')};
    line-height: ${getLineHeight('copyright', '24px')};
    letter-spacing: ${getLetterSpacing('copyright', '0.025em')};
    color: ${getColor('copyright', 'white')};
  }

  ${breakpoint(1)`
    min-width: ${getMinWidth('content', '800px')};
  `}
`;

const PageFooter = (props) => {
  const { navData, padBottomOverride } = props;

  return (
    <StyledFooter padBottomOverride={padBottomOverride}>
      <StyledSignUp>
        <h2>
          Alert me when properties I might be interested in become available
        </h2>
        <ActionLink href="/signUp" variant="signUp">
          Sign Up
        </ActionLink>
      </StyledSignUp>
      {/* <StyledSpacer space="64px" /> */}
      <Spacer vertical space="64px" />
      <FooterNav navData={navData} />
      {/* <StyledSpacer space="32px" /> */}
      <Spacer vertical space="32px" />
      <StyledCopyright>
        <p>Copyright 2021 Jeremy Carpenter</p>
      </StyledCopyright>
    </StyledFooter>
  );
};
export default PageFooter;
