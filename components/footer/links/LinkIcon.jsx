import Image from 'next/image';
import { StyledLinkIcon } from './StyledLinkIcon';

const LinkIcon = ({ direction, icon, ...iconProps }) => (
  <StyledLinkIcon {...iconProps}>
    <Image layout="fill" src={icon} alt="icon" />
  </StyledLinkIcon>
);
export default LinkIcon;
