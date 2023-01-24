import Link from 'next/link';
import LinkIcon from './LinkIcon';
import LinkText from './LinkText';
import StyledProfileLink from './StyledProfileLink';

const ProfileLink = ({ children, href, icon }) => (
  <Link href={href}>
    <a target="_blank">
      <StyledProfileLink>
        <LinkIcon width="24px" height="24px" icon={icon} />
        <LinkText>{children}</LinkText>
      </StyledProfileLink>
    </a>
  </Link>
);
export default ProfileLink;
