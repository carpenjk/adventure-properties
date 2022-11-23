import styled from 'styled-components';
import { Portal } from 'react-portal';
import { ActionButton } from '@carpenjk/base/button';
import { Spacer } from '@carpenjk/base/layout';
import ClientOnly from '@carpenjk/client-only';
import FullScreenOverlay from '../FullScreenOverlay';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 16px 16px 16px;
`;
const FullScreenInputContainer = ({
  buttonText,
  children,
  onClose,
  onAction,
  isOpen,
}) => {
  if (isOpen) {
    return (
      <ClientOnly>
        <Portal>
          <FullScreenOverlay
            isOpen={isOpen}
            onClose={onClose}
            alignItems="flex-start"
          >
            <StyledWrapper>
              {children}
              <Spacer space="16px" vertical />
              <ActionButton variant="reserve" onClick={onAction}>
                {buttonText}
              </ActionButton>
            </StyledWrapper>
          </FullScreenOverlay>
        </Portal>
      </ClientOnly>
    );
  }
  return children;
};

export default FullScreenInputContainer;
