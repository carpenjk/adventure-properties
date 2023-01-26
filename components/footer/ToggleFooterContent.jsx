import { useRef } from 'react';
import PopupModal from '@carpenjk/popup-modal';
import styled from 'styled-components';
import { useIsoOnClickOutside } from '@carpenjk/hooks';
import FooterDrawer from './FooterDrawer';
import UpArrow from './UpArrow';
import useOpenClose from './UseOpenClose';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 55px;
  width: 100vw;
  z-index: 1000000;
`;

const StyledFooterContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  flex-wrap: wrap;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[5]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
  padding-left: ${({ theme }) => theme.space[3]}px;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 24px;
  letter-spacing: 0.025em;
  background-color: ${(props) => props.theme.colors.primary[0]};
  color: ${({ theme }) => theme.colors.tertiary};
  z-index: 1000002;

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

const StyledToggleArrowWrapper = styled.div`
  transform: scaleY(1);
  transition: transform 0.5s ease-in;
  &.isOpen {
    transform: scaleY(-1);
    transition: transform 0.5s ease-in;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleFooterContent = ({
  ToggleButton,
  DrawerComponent,
  bottomOffset,
}) => {
  const { isOpen, control } = useOpenClose();
  const drawerRef = useRef();
  useIsoOnClickOutside(drawerRef, control.close, []);
  return (
    <>
      {isOpen && (
        <PopupModal isOpen={isOpen} scrollNode={drawerRef} lockScroll />
      )}
      <StyledWrapper ref={drawerRef}>
        <StyledFooterContent ref={drawerRef}>
          <span>&copy; 2021</span>
          <span>
            <ToggleButton isOpen={isOpen} onClick={control.toggle}>
              Jeremy Carpenter
              <StyledToggleArrowWrapper className={isOpen ? 'isOpen' : ''}>
                <UpArrow isOpen={isOpen} />
              </StyledToggleArrowWrapper>
            </ToggleButton>
          </span>
        </StyledFooterContent>
        <FooterDrawer
          bottomOffset={bottomOffset}
          maxHeight="calc(100vh - 132px)"
          isOpen={isOpen}
          Menu={DrawerComponent}
        />
      </StyledWrapper>
    </>
  );
};

export default ToggleFooterContent;
