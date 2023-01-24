import Image from 'next/image';
import { StyledProfilePicture } from './styled/StyledProfilePicture';
import profile from '../../../public/profile/profile.png';

const ProfilePicture = () => (
  <StyledProfilePicture>
    <Image
      src={profile}
      alt="profile"
      layout="intrinsic"
      height={200}
      width={200}
    />
  </StyledProfilePicture>
);
export default ProfilePicture;
