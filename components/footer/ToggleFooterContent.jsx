import styled from 'styled-components';
import FooterDrawer from './FooterDrawer';
import UpArrow from './UpArrow';
import useOpenClose from './UseOpenClose';

const StyledFooterContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 24px;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.tertiary};
  z-index: 1000001;

  > span {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    white-space: nowrap;
  }
  > span:first-child {
    margin-right: ${({ theme }) => theme.space[2]}px;
  }
  > span:last-child {
    display: flex;
    align-items: baseline;
  }
`;

const ToggleFooterContent = ({
  ToggleButton,
  DrawerComponent,
  bottomOffset,
}) => {
  const { isOpen, control } = useOpenClose();
  return (
    <>
      <StyledFooterContent>
        <span>&copy; 2021</span>
        <span>
          <ToggleButton onClick={control.toggle}>
            Jeremy Carpenter
            <UpArrow />
          </ToggleButton>
        </span>
      </StyledFooterContent>
      <FooterDrawer
        bottomOffset={bottomOffset}
        control={control}
        isOpen={isOpen}
        Menu={DrawerComponent}
      />
    </>
  );
};

export default ToggleFooterContent;
