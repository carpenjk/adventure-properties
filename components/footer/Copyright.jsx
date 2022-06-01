import styled from 'styled-components';
import FooterDrawer from './FooterDrawer';
import ProfileDrawerButton from './ProfileDrawerButton';
import ProfileNavLayout from './ProfileNavLayout';
import UpArrow from './UpArrow';
import useOpenClose from './UseOpenClose';

const StyledCopyright = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-size:  ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 24px;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.tertiary};

  > span {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    white-space: nowrap;
  }
  > span:first-child {
    margin-right: ${({ theme }) => theme.space[2]}px;
  }
  > span:last-child{
    display: flex;
    align-items: baseline;
  }

  > span:last-child  img {
    width: 30px;
    height: 15px;    
    padding-left: 4px;
    padding-right: 4px;
  }
}
`;

const Copyright = () => {
  const { isOpen, control } = useOpenClose();
  return (
    <StyledCopyright>
      <span>&copy; 2021</span>
      <span>
        <ProfileDrawerButton onClick={control.toggle}>
          Jeremy Carpenter
          <UpArrow />
        </ProfileDrawerButton>
        <FooterDrawer
          control={control}
          isOpen={isOpen}
          menu={ProfileNavLayout}
        />
      </span>
    </StyledCopyright>
  );
};

export default Copyright;
