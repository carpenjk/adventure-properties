import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';
import ProfileLinks from './links/ProfileLinks';
import ProfilePicture from './profile/ProfilePicture';

const StyledOuterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  padding-left: ${({ theme }) => theme.space[2]}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary[0]}80;
  box-shadow: 0px 8px 28px ${({ theme }) => theme.colors.primary[0]}80;
`;
const StyledInnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 750px;

  ${breakpoint(1)`
    flex-direction: row;
  `}
`;
const StyledProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-width: 300px;
  padding: ${(props) => props.theme.space[3]}px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  > h2 {
    flex: 1;
    min-width: 0;
    min-height: 0;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    -webkit-letter-spacing: 0.05em;
    -moz-letter-spacing: 0.05em;
    -ms-letter-spacing: 0.05em;
    letter-spacing: 0.05em;
    color: ${(props) => props.theme.colors.primary[0]};
  }
  > p {
    display: flex;
    min-width: 0;
    max-width: 300px;
    font-family: ${({ theme }) => theme.fonts.openSans};
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    line-height: 150%;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.mainText};
  }
`;
const ProfileNavLayout = () => (
  <StyledOuterContainer>
    <StyledInnerContainer>
      <StyledProfile>
        <h2>Thank you for viewing my demo!</h2>
        <ProfilePicture />
        <p>
          I would love to hear from you about opportunities to work together.
          Please contact me via email or find out more about me from these
          links!
        </p>
      </StyledProfile>
      <ProfileLinks />
    </StyledInnerContainer>
  </StyledOuterContainer>
);

export default ProfileNavLayout;
