import ProfileLink from './ProfileLink';
import StyledProfileLinks from './StyledProfileLInks';

const Socials = () => (
  <StyledProfileLinks>
    <li>
      <ProfileLink
        icon="/linkIcons/githubIcon.svg"
        href="https://github.com/carpenjk"
      >
        Github
      </ProfileLink>
    </li>
    <li>
      <ProfileLink
        icon="/linkIcons/linkedInIcon.svg"
        href="https://www.linkedin.com/in/jcarpenterdev"
      >
        LinkedIn
      </ProfileLink>
    </li>
    <li>
      <ProfileLink
        icon="/linkIcons/emailIcon.svg"
        href="mailto:jcarpenterdev@gmail.com"
      >
        jcarpenterdev@gmail.com
      </ProfileLink>
    </li>
  </StyledProfileLinks>
);
export default Socials;
